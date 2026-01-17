<?php
session_start();
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once $_SERVER['DOCUMENT_ROOT'] . '/config.php';

// Only show if OTP verified
if (!isset($_SESSION['verified_user'])) {
    echo "<script>alert('Access denied! Please verify OTP first.');window.location.href='index.php';</script>";
    exit;
}

$user = $_SESSION['verified_user'];

$phone_code = $user['phone_code'] ?? '+880';
$phone = $user['phone'] ?? 'N/A';
$email = $user['email'] ?? 'N/A';

// Map phone_code → country_name
$phone_country_map = [
    '+880' => 'Bangladesh',
    '+44'  => 'United Kingdom',
    '+1'   => 'United States',
    '+213' => 'Algeria',
    '+376' => 'Andorra',
    '+244' => 'Angola',
    '+1264'=> 'Anguilla',
    '+1268'=> 'Antigua & Barbuda',
    '+54'  => 'Argentina',
    '+374' => 'Armenia',
    '+297' => 'Aruba',
    '+61'  => 'Australia',
    '+43'  => 'Austria',
    '+994' => 'Azerbaijan',
    '+1242'=> 'Bahamas',
    '+973' => 'Bahrain',
    '+1246'=> 'Barbados',
    '+375' => 'Belarus',
    '+32'  => 'Belgium',
    '+501' => 'Belize',
    '+229' => 'Benin',
    '+1441'=> 'Bermuda',
    '+975' => 'Bhutan',
    '+591' => 'Bolivia',
    '+387' => 'Bosnia Herzegovina',
    '+267' => 'Botswana',
    '+55'  => 'Brazil',
    '+673' => 'Brunei',
    '+359' => 'Bulgaria',
    '+226' => 'Burkina Faso',
    '+257' => 'Burundi',
    '+855' => 'Cambodia',
    '+237' => 'Cameroon',
    '+1'   => 'Canada',
    '+238' => 'Cape Verde Islands',
    '+1345'=> 'Cayman Islands',
    '+236' => 'Central African Republic',
    '+56'  => 'Chile',
    '+86'  => 'China',
    '+57'  => 'Colombia',
    '+269' => 'Comoros',
    '+242' => 'Congo',
    '+506' => 'Costa Rica',
    '+385' => 'Croatia',
    '+53'  => 'Cuba',
    '+357' => 'Cyprus',
    '+420' => 'Czech Republic',
    '+45'  => 'Denmark',
    '+253' => 'Djibouti',
    '+593' => 'Ecuador',
    '+20'  => 'Egypt',
    '+503' => 'El Salvador',
    '+240' => 'Equatorial Guinea',
    '+291' => 'Eritrea',
    '+372' => 'Estonia',
    '+251' => 'Ethiopia',
    '+679' => 'Fiji',
    '+358' => 'Finland',
    '+33'  => 'France',
    '+241' => 'Gabon',
    '+220' => 'Gambia',
    '+995' => 'Georgia',
    '+49'  => 'Germany',
    '+233' => 'Ghana',
    '+30'  => 'Greece',
    '+299' => 'Greenland',
    '+1473'=> 'Grenada',
    '+502' => 'Guatemala',
    '+224' => 'Guinea',
    '+245' => 'Guinea-Bissau',
    '+592' => 'Guyana',
    '+509' => 'Haiti',
    '+504' => 'Honduras',
    '+852' => 'Hong Kong',
    '+36'  => 'Hungary',
    '+354' => 'Iceland',
    '+91'  => 'India',
    '+62'  => 'Indonesia',
    '+98'  => 'Iran',
    '+964' => 'Iraq',
    '+353' => 'Ireland',
    '+972' => 'Israel',
    '+39'  => 'Italy',
    '+81'  => 'Japan',
    '+7'   => 'Kazakhstan/Russia',
    '+254' => 'Kenya',
    '+82'  => 'Korea South',
    '+965' => 'Kuwait',
    '+996' => 'Kyrgyzstan',
    '+371' => 'Latvia',
    '+961' => 'Lebanon',
    '+266' => 'Lesotho',
    '+231' => 'Liberia',
    '+218' => 'Libya',
    '+370' => 'Lithuania',
    '+352' => 'Luxembourg',
    '+60'  => 'Malaysia',
    '+960' => 'Maldives',
    '+356' => 'Malta',
    '+977' => 'Nepal',
    '+31'  => 'Netherlands',
    '+64'  => 'New Zealand',
    '+234' => 'Nigeria',
    '+47'  => 'Norway',
    '+92'  => 'Pakistan',
    '+63'  => 'Philippines',
    '+48'  => 'Poland',
    '+351' => 'Portugal',
    '+974' => 'Qatar',
    '+40'  => 'Romania',
    '+7'   => 'Russia',
    '+966' => 'Saudi Arabia',
    '+65'  => 'Singapore',
    '+27'  => 'South Africa',
    '+34'  => 'Spain',
    '+94'  => 'Sri Lanka',
    '+46'  => 'Sweden',
    '+41'  => 'Switzerland',
    '+66'  => 'Thailand',
    '+90'  => 'Turkey',
    '+380' => 'Ukraine',
    '+971' => 'United Arab Emirates',
    '+84'  => 'Vietnam',
    '+260' => 'Zambia',
    '+263' => 'Zimbabwe'
];

