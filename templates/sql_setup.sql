-- SQL to create users and payments tables-- Add columns if not exists (MySQL 8+ style using ALTER TABLE ... ADD COLUMN IF NOT EXISTS is not widely supported,
-- so use safe checks: create columns only if missing.)

-- Add language column
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS language VARCHAR(10) DEFAULT 'en';

-- Add status column
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'active';

-- Add username column
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS username VARCHAR(100) DEFAULT NULL;

-- Add country_code and phone columns
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS country_code VARCHAR(10) DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS phone VARCHAR(30) DEFAULT NULL;


CREATE TABLE IF NOT EXISTS payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  gateway VARCHAR(50),
  amount DECIMAL(10,2),
  currency VARCHAR(10),
  status VARCHAR(20) DEFAULT 'pending',
  txn_id VARCHAR(255),
  meta TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);
