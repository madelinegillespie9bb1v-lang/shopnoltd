-- =========================================
-- SAFE PATCH FOR EXISTING SHOPNOLTD DATABASE
-- =========================================

-- ✅ USERS TABLE
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  username VARCHAR(100) UNIQUE,
  email VARCHAR(255) UNIQUE,
  phone_code VARCHAR(10),
  phone VARCHAR(50),
  password VARCHAR(255),
  otp VARCHAR(10) DEFAULT NULL,
  otp_time DATETIME DEFAULT NULL,
  language VARCHAR(20) DEFAULT 'English',
  status VARCHAR(20) DEFAULT 'pending',
  balance DECIMAL(15,5) DEFAULT 0.00000,
  balance_frozen DECIMAL(15,5) DEFAULT 0.00000,
  balance_fine DECIMAL(15,5) DEFAULT 0.00000,
  user_role VARCHAR(20) DEFAULT 'user',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Add missing columns
ALTER TABLE users ADD COLUMN IF NOT EXISTS balance_frozen DECIMAL(15,5) DEFAULT 0.00000;
ALTER TABLE users ADD COLUMN IF NOT EXISTS balance_fine DECIMAL(15,5) DEFAULT 0.00000;
ALTER TABLE users ADD COLUMN IF NOT EXISTS user_role VARCHAR(20) DEFAULT 'user';
ALTER TABLE users ADD COLUMN IF NOT EXISTS otp VARCHAR(10) DEFAULT NULL;
ALTER TABLE users ADD COLUMN IF NOT EXISTS otp_time DATETIME DEFAULT NULL;

-- ✅ SETTINGS TABLE
CREATE TABLE IF NOT EXISTS settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  setting_key VARCHAR(100) UNIQUE,
  setting_value VARCHAR(255)
);

INSERT INTO settings (setting_key, setting_value)
VALUES
('worker_rate','60'), ('referrer_rate','10'), ('admin_rate','30')
ON DUPLICATE KEY UPDATE setting_value=setting_value;

-- ✅ TASKS TABLE
CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  title VARCHAR(255),
  task_type VARCHAR(100),
  pay_rate DECIMAL(10,5) DEFAULT 0.00000,
  quantity INT DEFAULT 0,
  remaining INT DEFAULT 0,
  worker_rate DECIMAL(5,2) DEFAULT NULL,
  referrer_rate DECIMAL(5,2) DEFAULT NULL,
  admin_rate DECIMAL(5,2) DEFAULT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ✅ JOB WORK TABLE
CREATE TABLE IF NOT EXISTS job_work (
  id INT AUTO_INCREMENT PRIMARY KEY,
  task_id INT,
  worker_id INT,
  proof TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ✅ TRANSACTIONS TABLE
CREATE TABLE IF NOT EXISTS transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  type VARCHAR(50),
  amount DECIMAL(15,5),
  note VARCHAR(255),
  status VARCHAR(50),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ✅ REFERRALS TABLE
CREATE TABLE IF NOT EXISTS referrals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  referred_id INT,
  commission DECIMAL(15,5) DEFAULT 0.00000,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ✅ NEWS TABLE
CREATE TABLE IF NOT EXISTS news (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  message TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ✅ CONTRACTS TABLE
CREATE TABLE IF NOT EXISTS contracts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  task_id INT,
  contract_text TEXT,
  signed_date DATETIME DEFAULT NULL
);

-- ✅ SAMPLE ADMIN (safe insert)
INSERT INTO users (first_name,last_name,username,email,password,status,user_role,balance)
SELECT 'Admin','User','admin','admin@example.com',
'$2y$10$K1Y9sCqv9G/QJmV6u7ZrVu1kQbSCB8y0m1C5qUq9jYwqfZyI8O1aG',
'active','admin',0.00
WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='admin');