$phone_country = $phone_country_map[$phone_code] ?? 'Unknown';

// Map phone_code → flag ISO (two-letter) for flagcdn
$phone_flag_map = [
    '+880' => 'bd',
    '+44'  => 'gb',
    '+1'   => 'us',
    '+213' => 'dz',
    '+376' => 'ad',
    '+244' => 'ao',
    '+1264'=> 'ai',
    '+1268'=> 'ag',
    '+54'  => 'ar',
    '+374' => 'am',
    '+297' => 'aw',
    '+61'  => 'au',
    '+43'  => 'at',
    '+994' => 'az',
    '+1242'=> 'bs',
    '+973' => 'bh',
    '+1246'=> 'bb',
    '+375' => 'by',
    '+32'  => 'be',
    '+501' => 'bz',
    '+229' => 'bj',
    '+1441'=> 'bm',
    '+975' => 'bt',
    '+591' => 'bo',
    '+387' => 'ba',
    '+267' => 'bw',
    '+55'  => 'br',
    '+673' => 'bn',
    '+359' => 'bg',
    '+226' => 'bf',
    '+257' => 'bi',
    '+855' => 'kh',
    '+237' => 'cm',
    '+1'   => 'ca',
    '+238' => 'cv',
    '+56'  => 'cl',
    '+86'  => 'cn',
    '+57'  => 'co',
    '+269' => 'km',
    '+242' => 'cg',
    '+506' => 'cr',
    '+385' => 'hr',
    '+53'  => 'cu',
    '+357' => 'cy',
    '+420' => 'cz',
    '+45'  => 'dk',
    '+253' => 'dj',
    '+593' => 'ec',
    '+20'  => 'eg',
    '+503' => 'sv',
    '+240' => 'gq',
    '+291' => 'er',
    '+372' => 'ee',
    '+251' => 'et',
    '+679' => 'fj',
    '+358' => 'fi',
    '+33'  => 'fr',
    '+241' => 'ga',
    '+220' => 'gm',
    '+995' => 'ge',
    '+49'  => 'de',
    '+233' => 'gh',
    '+30'  => 'gr',
    '+299' => 'gl',
    '+1473'=> 'gd',
    '+502' => 'gt',
    '+224' => 'gn',
    '+245' => 'gw',
    '+592' => 'gy',
    '+509' => 'ht',
    '+504' => 'hn',
    '+852' => 'hk',
    '+36'  => 'hu',
    '+354' => 'is',
    '+91'  => 'in',
    '+62'  => 'id',
    '+98'  => 'ir',
    '+964' => 'iq',
    '+353' => 'ie',
    '+972' => 'il',
    '+39'  => 'it',
    '+81'  => 'jp',
    '+7'   => 'kz',
    '+254' => 'ke',
    '+82'  => 'kr',
    '+965' => 'kw',
    '+996' => 'kg',
    '+371' => 'lv',
    '+961' => 'lb',
    '+266' => 'ls',
    '+231' => 'lr',
    '+218' => 'ly',
    '+370' => 'lt',
    '+352' => 'lu',
    '+60'  => 'my',
    '+960' => 'mv',
    '+356' => 'mt',
    '+977' => 'np',
    '+31'  => 'nl',
    '+64'  => 'nz',
    '+234' => 'ng',
    '+47'  => 'no',
    '+92'  => 'pk',
    '+63'  => 'ph',
    '+48'  => 'pl',
    '+351' => 'pt',
    '+974' => 'qa',
    '+40'  => 'ro',
    '+7'   => 'ru',
    '+966' => 'sa',
    '+65'  => 'sg',
    '+27'  => 'za',
    '+34'  => 'es',
    '+94'  => 'lk',
    '+46'  => 'se',
    '+41'  => 'ch',
    '+66'  => 'th',
    '+90'  => 'tr',
    '+380' => 'ua',
    '+971' => 'ae',
    '+84'  => 'vn',
    '+260' => 'zm',
    '+263' => 'zw'
];

