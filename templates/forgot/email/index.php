<?php 
session_start();
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once $_SERVER['DOCUMENT_ROOT'] . '/config.php';

// ============================
// CSRF Token
// ============================
$csrf_token = function_exists('random_bytes') ? bin2hex(random_bytes(16)) : md5(uniqid(mt_rand(), true));

// ============================
// Detect user IP, Country, Device
// ============================
$userCountry = get_user_country();
$ip = get_user_ip();
$device = get_device_info();
$countryName = htmlspecialchars($userCountry['country_name'] ?? 'Unknown', ENT_QUOTES, 'UTF-8');
$countryCode = htmlspecialchars($userCountry['country_code'] ?? 'US', ENT_QUOTES, 'UTF-8');

// ============================
// Country Dialing Codes
// ============================
$countryCodeMapping = [
    'AF'=>'+93 Afghanistan','AL'=>'+355 Albania','DZ'=>'+213 Algeria','AS'=>'+1 American Samoa',
    'AD'=>'+376 Andorra','AO'=>'+244 Angola','AI'=>'+1 Anguilla','AG'=>'+1 Antigua & Barbuda',
    'AR'=>'+54 Argentina','AM'=>'+374 Armenia','AW'=>'+297 Aruba','AU'=>'+61 Australia',
    'AT'=>'+43 Austria','AZ'=>'+994 Azerbaijan','BS'=>'+1 Bahamas','BH'=>'+973 Bahrain',
    'BD'=>'+880 Bangladesh','BB'=>'+1 Barbados','BY'=>'+375 Belarus','BE'=>'+32 Belgium',
    'BZ'=>'+501 Belize','BJ'=>'+229 Benin','BM'=>'+1 Bermuda','BT'=>'+975 Bhutan',
    'BO'=>'+591 Bolivia','BA'=>'+387 Bosnia & Herzegovina','BW'=>'+267 Botswana','BR'=>'+55 Brazil',
    'BN'=>'+673 Brunei','BG'=>'+359 Bulgaria','BF'=>'+226 Burkina Faso','BI'=>'+257 Burundi',
    'KH'=>'+855 Cambodia','CM'=>'+237 Cameroon','CA'=>'+1 Canada','CV'=>'+238 Cape Verde',
    'CF'=>'+236 Central African Republic','TD'=>'+235 Chad','CL'=>'+56 Chile','CN'=>'+86 China',
    'CO'=>'+57 Colombia','KM'=>'+269 Comoros','CG'=>'+242 Congo','CR'=>'+506 Costa Rica',
    'HR'=>'+385 Croatia','CU'=>'+53 Cuba','CY'=>'+357 Cyprus','CZ'=>'+420 Czech Republic',
    'DK'=>'+45 Denmark','DJ'=>'+253 Djibouti','DM'=>'+1 Dominica','DO'=>'+1 Dominican Republic',
    'EC'=>'+593 Ecuador','EG'=>'+20 Egypt','SV'=>'+503 El Salvador','GQ'=>'+240 Equatorial Guinea',
    'ER'=>'+291 Eritrea','EE'=>'+372 Estonia','ET'=>'+251 Ethiopia','FJ'=>'+679 Fiji',
    'FI'=>'+358 Finland','FR'=>'+33 France','GA'=>'+241 Gabon','GM'=>'+220 Gambia',
    'GE'=>'+995 Georgia','DE'=>'+49 Germany','GH'=>'+233 Ghana','GR'=>'+30 Greece',
    'GL'=>'+299 Greenland','GD'=>'+1 Grenada','GT'=>'+502 Guatemala','GN'=>'+224 Guinea',
    'GW'=>'+245 Guinea-Bissau','GY'=>'+592 Guyana','HT'=>'+509 Haiti','HN'=>'+504 Honduras',
    'HK'=>'+852 Hong Kong','HU'=>'+36 Hungary','IS'=>'+354 Iceland','IN'=>'+91 India',
    'ID'=>'+62 Indonesia','IR'=>'+98 Iran','IQ'=>'+964 Iraq','IE'=>'+353 Ireland',
    'IL'=>'+972 Israel','IT'=>'+39 Italy','JM'=>'+1 Jamaica','JP'=>'+81 Japan',
    'JO'=>'+962 Jordan','KZ'=>'+7 Kazakhstan','KE'=>'+254 Kenya','KR'=>'+82 South Korea',
    'KW'=>'+965 Kuwait','KG'=>'+996 Kyrgyzstan','LA'=>'+856 Laos','LV'=>'+371 Latvia',
    'LB'=>'+961 Lebanon','LS'=>'+266 Lesotho','LR'=>'+231 Liberia','LY'=>'+218 Libya',
    'LT'=>'+370 Lithuania','LU'=>'+352 Luxembourg','MY'=>'+60 Malaysia','MV'=>'+960 Maldives',
    'MT'=>'+356 Malta','NP'=>'+977 Nepal','NL'=>'+31 Netherlands','NZ'=>'+64 New Zealand',
    'NG'=>'+234 Nigeria','NO'=>'+47 Norway','PK'=>'+92 Pakistan','PH'=>'+63 Philippines',
    'PL'=>'+48 Poland','PT'=>'+351 Portugal','QA'=>'+974 Qatar','RO'=>'+40 Romania',
    'RU'=>'+7 Russia','SA'=>'+966 Saudi Arabia','SG'=>'+65 Singapore','ZA'=>'+27 South Africa',
    'ES'=>'+34 Spain','LK'=>'+94 Sri Lanka','SE'=>'+46 Sweden','CH'=>'+41 Switzerland',
    'TH'=>'+66 Thailand','TR'=>'+90 Turkey','UA'=>'+380 Ukraine','AE'=>'+971 United Arab Emirates',
    'GB'=>'+44 United Kingdom','US'=>'+1 United States','VN'=>'+84 Vietnam','ZM'=>'+260 Zambia'
];

