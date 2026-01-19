Shopnoltd PHP package
---------------------
Files included:
- db.html           : PDO DB connection (edit credentials)
- config.html       : site config (BASE_URL)
- accounts/        : login & register pages
- payments/        : payment endpoints + callbacks
- sql_setup.sql    : SQL to create users and payments tables

Instructions:
1. Upload the package to your htdocs root.
2. Edit db.html with your MySQL credentials.
3. Run the SQL in sql_setup.sql via phpMyAdmin to create tables.
4. Edit payments/config_payments.html to add your Payeer/Binance keys.
5. Test on HTTPS (required for callbacks). InfinityFree free subdomain must have valid SSL.