$flag_iso = $phone_flag_map[$phone_code] ?? 'us';
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Recovered Phone Info</title>
<style>
body { font-family: Arial, sans-serif; background: #f5f5f5; padding: 20px; }
.container { max-width: 450px; margin: auto; background: #fff; padding: 25px; border-radius: 10px; text-align: center; box-shadow: 0 2px 6px rgba(0,0,0,0.1); }
.phone-box { background: #e7f7ec; padding: 15px; border-radius: 8px; margin-top: 15px; font-size: 18px; color: #333; font-weight: bold; display: inline-flex; align-items: center; justify-content: center; gap:8px; }
.phone-box img { width: 24px; height: 18px; border-radius:2px; }
button.copy-btn { margin-left: 8px; padding: 5px 10px; font-size: 12px; border: none; background: #007bff; color: #fff; border-radius: 5px; cursor: pointer; }
button.copy-btn:hover { background: #0056b3; }
a.btn-login { display: inline-block; margin-top: 20px; padding: 10px 15px; background: #25D366; color: #fff; text-decoration: none; border-radius: 5px; }
a.btn-login:hover { background: #1da851; }
</style>
</head>
<body>
<div class="container">
    <h2>Phone Recovery 🎉</h2>
    <p>Your phone linked to <strong><?= htmlspecialchars($email); ?></strong> is:</p>

    <div class="phone-box">
        <img src="https://flagcdn.com/24x18/<?= $flag_iso ?>.png" alt="Flag">
        <span id="phoneCodeValue"><?= htmlspecialchars($phone_code) ?></span> - 
        <span id="phoneCountryValue"><?= htmlspecialchars($phone_country) ?></span>
        <button class="copy-btn" id="copyPhoneBtn">Copy</button>
    </div>

    <p style="margin-top:10px; font-size:14px; color:#555;">
        Full phone number: <strong><?= htmlspecialchars($phone_code . $phone) ?></strong>
    </p>

    <a href="<?= BASE_URL ?>/login.php" class="btn-login">Go to Login</a>
</div>

<script>
document.getElementById('copyPhoneBtn').addEventListener('click', function() {
    const text = document.getElementById('phoneCodeValue').innerText + ' - ' + document.getElementById('phoneCountryValue').innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert('✅ Phone code & country copied!');
    }).catch(() => {
        alert('❌ Failed to copy.');
    });
});
</script>
</body>
</html>

<?php
unset($_SESSION['verified_user']);
?>
