<?php
// ================== ENABLE ERRORS FOR DEBUG ==================
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL & ~E_DEPRECATED & ~E_NOTICE);

// ================== SESSION & CONFIG ==================
session_start();
require_once $_SERVER['DOCUMENT_ROOT'] . '/config.php';

// ================== FLASH MESSAGES ==================
$flashSuccess = $_SESSION['flashSuccess'] ?? null;
$flashError   = $_SESSION['flashError'] ?? null;
unset($_SESSION['flashSuccess'], $_SESSION['flashError']);

// ================== USER AUTH CHECK ==================
$userId = $_SESSION['user']['id'] ?? null;
$userRole = $_SESSION['user']['user_role'] ?? '';
if (!$userId || $userRole !== 'user') {
    header('Location: /login.php');
    exit;
}

$currentUsername = $_SESSION['user']['username'] ?? 'guest';

// ================== FETCH USER DATA ==================
$stmt = $pdo->prepare("SELECT * FROM users WHERE id=? LIMIT 1");
$stmt->execute([$userId]);
$userData = $stmt->fetch(PDO::FETCH_ASSOC) ?: [];


// ================== HANDLE PROFILE UPDATE ==================
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['profile_update'])) {
    try {
        $birthDate = $_POST['birth_date'] ?? null;
        $nidNumber = $_POST['nid_number'] ?? null;
        $password = $_POST['password'] ?? null;

        // assume you have $userId and username already available
        $username = $_SESSION['user']['username'] ?? 'unknown_user';
        $dateFolder = date('Y-m-d');
        $timeFolder = date('His'); // 24hr time: 153045 for 3:30:45 PM

        $baseDir = $_SERVER['DOCUMENT_ROOT'] . '/uploads/';
        if (!is_dir($baseDir)) mkdir($baseDir, 0755, true);

        $files = ['profile_pic', 'nid_front', 'nid_back', 'selfie'];

        foreach ($files as $f) {
            if (!empty($_FILES[$f]['name']) && is_uploaded_file($_FILES[$f]['tmp_name'])) {

                // sanitize filename
                $safeName = preg_replace('/[^a-zA-Z0-9._-]/', '', basename($_FILES[$f]['name']));

                // full path: /uploads/(typename)/(username)/(date)/(time)/
                $uploadDir = $baseDir . "$f/$username/$dateFolder/$timeFolder/";
                if (!is_dir($uploadDir)) mkdir($uploadDir, 0755, true);

                $targetPath = $uploadDir . $safeName;

                if (move_uploaded_file($_FILES[$f]['tmp_name'], $targetPath)) {
                    // save relative web path (for database)
                    $_POST[$f . '_path'] = "/uploads/$f/$username/$dateFolder/$timeFolder/$safeName";
                }
            }
        }

        // --- Update user info in database ---
        $update = $pdo->prepare("
            UPDATE users SET 
                birth_date = ?, 
                nid_number = ?, 
                password = COALESCE(?, password),
                profile_pic = COALESCE(?, profile_pic),
                nid_front = COALESCE(?, nid_front),
                nid_back = COALESCE(?, nid_back),
                selfie = COALESCE(?, selfie)
            WHERE id = ?
        ");

        $update->execute([
            $birthDate,
            $nidNumber,
            $password ? password_hash($password, PASSWORD_DEFAULT) : null,
            $_POST['profile_pic_path'] ?? null,
            $_POST['nid_front_path'] ?? null,
            $_POST['nid_back_path'] ?? null,
            $_POST['selfie_path'] ?? null,
            $userId
        ]);

        $_SESSION['flashSuccess'] = "Profile updated successfully!";
        header("Location: " . $_SERVER['REQUEST_URI']);
        exit;
    } catch (Exception $e) {
        $flashError = $e->getMessage();
    }
}


// ================== FETCH USERS (admin listing) ==================
$usersList = $pdo->query("
    SELECT id, username, email, user_role, account_status, balance, created_at 
    FROM users ORDER BY username ASC
")->fetchAll(PDO::FETCH_ASSOC);
// ================== HANDLE FUND / TRANSFER ==================
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['fund_submit'])) {
    try {
        $amount      = (float)($_POST['fund_amount'] ?? 0);
        $currency    = $_POST['fund_currency'] ?? 'USD';
        $gateway     = $_POST['fund_gateway'] ?? '';
        $gatewayId   = $_POST['fund_gateway_id'] ?? '';
        $phone       = $_POST['fund_phone'] ?? '';
        $targetUser  = $_POST['fund_target_user'] ?? null;
        $currentUsername = $_SESSION['user']['username'] ?? 'unknown_user';

        // Default to admin if no target user given
        if (empty($targetUser)) {
            $targetUser = $pdo->query("SELECT id FROM users WHERE user_role='admin' LIMIT 1")->fetchColumn() ?? $userId;
        }

        // Validate amount
        if ($amount <= 0) {
            $_SESSION['flashError'] = "Please enter a valid amount greater than 0.";
            header("Location: " . $_SERVER['REQUEST_URI']);
            exit;
        }

        // Check balance for user-to-user transfer
        if ($targetUser != $userId && (($userData['balance'] ?? 0) < $amount)) {
            $_SESSION['flashError'] = "Insufficient balance for transfer!";
            header("Location: " . $_SERVER['REQUEST_URI']);
            exit;
        }

        // Handle proof upload
        $proofPath = null;
        if (!empty($_FILES['fund_proof']['name']) && $_FILES['fund_proof']['error'] === UPLOAD_ERR_OK) {
            $type       = 'fund';
            $dateFolder = date('Y-m-d');
            $timeFolder = date('His');

            $uploadDir = $_SERVER['DOCUMENT_ROOT'] . "/uploads/$type/$currentUsername/$dateFolder/$timeFolder/";
            if (!is_dir($uploadDir)) mkdir($uploadDir, 0755, true);

            $fileName = preg_replace('/[^a-zA-Z0-9._-]/', '', basename($_FILES['fund_proof']['name']));
            $targetFile = $uploadDir . $fileName;

            if (move_uploaded_file($_FILES['fund_proof']['tmp_name'], $targetFile)) {
                $proofPath = "/uploads/$type/$currentUsername/$dateFolder/$timeFolder/$fileName";
            } else {
                $_SESSION['flashError'] = "File upload failed. Please try again.";
                header("Location: " . $_SERVER['REQUEST_URI']);
                exit;
            }
        }

        // Insert fund/transfer request
        $stmt = $pdo->prepare("
            INSERT INTO fund_requests 
                (user_id, amount, currency, gateway, gateway_id, phone, proof_data, status, created_at, transfer_to_user) 
            VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', NOW(), ?)
        ");
        $stmt->execute([$userId, $amount, $currency, $gateway, $gatewayId, $phone, $proofPath, $targetUser]);

        $_SESSION['flashSuccess'] = ($targetUser == $userId)
            ? "Fund request submitted successfully! Pending admin approval."
            : "Transfer request submitted successfully! Pending admin approval.";

        header("Location: " . $_SERVER['REQUEST_URI']);
        exit;
    } catch (Exception $e) {
        $_SESSION['flashError'] = "Error: " . $e->getMessage();
        header("Location: " . $_SERVER['REQUEST_URI']);
        exit;
    }
}


// ================== HANDLE WITHDRAW ==================
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['withdraw_submit'])) {
    try {
        $amount      = (float)($_POST['withdraw_amount'] ?? 0);
        $currency    = $_POST['withdraw_currency'] ?? 'USD';
        $gateway     = trim($_POST['withdraw_gateway'] ?? '');
        $gatewayId   = trim($_POST['withdraw_gateway_id'] ?? '');
        $phone       = trim($_POST['withdraw_phone'] ?? '');
        $currentUsername = $_SESSION['user']['username'] ?? 'unknown_user';

        // Validate amount
        if ($amount <= 0) {
            $_SESSION['flashError'] = "Please enter a valid withdrawal amount.";
            header("Location: " . $_SERVER['REQUEST_URI']);
            exit;
        }

        // Check balance
        if (($userData['balance'] ?? 0) < $amount) {
            $_SESSION['flashError'] = "Insufficient balance to withdraw!";
            header("Location: " . $_SERVER['REQUEST_URI']);
            exit;
        }

        // Handle proof upload
        $proofPath = null;
        if (!empty($_FILES['withdraw_proof']['name']) && $_FILES['withdraw_proof']['error'] === UPLOAD_ERR_OK) {
            $type       = 'withdraw';
            $dateFolder = date('Y-m-d');
            $timeFolder = date('His');

            $uploadDir = $_SERVER['DOCUMENT_ROOT'] . "/uploads/$type/$currentUsername/$dateFolder/$timeFolder/";
            if (!is_dir($uploadDir)) mkdir($uploadDir, 0755, true);

            $fileName = preg_replace('/[^a-zA-Z0-9._-]/', '', basename($_FILES['withdraw_proof']['name']));
            $targetFile = $uploadDir . $fileName;

            if (move_uploaded_file($_FILES['withdraw_proof']['tmp_name'], $targetFile)) {
                $proofPath = "/uploads/$type/$currentUsername/$dateFolder/$timeFolder/$fileName";
            } else {
                $_SESSION['flashError'] = "Proof upload failed. Please try again.";
                header("Location: " . $_SERVER['REQUEST_URI']);
                exit;
            }
        }

        // Insert withdraw request
        $stmt = $pdo->prepare("
            INSERT INTO withdraw_requests 
                (user_id, amount, currency, gateway, gateway_id, phone, proof_data, status, created_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', NOW())
        ");
        $stmt->execute([$userId, $amount, $currency, $gateway, $gatewayId, $phone, $proofPath]);

        $_SESSION['flashSuccess'] = "Withdraw request submitted successfully! Pending admin approval.";
        header("Location: " . $_SERVER['REQUEST_URI']);
        exit;
    } catch (Exception $e) {
        $_SESSION['flashError'] = "Error: " . $e->getMessage();
        header("Location: " . $_SERVER['REQUEST_URI']);
        exit;
    }
}

// ================== FETCH FUND / WITHDRAW REQUESTS ==================
$fundRequestsStmt = $pdo->prepare("
    SELECT 
        fr.*, 
        u.username AS from_username, 
        u.email AS from_email,
        tu.username AS to_username, 
        tu.email AS to_email
    FROM fund_requests fr
    LEFT JOIN users u ON u.id = fr.user_id
    LEFT JOIN users tu ON tu.id = fr.transfer_to_user
    WHERE fr.user_id = ? OR fr.transfer_to_user = ?
    ORDER BY fr.created_at DESC
");
$fundRequestsStmt->execute([$userId, $userId]);
$fundRequests = $fundRequestsStmt->fetchAll(PDO::FETCH_ASSOC);
$fundRequestCount = count($fundRequests);

$withdrawRequestsStmt = $pdo->prepare("
    SELECT wr.*, u.username, u.email 
    FROM withdraw_requests wr
    LEFT JOIN users u ON u.id = wr.user_id 
    WHERE wr.user_id = ?
    ORDER BY wr.created_at DESC
");
$withdrawRequestsStmt->execute([$userId]);
$withdrawRequests = $withdrawRequestsStmt->fetchAll(PDO::FETCH_ASSOC);
$withdrawRequestCount = count($withdrawRequests);

$transactionCount = $fundRequestCount + $withdrawRequestCount;

// ================== AGGREGATE STATS ==================

// Base user balance
$userBalance = (float)($userData['balance'] ?? 0);

// -------------------- JOB WORK (worker perspective) --------------------
$workStmt = $pdo->prepare("
    SELECT 
        COALESCE(SUM(CASE WHEN status='approved' THEN COALESCE(worker_earned, per_task_rate) ELSE 0 END),0) AS total_earned_approved,
        COALESCE(SUM(CASE WHEN status='pending' THEN COALESCE(worker_earned, per_task_rate) ELSE 0 END),0) AS total_earned_pending,
        COALESCE(SUM(CASE WHEN status='rejected' THEN COALESCE(worker_earned, per_task_rate) ELSE 0 END),0) AS total_earned_rejected,
        COALESCE(SUM(fine),0) AS total_fines,
        COUNT(*) AS total_work_task,
        SUM(CASE WHEN status='approved' THEN 1 ELSE 0 END) AS accepted_work_task,
        SUM(CASE WHEN status='pending' THEN 1 ELSE 0 END) AS pending_work_task,
        SUM(CASE WHEN status='rejected' THEN 1 ELSE 0 END) AS rejected_work_task
    FROM job_work
    WHERE worker_id = ?
");
$workStmt->execute([$userId]);
$workStats = $workStmt->fetch(PDO::FETCH_ASSOC);

// -------------------- JOBS (poster perspective) --------------------
$jobsStmt = $pdo->prepare("
    SELECT
        COUNT(*) AS total_jobs,
        SUM(CASE WHEN status IN ('open','pending_approval') THEN 1 ELSE 0 END) AS active_jobs,
        SUM(CASE WHEN status='done' THEN 1 ELSE 0 END) AS done_jobs,
        SUM(CASE WHEN status='approved' THEN 1 ELSE 0 END) AS accepted_jobs,
        SUM(CASE WHEN status='pending' THEN 1 ELSE 0 END) AS pending_jobs,
        SUM(CASE WHEN status='rejected' THEN 1 ELSE 0 END) AS rejected_jobs
    FROM jobs
    WHERE poster_id = ?
");
$jobsStmt->execute([$userId]);
$posterStats = $jobsStmt->fetch(PDO::FETCH_ASSOC);

// -------------------- FUND REQUESTS (user deposits / additions) --------------------
$fundStatsStmt = $pdo->prepare("
    SELECT 
        COALESCE(SUM(CASE WHEN status='approved' THEN amount ELSE 0 END),0) AS total_accepted_fund,
        COALESCE(SUM(CASE WHEN status='pending' THEN amount ELSE 0 END),0) AS total_pending_fund,
        COALESCE(SUM(CASE WHEN status='rejected' THEN amount ELSE 0 END),0) AS total_rejected_fund,
        COUNT(*) AS count_add_fund,
        SUM(CASE WHEN status='approved' THEN 1 ELSE 0 END) AS count_accepted_fund,
        SUM(CASE WHEN status='pending' THEN 1 ELSE 0 END) AS count_pending_fund,
        SUM(CASE WHEN status='rejected' THEN 1 ELSE 0 END) AS count_rejected_fund
    FROM fund_requests
    WHERE user_id = ? AND (transfer_to_user IS NULL OR transfer_to_user = ?)
");
$fundStatsStmt->execute([$userId, $userId]);
$fundStats = $fundStatsStmt->fetch(PDO::FETCH_ASSOC);

// -------------------- FUND TRANSFERS (user -> others) --------------------
$transferStatsStmt = $pdo->prepare("
    SELECT 
        COALESCE(SUM(CASE WHEN status='approved' THEN amount ELSE 0 END),0) AS total_transferred_fund,
        COUNT(*) AS count_transferred_fund,
        SUM(CASE WHEN status='approved' THEN 1 ELSE 0 END) AS count_transferred_accepted,
        SUM(CASE WHEN status='pending' THEN 1 ELSE 0 END) AS count_transferred_pending,
        SUM(CASE WHEN status='rejected' THEN 1 ELSE 0 END) AS count_transferred_rejected
    FROM fund_requests
    WHERE user_id = ? AND transfer_to_user IS NOT NULL AND transfer_to_user != ?
");
$transferStatsStmt->execute([$userId, $userId]);
$transferStats = $transferStatsStmt->fetch(PDO::FETCH_ASSOC);

// -------------------- WITHDRAW REQUESTS --------------------
$withdrawStatsStmt = $pdo->prepare("
    SELECT 
        COALESCE(SUM(CASE WHEN status='approved' THEN amount ELSE 0 END),0) AS total_withdraw_fund,
        COALESCE(SUM(CASE WHEN status='pending' THEN amount ELSE 0 END),0) AS total_pending_withdraw,
        COALESCE(SUM(CASE WHEN status='rejected' THEN amount ELSE 0 END),0) AS total_rejected_withdraw,
        COUNT(*) AS count_withdraw_fund,
        SUM(CASE WHEN status='approved' THEN 1 ELSE 0 END) AS count_withdraw_accepted,
        SUM(CASE WHEN status='pending' THEN 1 ELSE 0 END) AS count_withdraw_pending,
        SUM(CASE WHEN status='rejected' THEN 1 ELSE 0 END) AS count_withdraw_rejected
    FROM withdraw_requests
    WHERE user_id = ?
");
$withdrawStatsStmt->execute([$userId]);
$withdrawStats = $withdrawStatsStmt->fetch(PDO::FETCH_ASSOC);

// -------------------- REFERRAL EARNINGS --------------------
$referralStmt = $pdo->prepare("
    SELECT 
        COALESCE(SUM(CASE WHEN jw.status='approved' THEN jw.referrer_earned ELSE 0 END),0) AS referral_earned_approved,
        COALESCE(SUM(CASE WHEN jw.status='pending' THEN jw.referrer_earned ELSE 0 END),0) AS referral_earned_pending,
        COALESCE(SUM(CASE WHEN jw.status='rejected' THEN jw.referrer_earned ELSE 0 END),0) AS referral_earned_rejected
    FROM job_work jw
    JOIN users u ON u.id = jw.worker_id
    WHERE u.referrer = ?
");
$referralStmt->execute([$currentUsername]);
$referralStats = $referralStmt->fetch(PDO::FETCH_ASSOC);

// -------------------- FINE TOTAL --------------------
$finesStmt = $pdo->prepare("SELECT COALESCE(SUM(fine),0) FROM job_work WHERE worker_id = ?");
$finesStmt->execute([$userId]);
$totalFinesFromJobWork = (float)$finesStmt->fetchColumn();

// -------------------- AGGREGATES --------------------
$totalEarningsApproved = (float)($workStats['total_earned_approved'] ?? 0);
$totalEarningsPending  = (float)($workStats['total_earned_pending'] ?? 0);
$totalEarningsRejected = (float)($workStats['total_earned_rejected'] ?? 0);
$totalFines            = max(0.0, (float)($workStats['total_fines'] ?? 0) + $totalFinesFromJobWork);

$totalReferralApproved = (float)($referralStats['referral_earned_approved'] ?? 0);
$totalReferralPending  = (float)($referralStats['referral_earned_pending'] ?? 0);
$totalReferralRejected = (float)($referralStats['referral_earned_rejected'] ?? 0);

$totalWorkTasks        = (int)($workStats['total_work_task'] ?? 0);
$acceptedWorkTasks     = (int)($workStats['accepted_work_task'] ?? 0);
$pendingWorkTasks      = (int)($workStats['pending_work_task'] ?? 0);
$rejectedWorkTasks     = (int)($workStats['rejected_work_task'] ?? 0);

$totalJobsPosted       = (int)($posterStats['total_jobs'] ?? 0);
$acceptedJobsPosted    = (int)($posterStats['accepted_jobs'] ?? 0);
$pendingJobsPosted     = (int)($posterStats['pending_jobs'] ?? 0);
$rejectedJobsPosted    = (int)($posterStats['rejected_jobs'] ?? 0);
$activeJobsPoster      = (int)($posterStats['active_jobs'] ?? 0);
$doneJobsPoster        = (int)($posterStats['done_jobs'] ?? 0);

$totalAddedFundAmount  = (float)($fundStats['total_accepted_fund'] ?? 0)
                       + (float)($fundStats['total_pending_fund'] ?? 0)
                       + (float)($fundStats['total_rejected_fund'] ?? 0);

$countAddedFund        = (int)($fundStats['count_add_fund'] ?? 0);
$countAcceptedFund     = (int)($fundStats['count_accepted_fund'] ?? 0);
$countPendingFund      = (int)($fundStats['count_pending_fund'] ?? 0);
$countRejectedFund     = (int)($fundStats['count_rejected_fund'] ?? 0);

$totalTransferredFundAmount = (float)($transferStats['total_transferred_fund'] ?? 0);
$countTransferredFund        = (int)($transferStats['count_transferred_fund'] ?? 0);
$countTransferredAccepted    = (int)($transferStats['count_transferred_accepted'] ?? 0);
$countTransferredPending     = (int)($transferStats['count_transferred_pending'] ?? 0);
$countTransferredRejected    = (int)($transferStats['count_transferred_rejected'] ?? 0);

$totalWithdrawFundAmount = (float)($withdrawStats['total_withdraw_fund'] ?? 0);
$countWithdrawFund        = (int)($withdrawStats['count_withdraw_fund'] ?? 0);
$countWithdrawAccepted    = (int)($withdrawStats['count_withdraw_accepted'] ?? 0);
$countWithdrawPending     = (int)($withdrawStats['count_withdraw_pending'] ?? 0);
$countWithdrawRejected    = (int)($withdrawStats['count_withdraw_rejected'] ?? 0);

$totalBalanceAllUsers = (float)$pdo->query("SELECT COALESCE(SUM(balance),0) FROM users")->fetchColumn();

// Available service balance for this user
$availableForServices = max(0, $userBalance + $totalEarningsApproved + $totalReferralApproved - (float)($withdrawStats['total_pending_withdraw'] ?? 0) - $totalFines);

// ================== DASHBOARD STATS ARRAY ==================
$dashboardStats = [
    'Total Earnings (Approved)' => $totalEarningsApproved,
    'Total Pending Earnings' => $totalEarningsPending,
    'Total Rejected Earnings' => $totalEarningsRejected,
    'Total Referral Earnings (Approved)' => $totalReferralApproved,
    'Pending Referral Earnings' => $totalReferralPending,
    'Rejected Referral Earnings' => $totalReferralRejected,
    'Total Fine' => $totalFines,
    'Total Job Post' => $totalJobsPosted,
    'Accepted Job Post' => $acceptedJobsPosted,
    'Pending Job Post' => $pendingJobsPosted,
    'Rejected Job Post' => $rejectedJobsPosted,
    'Active Job Post (open/pending_approval)' => $activeJobsPoster,
    'Done Job Post' => $doneJobsPoster,
    'Total Work Task' => $totalWorkTasks,
    'Accepted Work Task' => $acceptedWorkTasks,
    'Pending Work Task' => $pendingWorkTasks,
    'Rejected Work Task' => $rejectedWorkTasks,
    'Total Added Fund (sum)' => $totalAddedFundAmount,
    'Total Transferred Fund (sum)' => $totalTransferredFundAmount,
    'Total Withdraw Fund (sum)' => $totalWithdrawFundAmount,
    'Count Added Fund' => $countAddedFund,
    'Count Transferred Fund' => $countTransferredFund,
    'Count Withdraw Fund' => $countWithdrawFund,
    'User Accepted Fund (sum)' => (float)($fundStats['total_accepted_fund'] ?? 0),
    'User Pending Fund (sum)' => (float)($fundStats['total_pending_fund'] ?? 0),
    'User Rejected Fund (sum)' => (float)($fundStats['total_rejected_fund'] ?? 0),
    'Count Accepted Fund' => $countAcceptedFund,
    'Count Pending Fund' => $countPendingFund,
    'Count Rejected Fund' => $countRejectedFund,
    'Count Withdraw Accepted' => $countWithdrawAccepted,
    'Count Withdraw Pending' => $countWithdrawPending,
    'Count Withdraw Rejected' => $countWithdrawRejected,
    'Count Transfer Accepted' => $countTransferredAccepted,
    'Count Transfer Pending' => $countTransferredPending,
    'Count Transfer Rejected' => $countTransferredRejected,
    'Total Balance (This User)' => $userBalance,
    'Total Balance (All Users)' => $totalBalanceAllUsers,
    'Available Service Balance' => $availableForServices
];

// ================== UPDATE USERS TABLE WITH SUMMARY ==================
try {
    $updateSummary = $pdo->prepare("
        UPDATE users SET
            pending_add_fund = ?,
            pending_transfer = ?,
            pending_withdraw = ?,
            pending_earnings = ?,
            referral_earned = ?,
            pending_referral_earned = ?,
            total_fines = ?,
            available_balance = ?
        WHERE id = ?
    ");
    $updateSummary->execute([
        (float)($fundStats['total_pending_fund'] ?? 0),
        (float)($transferStats['total_transferred_fund'] ?? 0),
        (float)($withdrawStats['total_pending_withdraw'] ?? 0),
        $totalEarningsPending,
        $totalReferralApproved,
        $totalReferralPending,
        $totalFines,
        $availableForServices,
        $userId
    ]);
} catch (Exception $ex) {
    // non-fatal - log $ex->getMessage() if needed
}

// ================== NAVIGATION COUNTS ==================

// ================== SUMMARY COUNTS ==================
$totalJobsCount   = (int)($pdo->query("SELECT COUNT(*) FROM jobs")->fetchColumn() ?: 0);
$openJobsCount    = (int)($pdo->query("SELECT COUNT(*) FROM jobs WHERE status='open'")->fetchColumn() ?: 0);
$doneJobsCount    = (int)($pdo->query("SELECT COUNT(*) FROM jobs WHERE status='completed'")->fetchColumn() ?: 0);
$cancelJobsCount  = (int)($pdo->query("SELECT COUNT(*) FROM jobs WHERE status='closed'")->fetchColumn() ?: 0);
$pendingJobsCount = (int)($pdo->query("SELECT COUNT(*) FROM jobs WHERE status='pending_approval'")->fetchColumn() ?: 0);
$remainingJobsCount = max(0, $totalJobsCount - $doneJobsCount - $pendingJobsCount);

$userCount = (int)($pdo->query("SELECT COUNT(*) FROM users")->fetchColumn() ?: 0);

// ================== FETCH JOBS ==================
$jobsStmt = $pdo->query("SELECT * FROM jobs ORDER BY id DESC");
$jobs = $jobsStmt->fetchAll(PDO::FETCH_ASSOC);

// ================== FETCH TASK COUNTS PER JOB ==================
$taskCountsPerJob = [];
$taskStmt = $pdo->prepare("
    SELECT 
        job_id,
        COUNT(*) AS total_submitted,
        SUM(CASE WHEN status='approved' THEN 1 ELSE 0 END) AS approved,
        SUM(CASE WHEN status='pending' THEN 1 ELSE 0 END) AS pending,
        SUM(CASE WHEN status='rejected' THEN 1 ELSE 0 END) AS rejected
    FROM job_work
    WHERE job_id = ?
    GROUP BY job_id
");

foreach ($jobs as $job) {
    $job_id = $job['id'];
    $taskStmt->execute([$job_id]);
    $taskCounts = $taskStmt->fetch(PDO::FETCH_ASSOC);

    $totalSubmitted = (int)($taskCounts['total_submitted'] ?? 0);
    $approvedTasks  = (int)($taskCounts['approved'] ?? 0);
    $pendingTasks   = (int)($taskCounts['pending'] ?? 0);
    $rejectedTasks  = (int)($taskCounts['rejected'] ?? 0);
    $remainingTasks = max(0, (int)$job['total_tasks'] - $totalSubmitted);

    $taskCountsPerJob[$job_id] = [
        'total'     => $totalSubmitted,
        'approved'  => $approvedTasks,
        'pending'   => $pendingTasks,
        'rejected'  => $rejectedTasks,
        'remaining' => $remainingTasks
    ];
}


// Fund / Withdraw requests counts
$frStmt = $pdo->prepare("SELECT COUNT(*) FROM fund_requests WHERE user_id = ? OR transfer_to_user = ?");
$frStmt->execute([$userId, $userId]);
$fundRequestsCount = (int)$frStmt->fetchColumn();

$wrStmt = $pdo->prepare("SELECT COUNT(*) FROM withdraw_requests WHERE user_id = ?");
$wrStmt->execute([$userId]);
$withdrawRequestsCount = (int)$wrStmt->fetchColumn();

// ================== SAFE NUMBER FORMAT FUNCTION ==================
function safeFormat($num) {
    return number_format((float)($num ?? 0), 4);
}
	
// ================== DASHBOARD NAVIGATION ==================

// User-specific counts
$userTotalJobs   = $totalJobsPosted;     // Jobs posted by this user
$userActiveJobs  = $activeJobsPoster;    // Active jobs for this user
$userDoneJobs    = $doneJobsPoster;      // Completed jobs by this user

// Pending counts for NAV
$pendingAddFundCount  = (int)($fundStats['count_pending_fund'] ?? 0);
$pendingTransferCount = (int)($transferStats['count_transferred_pending'] ?? 0);
$pendingWithdrawCount = (int)($withdrawStats['count_withdraw_pending'] ?? 0);

// User-specific counts
$userTotalJobs   = $totalJobsPosted;     
$userActiveJobs  = $activeJobsPoster;    
$userDoneJobs    = $doneJobsPoster;      
// Pending fund / withdraw / transfer
$pendingAddFund       = (float)($pdo->query("
    SELECT COALESCE(SUM(amount),0) 
    FROM fund_requests 
    WHERE status='pending' AND user_id=$userId AND (transfer_to_user IS NULL OR transfer_to_user=$userId)
")->fetchColumn() ?: 0);

$pendingTransfer      = (float)($pdo->query("
    SELECT COALESCE(SUM(amount),0) 
    FROM fund_requests 
    WHERE status='pending' AND user_id=$userId AND transfer_to_user IS NOT NULL AND transfer_to_user != $userId
")->fetchColumn() ?: 0);

// ================== PENDING WITHDRAW ==================
$pendingWithdraw = (float) ($pdo->query("
    SELECT COALESCE(SUM(amount), 0) 
    FROM withdraw_requests 
    WHERE status = 'pending' AND user_id = $userId
")->fetchColumn() ?: 0);

// ================== EARNINGS ==================
$totalEarnings    = (float) ($totalEarningsApproved + $totalEarningsPending + $totalEarningsRejected);
$pendingEarnings  = (float) ($totalEarningsPending ?? 0);
$rejectedEarnings = (float) ($totalEarningsRejected ?? 0);
$referralEarnings = (float) ($totalReferralApproved + $totalReferralPending + $totalReferralRejected);
$fines            = (float) ($totalFines ?? 0);

// ================== ALL TRANSFER REQUESTS ==================
$allTransferRequestsStmt = $pdo->prepare("
    SELECT 
        fr.*, 
        u.username AS from_username,
        u.email AS from_email,
        tu.username AS to_username,
        tu.email AS to_email
    FROM fund_requests fr
    LEFT JOIN users u  ON u.id = fr.user_id
    LEFT JOIN users tu ON tu.id = fr.transfer_to_user
    WHERE fr.transfer_to_user IS NOT NULL
    ORDER BY fr.created_at DESC
");
$allTransferRequestsStmt->execute();
$allTransferRequests = $allTransferRequestsStmt->fetchAll(PDO::FETCH_ASSOC) ?: [];

// ================== PENDING WITHDRAW COUNT ==================
$pendingWithdrawCount = (int) ($pdo->query("
    SELECT COUNT(*) 
    FROM withdraw_requests 
    WHERE status = 'pending'
")->fetchColumn() ?: 0);

// ✅ FIX: Add withdraw count to total transfer request count
$totalTransferCount = count($allTransferRequests);
$displayTransferCount = $totalTransferCount + $pendingWithdrawCount;

echo "All Transfer Requests (" . $displayTransferCount . ")";

// ================== REFERRER COUNT ==================
$stmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE referrer = ?");
$stmt->execute([$currentUsername]);
$referrerCount = (int) $stmt->fetchColumn();







// ================== EXAMPLE: COUNTABLE CHECK ==================
$allTransferRequests = $allTransferRequests ?? [];
$transferCount = is_countable($allTransferRequests) ? count($allTransferRequests) : 0;

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>User Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.datatables.net/1.13.6/css/dataTables.bootstrap5.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" rel="stylesheet">
    <style>
        body { background-color: #f8f9fa; }
        .card { cursor: pointer; transition: transform 0.2s; }
        .card:hover { transform: scale(1.03); }
    </style>
</head>
<body class="p-3">

<div class="container-fluid">
  <h2 class="mb-3 text-center">🧭 User Dashboard</h2>

    <!-- Flash Messages -->
    <?php if(!empty($flashError)): ?>
        <div class="alert alert-danger"><?= htmlspecialchars($flashError) ?></div>
    <?php endif; ?>
    <?php if(!empty($flashSuccess)): ?>
        <div class="alert alert-success"><?= htmlspecialchars($flashSuccess) ?></div>
    <?php endif; ?>

 <!-- =================== PROFILE SECTION =================== -->
<div class="card shadow-sm mb-4">
  <div class="card-header bg-primary text-white">
    <h5 class="mb-0">Update Profile</h5>
  </div>

  <div class="card-body">
    <form method="POST" enctype="multipart/form-data">

      <!-- Profile Picture -->
      <div class="row mb-3 text-center">
        <div class="col-md-12">
          <label class="form-label fw-bold">Profile Picture</label><br>
          <?php if(!empty($userData['profile_pic'])): ?>
            <img src="<?= htmlspecialchars($userData['profile_pic']) ?>" class="rounded-circle mb-2" width="120" height="120" alt="Profile Picture">
          <?php else: ?>
            <img src="/assets/default-profile.png" class="rounded-circle mb-2" width="120" height="120" alt="Default Picture">
          <?php endif; ?>
          <input type="file" name="profile_pic" class="form-control mt-2">
          <?php if(!empty($userData['profile_pic'])): ?>
            <small><a href="<?= htmlspecialchars($userData['profile_pic']) ?>" target="_blank">View Uploaded</a></small>
          <?php endif; ?>
        </div>
      </div>

      <!-- Name / Username -->
      <div class="row mb-3">
        <div class="col-md-6">
          <label class="form-label">Full Name</label>
          <input type="text" class="form-control" value="<?= htmlspecialchars($userData['full_name'] ?? '') ?>" readonly>
        </div>
        <div class="col-md-6">
          <label class="form-label">Username</label>
          <input type="text" class="form-control" value="<?= htmlspecialchars($userData['username'] ?? '') ?>" readonly>
        </div>
      </div>

      <!-- Email / Phone -->
      <div class="row mb-3">
        <div class="col-md-6">
          <label class="form-label">Email ID</label>
          <input type="email" class="form-control" value="<?= htmlspecialchars($userData['email'] ?? '') ?>" readonly>
        </div>
        <div class="col-md-3">
          <label class="form-label">Country Code</label>
          <input type="text" class="form-control" value="<?= htmlspecialchars($userData['phone_code'] ?? '') ?>" readonly>
        </div>
        <div class="col-md-3">
          <label class="form-label">Phone/Mobile Number</label>
          <input type="text" class="form-control" value="<?= htmlspecialchars($userData['phone'] ?? '') ?>" readonly>
        </div>
      </div>

      <!-- Birth / NID / Password -->
      <div class="row mb-3">
        <div class="col-md-4">
          <label class="form-label">Birth Date</label>
          <input type="date" name="birth_date" value="<?= htmlspecialchars($userData['birth_date'] ?? '') ?>" class="form-control">
        </div>
        <div class="col-md-4">
          <label class="form-label">NID Number</label>
          <input type="text" name="nid_number" value="<?= htmlspecialchars($userData['nid_number'] ?? '') ?>" class="form-control">
        </div>
        <div class="col-md-4">
          <label class="form-label">Password (leave blank to keep unchanged)</label>
          <div class="input-group">
            <input type="password" name="password" class="form-control" placeholder="********">
            <span class="input-group-text toggle-password" style="cursor:pointer;">
              <i class="bi bi-eye"></i>
            </span>
          </div>
        </div>
      </div>

      <!-- NID Uploads -->
      <div class="row mb-3">
        <div class="col-md-4">
          <label class="form-label">NID Front</label>
          <input type="file" name="nid_front" class="form-control">
          <?php if(!empty($userData['nid_front'])): ?>
            <small><a href="<?= htmlspecialchars($userData['nid_front']) ?>" target="_blank">View Uploaded</a></small>
          <?php endif; ?>
        </div>

        <div class="col-md-4">
          <label class="form-label">NID Back</label>
          <input type="file" name="nid_back" class="form-control">
          <?php if(!empty($userData['nid_back'])): ?>
            <small><a href="<?= htmlspecialchars($userData['nid_back']) ?>" target="_blank">View Uploaded</a></small>
          <?php endif; ?>
        </div>

        <div class="col-md-4 text-center">
          <label class="form-label">Selfie</label>
          <input type="file" name="selfie" class="form-control">
          <?php if(!empty($userData['selfie'])): ?>
            <small><a href="<?= htmlspecialchars($userData['selfie']) ?>" target="_blank">View Uploaded</a></small><br>
            <img src="<?= htmlspecialchars($userData['selfie']) ?>" alt="Selfie" width="120" height="120" class="rounded mt-2">
          <?php else: ?>
            <img src="/assets/default-profile.png" alt="Default Selfie" width="120" height="120" class="rounded mt-2">
          <?php endif; ?>
        </div>
      </div>

      <!-- Save Button -->
      <div class="text-end">
        <button type="submit" name="profile_update" class="btn btn-success px-4">Save Changes</button>
      </div>
    </form>
  </div>
</div>

<!-- =================== DASHBOARD NAVIGATION =================== -->
<?php
$colors = [
    'primary'   => '#0d6efd',
    'secondary' => '#6c757d',
    'success'   => '#198754',
    'info'      => '#0dcaf0',
    'warning'   => '#ffc107',
    'danger'    => '#dc3545',
    'dark'      => '#212529'
];

$userId   = $_SESSION['user']['id'] ?? null;
$userRole = $_SESSION['user']['user_role'] ?? '';
$username = $_SESSION['user']['username'] ?? '';

// Navigation items
$nav = [
    ['title'=>"Others Dashboard",   'icon'=>'bi-cash',            'color'=>'primary',   'link'=>'/dashboard.php',    'count'=>null,                    'role'=>'admin',  'desc'=>"Reach Others."],
    ['title'=>"Manage Users",       'icon'=>'bi-people',          'color'=>'primary',   'link'=>'#usersTable',       'count'=>$userCount ?? 0,         'role'=>'admin', 'desc'=>"Manage all registered users."],
    ['title'=>"Transactions",       'icon'=>'bi-receipt',         'color'=>'success',   'link'=>'#transactionsTable','count'=>null, 				   'role'=>'user', 'desc'=>"View all transactions."],
    ['title'=>"Fund Requests",      'icon'=>'bi-wallet2',         'color'=>'warning',   'link'=>'#fundRequestsTable','count'=>null,    				   'role'=>'user', 'desc'=>"Track all fund requests or transfers."],
    ['title'=>"Withdraw Requests",  'icon'=>'bi-cash',            'color'=>'danger',    'link'=>'#withdrawRequestsTable','count'=>null, 			   'role'=>'user', 'desc'=>"View your pending or approved withdraw requests."],
    ['title'=>"Total Jobs",         'icon'=>'bi-briefcase',       'color'=>'secondary', 'link'=>'#',                 'count'=>$totalJobsCount ?? 0,    'role'=>'admin', 'desc'=>"All jobs created."],
    ['title'=>"Open Jobs",          'icon'=>'bi-play',            'color'=>'info',      'link'=>'#',                 'count'=>$openJobsCount ?? 0,     'role'=>'admin', 'desc'=>"Jobs currently open for work."],
    ['title'=>"Completed Jobs",     'icon'=>'bi-check-circle',    'color'=>'success',   'link'=>'#',                 'count'=>$doneJobsCount ?? 0,     'role'=>'admin', 'desc'=>"Jobs completed successfully."],
    ['title'=>"Pending Job Work",   'icon'=>'bi-hourglass-split','color'=>'warning',   'link'=>'#',                 'count'=>$pendingJobWorkCount ?? 0,'role'=>'admin','desc'=>"Jobs waiting for worker action."],
    ['title'=>"Remaining Jobs",     'icon'=>'bi-hourglass-bottom','color'=>'dark',     'link'=>'#',                 'count'=>$remainingJobsCount ?? 0,'role'=>'admin','desc'=>"Jobs still in progress."],
    ['title'=>"Fund / Transfer",    'icon'=>'bi-plus-circle',     'color'=>'info',      'link'=>'#fundForm',         'count'=>null,					    'role'=>'all',   'desc'=>"Deposit funds or send to other users (2% fee applies)."],
    ['title'=>"Withdraw",           'icon'=>'bi-arrow-up-right',  'color'=>'secondary', 'link'=>'#withdrawForm',     'count'=>null,					    'role'=>'all',   'desc'=>"Withdraw funds to payment gateways (requires approval)."],
    ['title'=>"Post Job",           'icon'=>'bi-plus-circle',     'color'=>'dark',      'link'=>'/post_job.php',      'count'=>$userTotalJobs ?? 0,      'role'=>'all',   'desc'=>"Create new jobs/tasks with title, description, and budget."],
    ['title'=>"Job Post List",      'icon'=>'bi-file-text',       'color'=>'secondary', 'link'=>'/tasks_list.php',    'count'=>$userActiveJobs ?? 0,    'role'=>'all',   'desc'=>"Track your posted jobs and see worker progress."],
    ['title'=>"Referrals",          'icon'=>'bi-share',           'color'=>'info',      'link'=>'/referrals.php',     'count'=>$referrerCount ?? 0,      'role'=>'all',   'desc'=>"Invite friends — earn 10% of their task earnings."],
    ['title'=>"Contact or Support", 'icon'=>'bi-people',          'color'=>'info',      'link'=>'/contact.php',       'count'=>$userCount ?? 0,                      'role'=>'user',  'desc'=>"Reach admin/support for any account or job-related issues."],
    ['title'=>"Do Job / Start Work",'icon'=>'bi-play-circle',     'color'=>'primary',   'link'=>'/job_work.php',      'count'=>$openJobsCount ?? 0,      'role'=>'user',  'desc'=>"Find available jobs and start working."],
    ['title'=>"My Work List",       'icon'=>'bi-clipboard-check', 'color'=>'success',   'link'=>'/my_work_list.php',  'count'=>$userDoneJobs ?? 0,      'role'=>'user',  'desc'=>"View your current and completed tasks."],
    ['title'=>"Logout",             'icon'=>'bi-box-arrow-right', 'color'=>'danger',    'link'=>'/logout.php',        'count'=>null,                      'role'=>'all',   'desc'=>"Safely log out of your account."]
];
?>

<div class="row g-3">
<?php foreach($nav as $item):
    if($item['role'] !== 'all' && $item['role'] !== $userRole) continue;
    $bgColor = $colors[$item['color']] ?? '#ffffff';
    $textColor = in_array($item['color'], ['warning','info']) ? 'text-dark' : 'text-white';
?>
  <div class="col-md-3 col-sm-6">
    <a href="<?= htmlspecialchars($item['link']) ?>" class="text-decoration-none nav-card">
      <div class="card h-100 <?= $textColor ?>" style="background-color: <?= $bgColor ?>;">
        <div class="card-body text-center">
          <i class="bi <?= htmlspecialchars($item['icon']) ?> fs-1"></i>
          <h5 class="card-title mt-2"><?= htmlspecialchars($item['title']) ?></h5>
          <?php if(!is_null($item['count'])): ?>
<?php if(!is_null($item['count'])): ?>
  <span class="badge bg-light text-dark mt-1">
    <?php 
      if(is_array($item['count'])) {
          echo number_format(count($item['count']));
      } else if(is_numeric($item['count'])) {
          echo number_format($item['count']);
      } else {
          echo htmlspecialchars($item['count']);
      }
    ?>
  </span>
<?php endif; ?>

          <?php endif; ?>
        </div>
        <div class="card-footer bg-light text-dark small">
          <?= htmlspecialchars($item['desc']) ?>
        </div>
      </div>
    </a>
  </div>
<?php endforeach; ?>
</div>

<!-- =================== FINANCIAL CARDS =================== -->
<div class="row g-3 mb-4 text-center">
<?php
$financialCards = [ 
    ['title'=>'Your Balance','value'=>$userBalance ?? 0,'bg'=>'primary','text'=>'white'],
    ['title'=>'Pending Add Fund','value'=>$pendingAddFund ?? 0,'bg'=>'info','text'=>'dark'],
    ['title'=>'Pending Withdraw','value'=>$pendingWithdraw ?? 0,'bg'=>'warning','text'=>'dark'],
    ['title'=>'Pending Transfer','value'=>$pendingTransfer ?? 0,'bg'=>'warning','text'=>'dark'],
    ['title'=>'Earnings','value'=>$totalEarnings ?? 0,'bg'=>'success','text'=>'white'],
    ['title'=>'Pending Earnings','value'=>$pendingEarnings ?? 0,'bg'=>'success','text'=>'white'],
    ['title'=>'Rejected Earnings','value'=>$rejectedEarnings ?? 0,'bg'=>'danger','text'=>'white'],
    ['title'=>'Referral Earnings','value'=>$referralEarnings ?? 0,'bg'=>'dark','text'=>'white'],
    ['title'=>'Fine for Wrong','value'=>$fines ?? 0,'bg'=>'danger','text'=>'white'],
    ['title'=>'Available for Services','value'=>$availableForServices ?? 0,'bg'=>'success','text'=>'white'],
];

foreach($financialCards as $card):
    $cardValue = number_format((float)($card['value'] ?? 0), 4);
?>
  <div class="col-md-3 col-sm-6">
    <div class="card p-3 shadow-sm text-center text-<?= htmlspecialchars($card['text']) ?> bg-<?= htmlspecialchars($card['bg']) ?>">
      <h6><?= htmlspecialchars($card['title']) ?></h6>
      <h4 class="mt-2">$<?= $cardValue ?></h4>
    </div>
  </div>
<?php endforeach; ?>

<div class="container py-4">
<h1>Jobs Dashboard</h1>

<!-- SUMMARY CARDS -->
<div class="row mb-4">
    <div class="col-md-2"><div class="card p-3 bg-light">Total Jobs: <?= $totalJobsCount ?></div></div>
    <div class="col-md-2"><div class="card p-3 bg-success text-white">Open: <?= $openJobsCount ?></div></div>
    <div class="col-md-2"><div class="card p-3 bg-primary text-white">Completed: <?= $doneJobsCount ?></div></div>
    <div class="col-md-2"><div class="card p-3 bg-secondary text-white">Closed: <?= $cancelJobsCount ?></div></div>
    <div class="col-md-2"><div class="card p-3 bg-warning text-dark">Pending Approval: <?= $pendingJobsCount ?></div></div>
    <div class="col-md-2"><div class="card p-3 bg-info text-white">Remaining: <?= $remainingJobsCount ?></div></div>
</div>

<p>Total Users: <?= $userCount ?></p>

<!-- JOB LIST WITH TASK COUNTS -->
<h2>Jobs List</h2>
<table class="table table-bordered align-middle">
    <thead class="table-light">
        <tr>
            <th>ID</th>
            <th>Platform</th>
            <th>Category</th>
            <th>Total Tasks</th>
            <th>Submitted</th>
            <th>Approved</th>
            <th>Pending</th>
            <th>Rejected</th>
            <th>Remaining</th>
        </tr>
    </thead>
    <tbody>
    <?php foreach($jobs as $job):
        $counts = $taskCountsPerJob[$job['id']] ?? [
            'total'=>0,
            'approved'=>0,
            'pending'=>0,
            'rejected'=>0,
            'remaining'=>$job['total_tasks']
        ];
        // Determine badge color for remaining tasks
        $remainingBadge = $counts['remaining'] === 0 ? 'bg-success' : 'bg-info text-dark';
    ?>
        <tr>
            <td><?= $job['id'] ?></td>
            <td><?= htmlspecialchars($job['platform']) ?></td>
            <td><?= htmlspecialchars($job['task_type']) ?></td>
            <td><?= $job['total_tasks'] ?></td>
            <td><span class="badge bg-secondary"><?= $counts['total'] ?></span></td>
            <td><span class="badge bg-success"><?= $counts['approved'] ?></span></td>
            <td><span class="badge bg-warning text-dark"><?= $counts['pending'] ?></span></td>
            <td><span class="badge bg-danger"><?= $counts['rejected'] ?></span></td>
            <td><span class="badge <?= $remainingBadge ?>"><?= $counts['remaining'] ?></span></td>
        </tr>
    <?php endforeach; ?>
    </tbody>
</table>

</div>



<style>
.nav-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 12px rgba(0,0,0,0.2);
  text-decoration: none;
  transition: 0.3s;
}
</style>

  <!-- ====================== -->
  <!-- Copy Button JS -->
  <!-- ====================== -->
<script>a
  // Toggle password visibility
  document.querySelectorAll('.toggle-password').forEach(span => {
    span.addEventListener('click', function(){
      let input = this.previousElementSibling;
      if(input.type === 'password') input.type='text';
      else input.type='password';
      this.querySelector('i').classList.toggle('bi-eye');
      this.querySelector('i').classList.toggle('bi-eye-slash');
    });
  });
</script>

<?php
// Fetch all users for transfer options
$allUsers = $pdo->query("SELECT id, username, email FROM users ORDER BY username ASC")->fetchAll(PDO::FETCH_ASSOC) ?: [];
?>


<!-- ====================== -->
<!-- Admin Payment Accounts -->
<!-- ====================== -->
<div class="container mt-4">
  <h4 class="mb-3 text-center fw-bold">Admin Payment Accounts</h4>
  <div class="row g-3">
    <!-- Payeer -->
    <div class="col-md-6 col-lg-4">
      <div class="card shadow-sm h-100">
        <div class="card-body">
          <h5 class="card-title text-primary mb-3">Payeer</h5>
          <p><strong>Account:</strong> <span id="payeerAccount">P1132063324</span>
            <button class="btn btn-sm btn-outline-secondary ms-2 copy-btn" data-target="payeerAccount">Copy</button>
          </p>
          <p><strong>Mobile:</strong> <span id="payeerMobile">+8801911866493</span>
            <button class="btn btn-sm btn-outline-secondary ms-2 copy-btn" data-target="payeerMobile">Copy</button>
          </p>
          <p><strong>Name:</strong> <span id="payeerName">Md Asaduzzaman</span>
            <button class="btn btn-sm btn-outline-secondary ms-2 copy-btn" data-target="payeerName">Copy</button>
          </p>
        </div>
      </div>
    </div>
    <!-- Binance -->
    <div class="col-md-6 col-lg-4">
      <div class="card shadow-sm h-100">
        <div class="card-body">
          <h5 class="card-title text-warning mb-3">Binance</h5>
          <p><strong>Account:</strong> <span id="binanceAccount">1118376380</span>
            <button class="btn btn-sm btn-outline-secondary ms-2 copy-btn" data-target="binanceAccount">Copy</button>
          </p>
          <p><strong>Mobile:</strong> <span id="binanceMobile">+8801911866493</span>
            <button class="btn btn-sm btn-outline-secondary ms-2 copy-btn" data-target="binanceMobile">Copy</button>
          </p>
          <p><strong>Name:</strong> <span id="binanceName">Md Asaduzzaman</span>
            <button class="btn btn-sm btn-outline-secondary ms-2 copy-btn" data-target="binanceName">Copy</button>
          </p>
        </div>
      </div>
    </div>
    <!-- Payoneer 1 -->
    <div class="col-md-6 col-lg-4">
      <div class="card shadow-sm h-100">
        <div class="card-body">
          <h5 class="card-title text-danger mb-3">Payoneer (1)</h5>
          <p><strong>Email:</strong> <span id="payoneer1Email">asaduzzaman.bheramara@hotmail.com</span>
            <button class="btn btn-sm btn-outline-secondary ms-2 copy-btn" data-target="payoneer1Email">Copy</button>
          </p>
          <p><strong>Card:</strong> <span id="payoneer1Card">5226923266074335</span>
            <button class="btn btn-sm btn-outline-secondary ms-2 copy-btn" data-target="payoneer1Card">Copy</button>
          </p>
          <p><strong>Mobile:</strong> <span id="payoneer1Mobile">+8801911866493</span>
            <button class="btn btn-sm btn-outline-secondary ms-2 copy-btn" data-target="payoneer1Mobile">Copy</button>
          </p>
        </div>
      </div>
    </div>
    <!-- Payoneer 2 -->
    <div class="col-md-6 col-lg-4">
      <div class="card shadow-sm h-100">
        <div class="card-body">
          <h5 class="card-title text-danger mb-3">Payoneer (2)</h5>
          <p><strong>Email:</strong> <span id="payoneer2Email">hiselanderson@gmail.com</span>
            <button class="btn btn-sm btn-outline-secondary ms-2 copy-btn" data-target="payoneer2Email">Copy</button>
          </p>
          <p><strong>Card:</strong> <span id="payoneer2Card">5226923214905515</span>
            <button class="btn btn-sm btn-outline-secondary ms-2 copy-btn" data-target="payoneer2Card">Copy</button>
          </p>
          <p><strong>Mobile:</strong> <span id="payoneer2Mobile">+8801911866493</span>
            <button class="btn btn-sm btn-outline-secondary ms-2 copy-btn" data-target="payoneer2Mobile">Copy</button>
          </p>
        </div>
      </div>
    </div>
    <!-- Paypal -->
    <div class="col-md-6 col-lg-4">
      <div class="card shadow-sm h-100">
        <div class="card-body">
          <h5 class="card-title text-info mb-3">Paypal</h5>
          <p><strong>Email:</strong> <span id="paypalEmail">jessica26s791@gmail.com</span>
            <button class="btn btn-sm btn-outline-secondary ms-2 copy-btn" data-target="paypalEmail">Copy</button>
          </p>
          <p><strong>Mobile:</strong> <span id="paypalMobile">+8801911866493</span>
            <button class="btn btn-sm btn-outline-secondary ms-2 copy-btn" data-target="paypalMobile">Copy</button>
          </p>
        </div>
      </div>
    </div>
    <!-- Bkash -->
    <div class="col-md-6 col-lg-4">
      <div class="card shadow-sm h-100">
        <div class="card-body">
          <h5 class="card-title text-info mb-3">Bkash</h5>
          <p><strong>Account:</strong> <span id="bkashAccount">Md Asaduzzaman</span>
            <button class="btn btn-sm btn-outline-secondary ms-2 copy-btn" data-target="bkashAccount">Copy</button>
          </p>
          <p><strong>Mobile:</strong> <span id="bkashMobile">+8801911866493</span>
            <button class="btn btn-sm btn-outline-secondary ms-2 copy-btn" data-target="bkashMobile">Copy</button>
          </p>
        </div>
      </div>
    </div>
    <!-- Nagad -->
    <div class="col-md-6 col-lg-4">
      <div class="card shadow-sm h-100">
        <div class="card-body">
          <h5 class="card-title text-info mb-3">Nagad</h5>
          <p><strong>Account:</strong> <span id="nagadAccount">Md Asaduzzaman</span>
            <button class="btn btn-sm btn-outline-secondary ms-2 copy-btn" data-target="nagadAccount">Copy</button>
          </p>
          <p><strong>Mobile:</strong> <span id="nagadMobile">+8801911866493</span>
            <button class="btn btn-sm btn-outline-secondary ms-2 copy-btn" data-target="nagadMobile">Copy</button>
          </p>
        </div>
      </div>
    </div>
    <!-- Islami Bank 1 -->
    <div class="col-md-6 col-lg-4">
      <div class="card shadow-sm h-100">
        <div class="card-body">
          <h5 class="card-title text-success mb-3">Islami Bank (1)</h5>
          <p><strong>Account No:</strong> <span id="islami1Account">20502670200412212</span>
            <button class="btn btn-sm btn-outline-secondary ms-2 copy-btn" data-target="islami1Account">Copy</button>
          </p>
          <p><strong>Name:</strong> <span id="islami1Name">MD ASADUZZAMAN</span>
            <button class="btn btn-sm btn-outline-secondary ms-2 copy-btn" data-target="islami1Name">Copy</button>
          </p>
          <p><strong>Branch:</strong> <span id="islami1Branch">MOHAMMADPUR KRISHI MARKET, DHAKA</span>
            <button class="btn btn-sm btn-outline-secondary ms-2 copy-btn" data-target="islami1Branch">Copy</button>
          </p>
          <p><strong>Card:</strong> <span id="islami1Card">4170331177575466</span>
            <button class="btn btn-sm btn-outline-secondary ms-2 copy-btn" data-target="islami1Card">Copy</button>
          </p>
          <p><strong>Routing:</strong> <span id="islami1Routing">125263377</span>
            <button class="btn btn-sm btn-outline-secondary ms-2 copy-btn" data-target="islami1Routing">Copy</button>
          </p>
          <p><strong>Mobile:</strong> <span id="islami1Mobile">+8801911866493</span>
            <button class="btn btn-sm btn-outline-secondary ms-2 copy-btn" data-target="islami1Mobile">Copy</button>
          </p>
        </div>
      </div>
    </div>
    <!-- Islami Bank 2 -->
    <div class="col-md-6 col-lg-4">
      <div class="card shadow-sm h-100">
        <div class="card-body">
          <h5 class="card-title text-success mb-3">Islami Bank (2)</h5>
          <p><strong>Account No:</strong> <span id="islami2Account">20502240100122707</span>
            <button class="btn btn-sm btn-outline-secondary ms-2 copy-btn" data-target="islami2Account">Copy</button>
          </p>
          <p><strong>Name:</strong> <span id="islami2Name">SHOPNO DATABASE FIRM</span>
            <button class="btn btn-sm btn-outline-secondary ms-2 copy-btn" data-target="islami2Name">Copy</button>
          </p>
          <p><strong>Branch:</strong> <span id="islami2Branch">AGARGAON BRANCH, DHAKA</span>
            <button class="btn btn-sm btn-outline-secondary ms-2 copy-btn" data-target="islami2Branch">Copy</button>
          </p>
          <p><strong>Card:</strong> <span id="islami2Card">4170338073144149</span>
            <button class="btn btn-sm btn-outline-secondary ms-2 copy-btn" data-target="islami2Card">Copy</button>
          </p>
          <p><strong>Routing:</strong> <span id="islami2Routing">125262149</span>
            <button class="btn btn-sm btn-outline-secondary ms-2 copy-btn" data-target="islami2Routing">Copy</button>
          </p>
          <p><strong>Mobile:</strong> <span id="islami2Mobile">+8801911866493</span>
            <button class="btn btn-sm btn-outline-secondary ms-2 copy-btn" data-target="islami2Mobile">Copy</button>
          </p>
        </div>
      </div>
    </div>

  </div>
</div>

<!-- ====================== -->
<!-- Copy Button JS -->
<!-- ====================== -->
<script>
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = document.getElementById(btn.dataset.target);
    if(target){
      navigator.clipboard.writeText(target.innerText).then(()=>{
        const oldText = btn.innerText;
        btn.innerText = 'Copied!';
        setTimeout(()=> btn.innerText = oldText, 1500);
      });
    }
  });
});
</script>
<!-- ================== FUND FORM ================== -->
<div class="card border-success mb-4" id="fundForm">
  <div class="card-header bg-success text-white">
    💰 Add Funds / Transfer / Manual Deposit
  </div>
  <div class="card-body">
    <p class="text-muted mb-3">
      To add funds to your account, deposit the amount to the <strong>admin account</strong> using the selected gateway, 
      provide the gateway ID and phone, and upload a proof screenshot.  
      To transfer funds to another user, select the target user (other than yourself). Ensure you have sufficient balance 
      in your account for the transfer. Transfers to other users incur a 2% fee.
    </p>

    <form method="post" class="row g-2 align-items-center" enctype="multipart/form-data">
      <div class="col-md-2">
        <label class="form-label">Amount</label>
        <input type="number" step="0.0001" min="0" name="fund_amount" class="form-control" placeholder="Amount" required>
      </div>
      <div class="col-md-2">
        <label class="form-label">Currency</label>
        <select name="fund_currency" class="form-select">
          <option value="USD">USD</option>
          <option value="USDT">USDT</option>
          <option value="BTC">BTC</option>
        </select>
      </div>
      <div class="col-md-2">
        <label class="form-label">Gateway</label>
        <select name="fund_gateway" class="form-select" required>
          <option value="payeer">Payeer</option>
          <option value="binance">Binance</option>
          <option value="manual">Manual</option>
        </select>
      </div>
      <div class="col-md-3">
        <label class="form-label">Target User</label>
        <select name="fund_target_user" class="form-select">
          <option value="<?= $userId ?>">Self (Add to Your Account)</option>
          <?php foreach($usersList as $u):
            if($u['id'] != $userId): ?>
            <option value="<?= (int)$u['id'] ?>"><?= htmlspecialchars($u['username'].' ('.$u['email'].')') ?></option>
          <?php endif; endforeach; ?>
        </select>
      </div>
      <div class="col-md-2">
        <label class="form-label">Gateway ID / Account</label>
        <input type="text" name="fund_gateway_id" class="form-control" placeholder="Example: P123456 / Binance ID" required>
      </div>
      <div class="col-md-2">
        <label class="form-label">Mobile / Phone</label>
        <input type="text" name="fund_phone" class="form-control" placeholder="+880..." required>
      </div>
<div class="col-md-4">
  <label class="form-label">Proof Screenshot</label>
  <input type="file" name="fund_proof" class="form-control" accept="image/*" <?= empty($userData['fund_proof']) ? 'required' : '' ?>>
<?php if(!empty($userData['fund_proof'])): ?>
  <small><a href="<?= htmlspecialchars($userData['fund_proof']) ?>" target="_blank">View Uploaded</a></small><br>
  <img src="<?= htmlspecialchars($userData['fund_proof']) ?>" alt="Proof Screenshot" width="120" height="120" class="rounded mt-2 border">
<?php endif; ?>
</div>

	  
	  
	  <div class="col-md-1 d-flex align-items-end">
        <button name="fund_submit" class="btn btn-success w-150">Submit</button>
      </div>
    </form>
    <small class="small-note text-muted d-block mt-2">ℹ️ Transfer fee to other users: 2%</small>
  </div>
</div>

<!-- ================== WITHDRAW FORM ================== -->
<div class="card border-danger mb-4" id="withdrawForm">
  <div class="card-header bg-danger text-white">
    🏦 Withdraw (User) - Request Funds to External Gateway
  </div>
  <div class="card-body">
    <p class="text-muted mb-3">
      To withdraw funds from your account, fill in the amount, select currency and gateway, provide the gateway ID and phone, 
      and upload a proof screenshot. Withdrawals create a pending request that must be approved by an admin.
    </p>

    <form method="post" class="row g-2 align-items-center" enctype="multipart/form-data">
      <div class="col-md-2">
        <label class="form-label">Amount</label>
        <input type="number" step="0.0001" min="0" name="withdraw_amount" class="form-control" placeholder="Amount" required>
      </div>
      <div class="col-md-2">
        <label class="form-label">Currency</label>
        <select name="withdraw_currency" class="form-select">
          <option value="USD">USD</option>
          <option value="USDT">USDT</option>
          <option value="BTC">BTC</option>
        </select>
      </div>
      <div class="col-md-2">
        <label class="form-label">Gateway</label>
        <select name="withdraw_gateway" class="form-select" required>
          <option value="payeer">Payeer</option>
          <option value="binance">Binance</option>
          <option value="manual">Manual</option>
        </select>
      </div>
      <div class="col-md-3">
        <label class="form-label">Withdraw From</label>
        <input type="text" class="form-control" value="Your Account" readonly>
      </div>
      <div class="col-md-2">
        <label class="form-label">Gateway ID / Account</label>
        <input type="text" name="withdraw_gateway_id" class="form-control" placeholder="Example: P123456 / Binance ID" required>
      </div>
      <div class="col-md-2">
        <label class="form-label">Mobile / Phone</label>
        <input type="text" name="withdraw_phone" class="form-control" placeholder="+880..." required>
      </div>
     <div class="col-md-4">
  <label class="form-label">Proof Screenshot</label>
  <input type="file" name="withdraw_proof" class="form-control" accept="image/*" <?= empty($userData['withdraw_proof']) ? 'required' : '' ?>>
<?php if(!empty($userData['withdraw_proof'])): ?>
  <small><a href="<?= htmlspecialchars($userData['withdraw_proof']) ?>" target="_blank">View Uploaded</a></small><br>
  <img src="<?= htmlspecialchars($userData['withdraw_proof']) ?>" alt="Proof Screenshot" width="120" height="120" class="rounded mt-2 border">
<?php endif; ?>
</div>

	  <div class="col-md-1 d-flex align-items-end">
        <button name="withdraw_submit" class="btn btn-danger w-150">Request</button>
      </div>
    </form>
    <small class="small-note text-muted d-block mt-2">
      ⚠️ Withdraws create a pending request. Admin must approve withdrawals.
    </small>
  </div>
</div>
<?php
// ================== SAFELY INITIALIZE VARIABLES ==================
$currentUserId = $userId ?? 0; // Logged-in user
$isAdmin = ($userRole === 'admin');

// ================== FETCH FUND REQUESTS ==================

// Add Fund (user adds money to own account)
$allAddFundRequests = $pdo->query("
    SELECT fr.*, u.username AS from_username, u.email AS from_email
    FROM fund_requests fr
    LEFT JOIN users u ON u.id = fr.user_id
    -- Add-fund means: no transfer_to_user OR same user_id (self)
    WHERE (fr.transfer_to_user IS NULL OR fr.transfer_to_user = fr.user_id)
    ORDER BY fr.created_at DESC
")->fetchAll(PDO::FETCH_ASSOC) ?: [];

// Transfer (user sends funds to another user)
$allTransferRequests = $pdo->query("
    SELECT fr.*, 
           u.username  AS from_username, u.email  AS from_email,
           tu.username AS to_username,   tu.email AS to_email
    FROM fund_requests fr
    LEFT JOIN users u  ON u.id  = fr.user_id
    LEFT JOIN users tu ON tu.id = fr.transfer_to_user
    -- Transfer means: transfer_to_user exists AND is not same as sender
    WHERE fr.transfer_to_user IS NOT NULL 
      AND fr.transfer_to_user != fr.user_id
    ORDER BY fr.created_at DESC
")->fetchAll(PDO::FETCH_ASSOC) ?: [];

// Withdraw requests
$allWithdrawRequests = $pdo->query("
    SELECT wr.*, u.username, u.email
    FROM withdraw_requests wr
    LEFT JOIN users u ON u.id = wr.user_id
    ORDER BY wr.created_at DESC
")->fetchAll(PDO::FETCH_ASSOC) ?: [];

// ================== FILTER CURRENT USER REQUESTS ==================
// User's own fund requests (self add)
$userAddFundRequests = array_filter($allAddFundRequests, fn($r) => 
    ($r['user_id'] ?? 0) == $currentUserId && ($r['transfer_to_user'] ?? 0) == $currentUserId
);

// Transfers where user is sender or receiver
$userTransferRequests = array_filter($allTransferRequests, fn($r) => 
    ($r['user_id'] ?? 0) == $currentUserId || ($r['transfer_to_user'] ?? 0) == $currentUserId
);

// Withdraw requests by user
$userWithdrawRequests = array_filter($allWithdrawRequests, fn($r) => 
    ($r['user_id'] ?? 0) == $currentUserId
);

// Ensure arrays are never null
$userAddFundRequests = $userAddFundRequests ?? [];
$userTransferRequests = $userTransferRequests ?? [];
$userWithdrawRequests = $userWithdrawRequests ?? [];

// ================== TABLE CONFIGURATION ==================
$tables = [
    [
        'title'   => 'Add Fund Requests',
        'data'    => $userAddFundRequests,
        'columns' => ['User','Amount','Currency','Proof','Status','Created'],
        'id'      => 'userAddFundTable',
        'color'   => 'success'
    ],
    [
        'title'   => 'Transfer Requests',
        'data'    => $userTransferRequests,
        'columns' => ['From','To','Amount','Currency','Proof','Status','Created'],
        'id'      => 'userTransferTable',
        'color'   => 'info'
    ],
    [
        'title'   => 'Withdraw Requests',
        'data'    => $userWithdrawRequests,
        'columns' => ['User','Amount','Currency','Proof','Status','Created'],
        'id'      => 'userWithdrawTable',
        'color'   => 'danger'
    ],
];

// ================== ADMIN TABLES ==================
$adminTables = [];
if ($isAdmin) {
    $adminTables = [
        [
            'title'   => 'All Add Fund Requests',
            'data'    => $allAddFundRequests,
            'columns' => ['User','Amount','Currency','Proof','Status','Created','Action'],
            'id'      => 'allAddFundTable',
            'color'   => 'success'
        ],
        [
            'title'   => 'All Transfer Requests',
            'data'    => $allTransferRequests,
            'columns' => ['From','To','Amount','Currency','Proof','Status','Created','Action'],
            'id'      => 'allTransferTable',
            'color'   => 'info'
        ],
        [
            'title'   => 'All Withdraw Requests',
            'data'    => $allWithdrawRequests,
            'columns' => ['User','Amount','Currency','Proof','Status','Created','Action'],
            'id'      => 'allWithdrawTable',
            'color'   => 'danger'
        ],
    ];
}

// ================== TABLE RENDER FUNCTION ==================
function renderTableWithProof($table) {
    $data = $table['data'] ?? [];
    ?>
    <div class="card mb-4 border-<?= htmlspecialchars($table['color']) ?>">
        <div class="card-header bg-<?= htmlspecialchars($table['color']) ?> text-dark">
            <h5><?= htmlspecialchars($table['title']) ?> (<?= count($data) ?>)</h5>
        </div>
        <div class="card-body table-wrap">
            <table id="<?= htmlspecialchars($table['id']) ?>" class="display nowrap table table-sm table-bordered">
                <thead>
                    <tr>
                        <th>#</th>
                        <?php foreach($table['columns'] as $col): ?>
                            <th><?= htmlspecialchars($col) ?></th>
                        <?php endforeach; ?>
                    </tr>
                </thead>
                <tbody>
                    <?php if($data): foreach($data as $i => $row): ?>
                        <tr>
                            <td><?= $i + 1 ?></td>
                            <?php foreach($table['columns'] as $col):
                                switch($col){
                                    case 'User':
                                        $name  = $row['from_username'] ?? $row['username'] ?? '-';
                                        $email = $row['from_email'] ?? $row['email'] ?? '-';
                                        echo '<td>'.htmlspecialchars($name).' ('.htmlspecialchars($email).')</td>';
                                        break;
                                    case 'From':
                                        $name  = $row['from_username'] ?? '-';
                                        $email = $row['from_email'] ?? '-';
                                        echo '<td>'.htmlspecialchars($name).' ('.htmlspecialchars($email).')</td>';
                                        break;
                                    case 'To':
                                        $name  = $row['to_username'] ?? '-';
                                        $email = $row['to_email'] ?? '-';
                                        echo '<td>'.htmlspecialchars($name).' ('.htmlspecialchars($email).')</td>';
                                        break;
                                    case 'Amount':
                                        echo '<td>$'.safeFormat($row['amount'] ?? 0).'</td>';
                                        break;
                                    case 'Currency':
                                        echo '<td>'.htmlspecialchars($row['currency'] ?? '-').'</td>';
                                        break;
                                    case 'Status':
                                        echo '<td>'.ucfirst(htmlspecialchars($row['status'] ?? 'Pending')).'</td>';
                                        break;
                                    case 'Created':
                                        echo '<td>'.htmlspecialchars($row['created_at'] ?? '-').'</td>';
                                        break;
                                    case 'Proof':
                                        if(!empty($row['proof_data'])){
                                            echo '<td><a href="'.htmlspecialchars($row['proof_data']).'" target="_blank">View Proof</a></td>';
                                        } else {
                                            echo '<td>-</td>';
                                        }
                                        break;
                                    case 'Action':
                                        echo '<td>
                                                <form method="post" class="d-flex gap-1">
                                                  <input type="hidden" name="req_id" value="'.((int)$row['id']).'">
                                                  <button name="approve" value="1" class="btn btn-sm btn-success">Approve</button>
                                                  <button name="reject" value="1" class="btn btn-sm btn-danger">Reject</button>
                                                </form>
                                              </td>';
                                        break;
                                    default:
                                        echo '<td>-</td>';
                                }
                            endforeach; ?>
                        </tr>
                    <?php endforeach; else: ?>
                        <tr><td colspan="<?= count($table['columns'])+1 ?>" class="text-center text-muted">No records found</td></tr>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </div>
    <?php
}

// ================== RENDER USER TABLES ==================
foreach($tables as $t) renderTableWithProof($t);

// ================== RENDER ADMIN TABLES ==================
if($isAdmin) foreach($adminTables as $t) renderTableWithProof($t);
?>



<!-- ====================== -->
<!-- DataTables Initialization -->
<!-- ====================== -->
<script>
$(document).ready(function() {
    $('#userFundRequestsTable, #userTransferRequestsTable, #userWithdrawRequestsTable, #allFundRequestsTable, #allTransferRequestsTable, #allWithdrawRequestsTable').DataTable({
        responsive: true,
        destroy: true
    });
});
</script>

<style>
#userFundRequestsTable th, #userFundRequestsTable td,
#userTransferRequestsTable th, #userTransferRequestsTable td,
#userWithdrawRequestsTable th, #userWithdrawRequestsTable td,
#allFundRequestsTable th, #allFundRequestsTable td,
#allTransferRequestsTable th, #allTransferRequestsTable td,
#allWithdrawRequestsTable th, #allWithdrawRequestsTable td {
    text-align: center !important;
    vertical-align: middle !important;
}

/* Different background for labels */
.form-label {
    background-color: #f0f8ff;
    padding: 5px 8px;
    border-radius: 4px;
    display: inline-block;
    width: 100%;
    font-weight: 600;
}

/* Different background for input fields */
.form-control:focus, .form-select:focus {
    background-color: #fffacd;
    border-color: #198754;
    outline: none;
}

.nav-card .card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.nav-card .card-body {
  flex: 1 1 auto; /* grow to fill available space */
}

.nav-card .card-footer {
  flex-shrink: 0; /* stay at bottom */
}

.payment-card {
  min-height: 180px; /* same as financial cards */
}
.payment-card .card-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}


</style>



</body>
</html>
