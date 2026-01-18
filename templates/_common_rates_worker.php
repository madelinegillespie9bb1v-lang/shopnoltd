<?php
// ---------------------------------------------------------
// _common_rates_worker.php
// ---------------------------------------------------------
// This file is for job workers (users who perform tasks).
// It imports the main _common_rates.php file and provides
// helper functions to get worker/admin/referral portions.
// ---------------------------------------------------------

require_once $_SERVER['DOCUMENT_ROOT'] . '/_common_rates.php';

// ✅ Function: Get the worker’s earning rate per task
function getWorkerRate($platform, $taskType) {
    $baseRate = getTaskRate($platform, $taskType);
    $split = calculateSplit($baseRate);
    return $split['worker']; // Only worker portion
}

// ✅ Function: Get admin commission (for logging or deduction)
function getAdminRate($platform, $taskType) {
    $baseRate = getTaskRate($platform, $taskType);
    $split = calculateSplit($baseRate);
    return $split['admin'];
}

// ✅ Function: Get referral bonus (if referral system used)
function getReferralRate($platform, $taskType) {
    $baseRate = getTaskRate($platform, $taskType);
    $split = calculateSplit($baseRate);
    return $split['referral'];
}

// ✅ Alias for backward compatibility (some files use getReferrerRate)
if (!function_exists('getReferrerRate')) {
    function getReferrerRate($platform, $taskType) {
        return getReferralRate($platform, $taskType);
    }
}

// ✅ Function: Get all rate details together (optional helper)
function getRateDetails($platform, $taskType) {
    $baseRate = getTaskRate($platform, $taskType);
    $split = calculateSplit($baseRate);

    return [
        'base_rate'     => $baseRate,
        'worker_rate'   => $split['worker'],
        'admin_rate'    => $split['admin'],
        'referral_rate' => $split['referral'],
        'total'         => $baseRate,
    ];
}
?>