$selectedCode = '+1';
if(isset($countryCodeMapping[$countryCode])){
    $selectedCode = explode(' ', $countryCodeMapping[$countryCode])[0];
}

// Flags
$countryFlag = [];
foreach($countryCodeMapping as $code => $val) $countryFlag[$code] = strtolower($code);
$defaultFlag = $countryFlag[$countryCode] ?? 'us';
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Forgot Login - Shopnoltd Toolbox</title>
<style>
body { font-family: Arial, sans-serif; background:#f4f6f9; margin:0; padding:0; }
.container{ max-width:420px; margin:60px auto; padding:25px; border:1px solid #ddd; border-radius:10px; background:#fff; box-shadow:0 0 8px rgba(0,0,0,0.1);}
.registration--logo{text-align:center;margin-bottom:25px;}
.registration--logo img{max-height:60px;}
.registration-form label{display:block;margin-bottom:6px;font-weight:bold;}
.registration-form input, .registration-form select{
  width:100%;padding:10px;margin-bottom:15px;
  border:1px solid #ccc;border-radius:5px;font-size:15px;
}
.pw-wrap{position:relative;}
.actions button{
  width:100%;padding:12px;background:#0066ff;color:#fff;
  border:none;border-radius:5px;font-size:15px;cursor:pointer;
  transition:background 0.2s;
}
.actions button:hover{background:#004ecc;}
.small-link{text-align:center;margin-top:8px;font-size:14px;}
.small-link a{color:#0073e6;text-decoration:none;}
.small-link a:hover{text-decoration:underline;}
#selectedFlag {margin-top:5px;}
</style>
</head>
<body>
<div class="container">
  <div class="registration--logo">
    <a href="<?= BASE_URL ?>"><img src="/static/kobologo.svg" alt="Shopnoltd Toolbox Logo"></a>
  </div>

  <form action="forgot_login_process.php" method="post" class="registration-form" autocomplete="off" id="forgotForm">
    <input type="hidden" name="csrfmiddlewaretoken" value="<?= $csrf_token ?>">

    <h2>Forgot Email</h2>
    <p>Please enter your registered email. We’ll send your Email ID via browser after OTP verification.</p>

    <label>Username *</label>
    <input type="text" name="username" required>

    <label>Country Code *</label>
    <select name="phone_code" id="countrySelect" required>
      <?php foreach($countryCodeMapping as $code => $display): 
        $numericCode = explode(' ', $display)[0];
        $selected = ($numericCode === $selectedCode) ? 'selected' : '';
      ?>
      <option value="<?= htmlspecialchars($numericCode, ENT_QUOTES, 'UTF-8') ?>" 
              data-flag="https://flagcdn.com/24x18/<?= $countryFlag[$code] ?>.png"
              <?= $selected ?>>
        <?= htmlspecialchars($display, ENT_QUOTES, 'UTF-8') ?>
      </option>
      <?php endforeach; ?>
    </select>
    <img id="selectedFlag" src="https://flagcdn.com/24x18/<?= $defaultFlag ?>.png">

    <label>Phone Number *</label>
    <input type="tel" name="phone" id="phoneInput" required 
           placeholder="Enter phone number" 
           oninput="this.value=this.value.replace(/[^0-9]/g,'')">

    <div class="actions">
      <button type="submit">Get OTP via Browser</button>
    </div>

    <div class="small-link"><a href="/forgot/username/index.php">Forgot Username?</a></div>
    <div class="small-link"><a href="/forgot/email/index.php">Forgot Email?</a></div>
    <div class="small-link"><a href="/forgot/phone_code/index.php">Forgot Country Code?</a></div>
    <div class="small-link"><a href="/forgot/phone/index.php">Forgot Phone Number?</a></div>
    <div class="small-link"><a href="/forgot/password/index.php">Forgot Password?</a></div>
    <div class="small-link"><a href="/accounts/register/index.php">New user? Register your account</a></div>
  </form>
</div>

<script>
const form = document.getElementById('forgotForm');
const phoneInput = document.getElementById('phoneInput');
const countrySelect = document.getElementById('countrySelect');
const flagImg = document.getElementById('selectedFlag');

// Update flag image on country change
function updateFlag() {
  const option = countrySelect.selectedOptions[0];
  if(option) flagImg.src = option.getAttribute('data-flag');
}

// Dynamic validation per country
function updatePhoneValidation() {
  const code = countrySelect.value;
  let placeholder = 'Enter phone number';
  let maxLen = 15, pattern = '\\d{5,15}';

  if (code === '+880' || code === '+91' || code === '+1') {
    maxLen = 10; pattern = '\\d{10}';
    placeholder = (code === '+880') ? 'e.g. 1912345678 (BD)' :
                 (code === '+91') ? 'e.g. 9812345678 (IN)' :
                 'e.g. 5551234567 (US/CA)';
  }
  phoneInput.maxLength = maxLen;
  phoneInput.pattern = pattern;
  phoneInput.placeholder = placeholder;
}

countrySelect.addEventListener('change', () => {
  updatePhoneValidation();
  updateFlag();
});
updatePhoneValidation();
updateFlag();

// Combine full phone before submitting
form.addEventListener('submit', e => {
  const code = countrySelect.value;
  const phone = phoneInput.value.trim();
  if (!phone.match(new RegExp(phoneInput.pattern))) {
    e.preventDefault();
    alert('Invalid phone number format for selected country.');
    phoneInput.focus();
    return;
  }
  const existing = form.querySelector('input[name="fullphone"]');
  if(existing) existing.remove();
  form.insertAdjacentHTML('beforeend', `<input type="hidden" name="fullphone" value="${code}${phone}">`);
});
</script>
</body>
</html>
