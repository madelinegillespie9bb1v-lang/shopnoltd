const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');  // For hashing passwords

// Create Express app
const app = express();
const PORT = 80;

// Define the base directory for serving files
const BASE_DIR = path.join(__dirname, '.');

// Middleware to serve static files and parse incoming requests
app.use(express.static(BASE_DIR));
app.use(bodyParser.urlencoded({ extended: true }));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Serve the phpMyAdmin directory as a static folder
app.use('/phpmyadmin', express.static(path.join(__dirname, 'phpmyadmin')));

// MySQL Database connection pool
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'if0_37909999_db'
});

// Create table if it doesn't exist
const createTableQuery = `
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullName VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    country VARCHAR(255) NOT NULL,
    sector VARCHAR(255) NOT NULL,
    organizationType VARCHAR(255) NOT NULL,
    updates BOOLEAN DEFAULT 0,
    password VARCHAR(255) NOT NULL
)`;

db.query(createTableQuery, (err) => {
    if (err) {
        console.error('Error creating table:', err.message);
    } else {
        console.log('Users table is ready.');
    }
});

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(BASE_DIR, 'index.html'));
});

// Serve static folders for assets, community, and support
app.use('/assets', express.static(path.join(BASE_DIR, 'assets')));
app.use('/community', express.static(path.join(BASE_DIR, 'community.shopnoltd.kesug.com')));
app.use('/support', express.static(path.join(BASE_DIR, 'support.shopnoltd.kesug.com')));

// Route for downloading files
app.get('/download/:filename', (req, res) => {
    const fileName = req.params.filename;
    const filePath = path.join(BASE_DIR, fileName);
    res.download(filePath, (err) => {
        if (err) {
            res.status(404).send('File not found.');
        }
    });
});

// Route to serve the signup form
app.get('/signup', (req, res) => {
    res.render('signup');
});

// Middleware for handling JSON and URL-encoded data
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Route to handle form submission
// Signup Route
app.post('/signup', (req, res) => {
    const { fullName, username, email, country, sector, organizationType, updates, password, confirmPassword, terms } = req.body;

    // Validation
    if (!fullName || !username || !email || !country || !sector || !organizationType || !terms || !password || !confirmPassword) {
        return res.status(400).send('All fields marked with * are required.');
    }

    if (password !== confirmPassword) {
        return res.status(400).send('Passwords do not match.');
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).send('Error hashing password.');
        }

        // Insert into the database
        const insertQuery = `
            INSERT INTO users (
                fullName, username, email, country, sector, organizationType, updates, password
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            fullName,
            username,
            email,
            country,
            sector,
            organizationType,
            updates === 'on',
            hashedPassword
        ];

        db.query(insertQuery, values, (err) => {
            if (err) {
                console.error('Error inserting data:', err.message);
                return res.status(500).send('Error saving data.');
            }

            res.redirect('/login');
        });
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], (err, results) => {
        if (err) return res.status(500).send('Server error.');
        if (results.length === 0) return res.status(401).send('Invalid username or password.');

        const user = results[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.status(500).send('Error verifying password.');
            if (!isMatch) return res.status(401).send('Invalid username or password.');

            // Redirect to dashboard on successful login
            res.redirect('/dashboard');
        });
    });
});


const nodemailer = require('nodemailer');

// Route to serve reset password form
app.get('/reset-password/:id', (req, res) => {
    const userId = req.params.id;

    // Render the reset password page
    res.render('reset-password', { userId });
});

// Route to handle reset password submission
app.post('/reset-password/:id', (req, res) => {
    const userId = req.params.id;
    const { password, confirmPassword } = req.body;

    // Ensure password and confirm password match
    if (password !== confirmPassword) {
        return res.status(400).send('Passwords do not match.');
    }

    // Hash the new password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).send('Error hashing password.');
        }

        // Update password in the database for the user
        const updateQuery = 'UPDATE users SET password = ? WHERE id = ?';
        const values = [hashedPassword, userId];

        db.query(updateQuery, values, (err) => {
            if (err) {
                console.error('Error updating password:', err.message);
                return res.status(500).send('Error updating password.');
            }

            // Redirect the user to the login page after updating the password
            res.redirect('https://shopnoltd.kesug.com//accounts/login');
        });
    });
});



// Static files serve
app.use(express.static(path.join(__dirname)));

// Dynamic route for /reset-password
app.get('/reset-password', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password</title>
</head>
<body>
    <h1>Reset Password</h1>
    <form action="/reset-password/<%= userId %>" method="post">
        <div>
            <label for="password">New Password:</label>
            <input type="password" name="password" id="password" required>
        </div>
        <div>
            <label for="confirmPassword">Confirm New Password:</label>
            <input type="password" name="confirmPassword" id="confirmPassword" required>
        </div>
        <button type="submit">Reset Password</button>
    </form>
</body>
</html>
    `);  // <-- Make sure this closing backtick is also present here
});

// Dynamic route for /sign-up
app.get('/sign-up', (req, res) => {
    res.send(`



<!DOCTYPE html>
<html lang="en-US">

<head>
    
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <meta http-equiv="Content-Security-Policy" content="
        default-src 'self';
        img-src 'self' https://static.fundraiseup.com *.hsforms.com https://www.google-analytics.com https://ucarecdn.com
        *.paypal.com data: https://www.paypalobjects.com https://www.gstatic.com *.guidestar.org;
        script-src 'self' 'unsafe-inline' http://js.hsforms.net *.fundraiseup.com *.googletagmanager.com https://www.google-analytics.com
        https://ssl.google-analytics.com https://js.stripe.com https://www.paypal.com https://pay.google.com;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com;
        font-src 'self' https://fonts.gstatic.com https://static.fundraiseup.com;
        connect-src 'self' https://fndrsp.net https://forms.hsforms.com https://api.fundraiseup.com https://js.stripe.com
        https://www.google-analytics.com https://fndrsp-checkout.net https://sentry.fundraiseup.com https://www.paypal.com
        https://hubspot-forms-static-embed.s3.amazonaws.com https://google.com https://pay.google.com ws:;
        frame-src 'self' https://js.stripe.com https://forms.hsforms.com https://www.paypal.com https://pay.google.com/ *.youtube.com;
    ">

    
    <title>Sign up | shopnotoolbox</title>
    <meta name="description" content="shopnotoolbox is an intuitive, powerful, and reliable software used to collect, analyze, and manage data for surveys, monitoring, evaluation, and research."/>
    <base href="https://shopnoltd.kesug.com"/>
    <link rel="home" href="https://shopnoltd.kesug.com"/>

    
    <meta name="robots" content="index,follow,noodp"/>
    <meta name="googlebot" content="index,follow"/>

    
    <meta property="og:locale" content="en_US"/>
    <meta property="og:site_name" content="shopnotoolbox"/>
    <meta property="og:title" content="Sign up"/>
    <meta property="og:description" content="shopnotoolbox is an intuitive, powerful, and reliable software used to collect, analyze, and manage data for surveys, monitoring, evaluation, and research."/>
    <meta property="og:url" content="https://shopnoltd.kesug.com/sign-up/"/>
    <meta name="twitter:site" content="@shopnotoolbox"/>
    <meta name="twitter:description" content="shopnotoolbox is an intuitive, powerful, and reliable software used to collect, analyze, and manage data for surveys, monitoring, evaluation, and research."/>

    
    
    
        <meta property="og:type" content="website"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content="shopnotoolbox"/>
        <meta name="twitter:image" content="https://shopnoltd.kesug.com/assets/images/common/shopnotoolbox_opengraph_image.png"/>
    

    
    <link href="https://shopnoltd.kesug.com/assets/styles/kobo.css?2024-12-05_18-51-37" rel="stylesheet" media="all"/>
    <link rel="icon" href="https://shopnoltd.kesug.com/favicon.png?2024-12-05_18-51-37"/>



    
    <script>
    (function(w,d,s,n,a){if(!w[n]){var l='call,catch,on,once,set,then,track'
    .split(','),i,o=function(n){return'function'==typeof n?o.l.push([arguments])&&o
    :function(){return o.l.push([n,arguments])&&o}},t=d.getElementsByTagName(s)[0],
    j=d.createElement(s);j.async=!0;j.src='https://cdn.fundraiseup.com/widget/'+a;
    t.parentNode.insertBefore(j,t);o.s=Date.now();o.v=4;o.h=w.location.href;o.l=[];
    for(i=0;i<7;i++)o[l[i]]=o(l[i]);w[n]=o}
    })(window,document,'script','FundraiseUp','ASAUFVGL');</script>
</head>


<body class="root">


<header class="root__header">
  <div class="root__row">
    <div class="root__row-content root__row-content--wide">
      <nav class="header-nav">
  <a class="header-nav__logo" href="/">
    <img src="/assets/images/common/shopnotoolbox_logo_default_for-light-bg.svg"/>
  </a>
  <a class="header-nav__mobile-logo" href="/">
    <img src="/assets/images/site/shopnotoolbox-logo-mobile.svg"/>
  </a>

  
  <input type="checkbox" id="mobile-nav-trigger">
  <label class="header-nav__mobile-nav-trigger" for="mobile-nav-trigger">
    <i></i><i></i><i></i><i></i>
  </label>

  <ul class="header-nav__menu">
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/about-us"
          >About us</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/features"
          >Features</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/services"
          >Services</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/pricing"
          >Pricing</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/blog"
          >Blog</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/help"
          >Help</a
        >
      </li>
    
  </ul>

  <ul class="header-nav__buttons">
    
    
    <li>
<a class="button button--size-m button--type-frame button--color-blue" href="/sign-up">Sign up</a>
</li>
    <li>
<a class="button button--size-m button--type-full button--color-blue" href="/donate">Donate</a>
</li>
  </ul>
</nav>

    </div>
  </div>
</header>


<div class="modal" data-modal>
  <div class="modal__box">
    <button class="modal__closer" data-modal-closer>&times;</button>
    <div class="modal__content" data-modal-content>Hello, World!</div>
  </div>
</div>


<main class="root__main" role="main"> 
<div class="root__row">
  <div class="root__row-content">
    <section class="sign-up-options">
      <h1>Sign in or create an account</h1>
      <div class="sign-up-options__servers">
        <div class="sign-up-options__server">
          <div>
            <div
              class="server-options__icon-box server-options__icon-box--global"
            >
              <svg class="server-options__icon">
                <use xlink:href="/assets/images/site/sprite.svg#globe" />
              </svg>
            </div>
            <h2 class="sign-up-options__server-header">
              Global shopnotoolbox Server
            </h2>
            <p>
              Most people use our global shopnotoolbox server. Get started with a
              free account today.
            </p>
          </div>
          <div class="sign-up-options__buttons">
            
<a class="button button--size-l button--type-full button--color-blue" href="/accounts/register">Create an account</a>
 
<a class="button button--size-l button--type-frame button--color-blue" href="/accounts/login">Sign in</a>

          </div>
        </div>
        <div class="sign-up-options__server">
          <div>
            <div class="server-options__icon-box server-options__icon-box--eu">
              <img
                class="server-options__icon"
                src="/assets/images/sign-up/eu-icon.png"
              />
            </div>
            <h2 class="sign-up-options__server-header">
              European Union shopnotoolbox Server
            </h2>
            <p>
              The European Union-based server is hosted in Ireland. This server
              is used by organizations that require or prefer data hosting in
              the European Union. Get started with a free account today.
            </p>
          </div>
          <div class="sign-up-options__buttons">
            
<a class="button button--size-l button--type-full button--color-blue" href="/accounts/signup/">Create an account</a>
 
<a class="button button--size-l button--type-frame button--color-blue" href="/accounts/login/">Sign in</a>

          </div>
        </div>
      </div>
    </section>
  </div>
</div>
<div
  class="root__row root__row--light-blue">
  <div
    class="root__row-content">
    <section
      class="private-servers-plug">
      <div
        class="private-servers-plug__cta">
        <h3
          class="private-servers-plug__cta-header">Private shopnotoolbox Servers</h3>
        <p>Our team has extensive experience setting up and maintaining private shopnotoolbox servers for organizations with advanced and high volume data collection needs.</p>
        <div
          class="private-servers-plug__buttons">
          
<a class="button button--size-l button--type-full button--color-blue" href="/contact/">Get in touch</a>

          
<a class="button button--size-l button--type-frame button--color-blue" href="/services/private-servers/">Learn more</a>

        </div>
      </div>
      <div
        class="private-servers-plug__orgs">
        <h2 class="private-servers-plug__orgs-header">ORGANIZATIONS USING OUR PRIVATE SERVERS</h2>
        <div
          class="private-servers-plug__org-icons">
          <load-file
            replaceWith
            src="/assets/images/partners/unhcr.svg"></load-file>
          <load-file
            replaceWith
            src="/assets/images/partners/unocha.svg"></load-file>
          <load-file
            replaceWith
            src="/assets/images/partners/iom.svg"></load-file>
          <load-file
            replaceWith
            src="/assets/images/partners/msf.svg"></load-file>
          <load-file
            replaceWith
            src="/assets/images/partners/ifrc.svg"></load-file>
          <load-file
            replaceWith
            src="/assets/images/partners/savethechildren.svg"></load-file>
        </div>
      </div>
    </section>
  </div>
</div>

</main>

<footer class="root__footer">
  <div class="root__row">
    <div class="root__row-content root__row-content--wide">
      <div class="footer-nav__container">
  <nav class="footer-nav">
    <div class="footer-nav__block footer-nav__menu">
      <ul class="footer-nav-menu__row">
        <label>Organization</label>

        
          <li>
            <a href="/about-us/">About us</a>
          </li>
        
          <li>
            <a href="/about-us/meet-the-team/">Team</a>
          </li>
        
          <li>
            <a href="/join-our-team">Jobs</a>
          </li>
        
          <li>
            <a href="/about-us/financials/">Financials</a>
          </li>
        
          <li>
            <a href="/contact/">Contact</a>
          </li>
        
      </ul>

      <ul class="footer-nav-menu__row">
        <label>Software</label>

        
          <li>
            <a href="https://academy.shopnotoolbox.org/collections">Online learning</a>
          </li>
        
          <li>
            <a href="/about-us/software">About shopnotoolbox</a>
          </li>
        
          <li>
            <a href="/features">Features</a>
          </li>
        
          <li>
            <a href="/pricing">Pricing</a>
          </li>
        
          <li>
            <a href="/services/private-servers">Private servers</a>
          </li>
        
          <li>
            <a href="/services">Services</a>
          </li>
        
      </ul>

      <ul class="footer-nav-menu__row">
        <label>Community</label>

        
          <li>
            <a href="https://community.shopnotoolbox.org/">Forum</a>
          </li>
        
          <li>
            <a href="https://support.shopnotoolbox.org/">Documentation</a>
          </li>
        
          <li>
            <a href="/donate">Donate</a>
          </li>
        
      </ul>
    </div>

    <div class="footer-nav__block">
      <section class="footer-nav__newsletter">
        <h3>Stay up<br/>to date.</h3>

        <p>Subscribe to our shopnotoolbox Updates newsletter to be the first to learn about new features, resources, and user impact stories from around the world.</p>

        <section class="newsletter-form-wrapper">
  <script charset="utf-8" type="text/javascript" src="https://js.hsforms.net/forms/shell.js"></script>
  <script>
    hbspt.forms.create({
      region: "na1",
      portalId: "21396257",
      formId: "16b9634b-3ea9-4539-9ec2-b83d4125e24c"
  });
  </script>
</section>
      </section>

      <section class="footer-nav__social">
        <nav>
          
            <li>
              <a href="https://www.facebook.com/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/facebook.svg"></load-file>
              </a>
            </li>
          
            <li>
              <a href="https://twitter.com/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/twitter.svg"></load-file>
              </a>
            </li>
          
            <li>
              <a href="https://www.linkedin.com/company/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/linkedin.svg"></load-file>
              </a>
            </li>
          
            <li>
              <a href="https://github.com/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/github.svg"></load-file>
              </a>
            </li>
          
        </nav>

        <div>
          <a class="footer-nav__logo" href="/">
            <img src="/assets/images/site/shopnotoolbox-logo-borderless.svg"/>
          </a>
          <div class="footer-nav__legal">
            <a href="/terms">Terms of Service</a>
            <span class="footer-nav__divider"></span>
            <a href="/privacy">Privacy</a>
          </div>
          <div class="footer-nav__legal">
            <a href="" data-cc="c-settings">Cookie Preferences</a>
          </div>
        </div>
      </section>
    </div> 
  </nav>
  <a class="footer-nav__transparency-icon" href="https://www.guidestar.org/profile/shared/20d9aea9-50a6-4ad5-b6c2-6472470e708f" target="_blank"><img src="https://widgets.guidestar.org/TransparencySeal/9868102" /></a>
  <div class="footer-nav__copyright">Website content is licensed under a <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank">CC-BY-NC license</a>, unless noted otherwise.</div>
</div>
    </div>
  </div>
</footer>


    <script async src="https://shopnoltd.kesug.com/assets/scripts/kobo.js?2024-12-05_18-51-37"></script>
    
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-26003863-1"></script>
    <script type="text/plain" data-cookiecategory="analytics">
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-26003863-1');
    </script>
</body>
</html>


    `);  // <-- Make sure this closing backtick is present here
});






// Serve static files from current directory
app.use(express.static(__dirname));

// Dynamic route for /accounts/register
app.get('/accounts/register', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Signup - My Application</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="registration-form">
        <h2>Create Your Account</h2>
        <form action="/signup" method="POST">
            <div class="form-group">
                <label for="fullName">Full Name*</label>
                <input type="text" id="fullName" name="fullName" required>
            </div>
            <div class="form-group">
                <label for="username">Username*</label>
                <input type="text" id="username" name="username" required>
            </div>
            <div class="form-group">
                <label for="email">Email*</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="country">Country*</label>
                <input type="text" id="country" name="country" required>
            </div>
            <div class="form-group">
                <label for="sector">Sector*</label>
                <input type="text" id="sector" name="sector" required>
            </div>
            <div class="form-group">
                <label for="organizationType">Organization Type*</label>
                <input type="text" id="organizationType" name="organizationType" required>
            </div>
            <div class="form-group">
                <label for="updates">Receive Updates</label>
                <input type="checkbox" id="updates" name="updates">
            </div>
            <div class="form-group">
                <label for="password">Password*</label>
                <input type="password" id="password" name="password" required>
            </div>
            <div class="form-group">
                <label for="confirmPassword">Confirm Password*</label>
                <input type="password" id="confirmPassword" name="confirmPassword" required>
            </div>
            <div class="form-group">
                <label for="terms">
                    <input type="checkbox" id="terms" name="terms" required> I agree to the Terms and Conditions.
                </label>
            </div>
            <button type="submit">Sign Up</button>
        </form>
        <p>Already have an account? <a href="/login">Login here</a></p>
    </div>
</body>
</html>

    `);
});



// Dynamic route for /accounts/signup
app.get('/accounts/signup', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Signup - My Application</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="registration-form">
        <h2>Create Your Account</h2>
        <form action="/signup" method="POST">
            <div class="form-group">
                <label for="fullName">Full Name*</label>
                <input type="text" id="fullName" name="fullName" required>
            </div>
            <div class="form-group">
                <label for="username">Username*</label>
                <input type="text" id="username" name="username" required>
            </div>
            <div class="form-group">
                <label for="email">Email*</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="country">Country*</label>
                <input type="text" id="country" name="country" required>
            </div>
            <div class="form-group">
                <label for="sector">Sector*</label>
                <input type="text" id="sector" name="sector" required>
            </div>
            <div class="form-group">
                <label for="organizationType">Organization Type*</label>
                <input type="text" id="organizationType" name="organizationType" required>
            </div>
            <div class="form-group">
                <label for="updates">Receive Updates</label>
                <input type="checkbox" id="updates" name="updates">
            </div>
            <div class="form-group">
                <label for="password">Password*</label>
                <input type="password" id="password" name="password" required>
            </div>
            <div class="form-group">
                <label for="confirmPassword">Confirm Password*</label>
                <input type="password" id="confirmPassword" name="confirmPassword" required>
            </div>
            <div class="form-group">
                <label for="terms">
                    <input type="checkbox" id="terms" name="terms" required> I agree to the Terms and Conditions.
                </label>
            </div>
            <button type="submit">Sign Up</button>
        </form>
        <p>Already have an account? <a href="/login">Login here</a></p>
    </div>
</body>
</html>

    `);
});

// Default route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


// Dynamic route for /accounts/login
app.get('/accounts/login', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - My Application</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="login-form">
        <h2>Login to Your Account</h2>
        <form action="/login" method="POST">
            <div class="form-group">
                <label for="username">Username*</label>
                <input type="text" id="username" name="username" required>
            </div>
            <div class="form-group">
                <label for="password">Password*</label>
                <input type="password" id="password" name="password" required>
            </div>
            <button type="submit">Login</button>
        </form>
        <p>Forgot your password? <a href="/reset-password">Reset here</a></p>
        <p>Don't have an account? <a href="/signup">Sign up here</a></p>
    </div>
</body>
</html>

    `);
});


// Dynamic route for /dashboard
app.get('/dashboard', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
</head>
<body>
    <h1>Welcome to your Dashboard, <%= username %>!</h1>
    <p>Here is where you can manage your account and access your features.</p>
</body>
</html>


    `);
});





















// Dynamic route for /accounts/password/reset
app.get('/accounts/password/reset', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password - My Application</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="reset-password-form">
        <h2>Reset Your Password</h2>
        <form action="/reset-password" method="POST">
            <div class="form-group">
                <label for="email">Email*</label>
                <input type="email" id="email" name="email" required>
            </div>
            <button type="submit">Submit</button>
        </form>
        <p>Remember your password? <a href="/login">Login here</a></p>
    </div>
</body>
</html>

    `);
});




// Dynamic route for /accounts/login
app.get('/accounts/login', (req, res) => {
    res.send(`



<!doctype html>
<html>
  <head>
    <!-- Setup -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
      <meta name="google-analytics-token" content="G-S073HLW9N0">
    
    

    <!-- Title and description -->
    <title>shopnotoolbox </title>
    <meta name="description" content="shopnotoolbox is a free toolkit for collecting and managing data in challenging environments and is the most widely-used tool in humanitarian emergencies">

    <!-- Icons -->
    <link rel="icon" href="/static/favicon.png" />
    <link rel="apple-touch-icon" href="/static/apple-touch-icon.png" />
    <link rel="manifest" href="/static/site.webmanifest" />
    <link rel="mask-icon" href="/static/safari-pinned-tab.svg" color="#2095f3" />

    <!-- Scripts -->
    <!-- Make Django's internationalization functionality available in client code. -->
    <script src="/jsi18n/"></script>
    <script src="/static/js/global_t.js"></script>
    
  <script src="/static/compiled/vendors-fac599b5f71e711e6289.js" ></script>
<script src="/static/compiled/app-1e236108f6d4df24b95f.js" ></script>


    <!-- Stylesheets -->
    
  


    
  <script src="/static/js/redirect_obsolete_browsers.js"></script>

  

  </head>

  <body>
    
  <div class="registration__bg">
    

<form action="/signup" method="post" class="language-switcher" data-path="/accounts/login/">
  <input type="hidden" name="csrfmiddlewaretoken" value="bUHrGV3419XSybi5tY9E7DO7kkUzAZpOJd74JsgHGVu5FGoE0lzFAcL2JeHym1m9">

  <input name="next" type="hidden" value="" />

  <select name="language">
    
    
    
    
      <option
        value="am"
        
      >
        አማርኛ
      </option>
    
      <option
        value="ar"
        
      >
        العربيّة
      </option>
    
      <option
        value="bn"
        
      >
        বাংলা
      </option>
    
      <option
        value="cs"
        
      >
        česky
      </option>
    
      <option
        value="de"
        
      >
        Deutsch
      </option>
    
      <option
        value="en"
        selected="selected"
      >
        English
      </option>
    
      <option
        value="es"
        
      >
        español
      </option>
    
      <option
        value="fa"
        
      >
        فارسی
      </option>
    
      <option
        value="fr"
        
      >
        français
      </option>
    
      <option
        value="hi"
        
      >
        हिंदी
      </option>
    
      <option
        value="hu"
        
      >
        Magyar
      </option>
    
      <option
        value="id"
        
      >
        Bahasa Indonesia
      </option>
    
      <option
        value="ja"
        
      >
        日本語
      </option>
    
      <option
        value="km"
        
      >
        Khmer
      </option>
    
      <option
        value="ku"
        
      >
        كوردی
      </option>
    
      <option
        value="ln"
        
      >
        Lingala
      </option>
    
      <option
        value="my"
        
      >
        မြန်မာဘာသာ
      </option>
    
      <option
        value="ny"
        
      >
        Nyanja
      </option>
    
      <option
        value="ne"
        
      >
        नेपाली
      </option>
    
      <option
        value="pl"
        
      >
        polski
      </option>
    
      <option
        value="pt"
        
      >
        Português
      </option>
    
      <option
        value="ru"
        
      >
        Русский
      </option>
    
      <option
        value="sw"
        
      >
        Kiswahili
      </option>
    
      <option
        value="th"
        
      >
        ภาษาไทย
      </option>
    
      <option
        value="tr"
        
      >
        Türkçe
      </option>
    
      <option
        value="uk"
        
      >
        Українська
      </option>
    
      <option
        value="vi"
        
      >
        Tiếng Việt
      </option>
    
      <option
        value="yo"
        
      >
        Yoruba
      </option>
    
      <option
        value="zh-hans"
        
      >
        简体中文
      </option>
    
  </select>

  <input type="submit" value="Go" class="hidden" />
</form>
<script src="/static/js/language_dropdown.js"></script>


    


  <form method="post" action="/accounts/login/" class="registration registration--login">
    
    <div class="registration--logo"><a href="/">
      
  
    <img src="/static/kobologo.svg"/>
  

    </a></div>

    <input type="hidden" name="csrfmiddlewaretoken" value="bUHrGV3419XSybi5tY9E7DO7kkUzAZpOJd74JsgHGVu5FGoE0lzFAcL2JeHym1m9">

    
    <p>
    <label for="id_login">Username</label>
    <input type="text" name="login" placeholder="" autocomplete="username" maxlength="150" required id="id_login">
    
    
  </p>

  
  <p>
    <label for="id_password">Password</label>
    <input type="password" name="password" placeholder="" autocomplete="current-password" required id="id_password">
    
      <span class="helptext"><a href="/accounts/password/reset/">Forgot your password?</a></span>
    
    
      
    
  </p>

    

    
    <button
      type="submit"
      name="Login"
      class="kobo-button kobo-button--blue kobo-button--fullwidth"
    >
      Login
    </button>

    
    <div class="registration__create-or-forgot">
      
        <a href="/accounts/signup/" class="registration__create-account">
          Create an account
        </a>
      

      <a href="/accounts/password/reset/" class="registration__forgot-password">
        Forgot password?
      </a>
    </div>

    
    
    

  </form>


    

    <div class="registration__footer">
      <div class="registration__legal">
        
          <a href="https://shopnoltd.kesug.com/terms/" target="_blank">
            Terms of Service
          </a>
        
        
          <a href="https://shopnoltd.kesug.com/privacy/" target="_blank">
            Privacy Policy
          </a>
        
      </div>

      
  
    
    <div class="registration__credit">
        <a href="https://flic.kr/p/9v4mC5" title="Muhkjar refugee camp" target="_blank">
            Photo
        </a>
        by UNAMID /
        <a href="https://creativecommons.org/licenses/by-nc-nd/2.0/" target="_blank">
            by-nc-nd
        </a>
    </div>
  

    </div>
  </div>

  

  
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-S073HLW9N0"></script>
    <!-- The rest of the setup is in main.es6 file -->
  

  </body>
</html>

    `);
});// Dynamic route for /password/reset
app.get('/password/reset', (req, res) => {
    res.send(`



<!doctype html>
<html>
  <head>
    <!-- Setup -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
      <meta name="google-analytics-token" content="G-S073HLW9N0">
    
    

    <!-- Title and description -->
    <title>shopnotoolbox </title>
    <meta name="description" content="shopnotoolbox is a free toolkit for collecting and managing data in challenging environments and is the most widely-used tool in humanitarian emergencies">

    <!-- Icons -->
    <link rel="icon" href="/static/favicon.png" />
    <link rel="apple-touch-icon" href="/static/apple-touch-icon.png" />
    <link rel="manifest" href="/static/site.webmanifest" />
    <link rel="mask-icon" href="/static/safari-pinned-tab.svg" color="#2095f3" />

    <!-- Scripts -->
    <!-- Make Django's internationalization functionality available in client code. -->
    <script src="/jsi18n/"></script>
    <script src="/static/js/global_t.js"></script>
    
  <script src="/static/compiled/vendors-fac599b5f71e711e6289.js" ></script>
<script src="/static/compiled/app-1e236108f6d4df24b95f.js" ></script>


    <!-- Stylesheets -->
    
  


    
  <script src="/static/js/redirect_obsolete_browsers.js"></script>

  

  </head>

  <body>
    
  <div class="registration__bg">
    

<form action="/i18n/setlang/" method="post" class="language-switcher" data-path="/accounts/password/reset/">
  <input type="hidden" name="csrfmiddlewaretoken" value="HzRzOZ3BuFFCFlcrdbMrO9q5D9YhH57qfShcRwge9rcPMQi0KycshIn023Lgt74L">

  <input name="next" type="hidden" value="" />

  <select name="language">
    
    
    
    
      <option
        value="am"
        
      >
        አማርኛ
      </option>
    
      <option
        value="ar"
        
      >
        العربيّة
      </option>
    
      <option
        value="bn"
        
      >
        বাংলা
      </option>
    
      <option
        value="cs"
        
      >
        česky
      </option>
    
      <option
        value="de"
        
      >
        Deutsch
      </option>
    
      <option
        value="en"
        selected="selected"
      >
        English
      </option>
    
      <option
        value="es"
        
      >
        español
      </option>
    
      <option
        value="fa"
        
      >
        فارسی
      </option>
    
      <option
        value="fr"
        
      >
        français
      </option>
    
      <option
        value="hi"
        
      >
        हिंदी
      </option>
    
      <option
        value="hu"
        
      >
        Magyar
      </option>
    
      <option
        value="id"
        
      >
        Bahasa Indonesia
      </option>
    
      <option
        value="ja"
        
      >
        日本語
      </option>
    
      <option
        value="km"
        
      >
        Khmer
      </option>
    
      <option
        value="ku"
        
      >
        كوردی
      </option>
    
      <option
        value="ln"
        
      >
        Lingala
      </option>
    
      <option
        value="my"
        
      >
        မြန်မာဘာသာ
      </option>
    
      <option
        value="ny"
        
      >
        Nyanja
      </option>
    
      <option
        value="ne"
        
      >
        नेपाली
      </option>
    
      <option
        value="pl"
        
      >
        polski
      </option>
    
      <option
        value="pt"
        
      >
        Português
      </option>
    
      <option
        value="ru"
        
      >
        Русский
      </option>
    
      <option
        value="sw"
        
      >
        Kiswahili
      </option>
    
      <option
        value="th"
        
      >
        ภาษาไทย
      </option>
    
      <option
        value="tr"
        
      >
        Türkçe
      </option>
    
      <option
        value="uk"
        
      >
        Українська
      </option>
    
      <option
        value="vi"
        
      >
        Tiếng Việt
      </option>
    
      <option
        value="yo"
        
      >
        Yoruba
      </option>
    
      <option
        value="zh-hans"
        
      >
        简体中文
      </option>
    
  </select>

  <input type="submit" value="Go" class="hidden" />
</form>
<script src="/static/js/language_dropdown.js"></script>


    
<form method="post" action="." class="registration registration--login">
  <div class="registration--logo">
    <a href="/">
      
  
    <img src="/static/kobologo.svg"/>
  

    </a>
    <h1>Password Reset</h1>
  </div>
  <input type="hidden" name="csrfmiddlewaretoken" value="HzRzOZ3BuFFCFlcrdbMrO9q5D9YhH57qfShcRwge9rcPMQi0KycshIn023Lgt74L">
  <p>
    <label for="id_email">Email:</label>
    <input type="email" name="email" placeholder="Email address" autocomplete="email" maxlength="320" required id="id_email">
    
    
      
    
  </p>
  <button
    type="submit"
    name="Reset Password"
    class="kobo-button kobo-button--blue kobo-button--fullwidth"
  >
    Reset Password
  </button>

  <div style="clear:both"></div>
</form>


    

    <div class="registration__footer">
      <div class="registration__legal">
        
          <a href="https://shopnoltd.kesug.com/terms/" target="_blank">
            Terms of Service
          </a>
        
        
          <a href="https://shopnoltd.kesug.com/privacy/" target="_blank">
            Privacy Policy
          </a>
        
      </div>

      
  
    
    <div class="registration__credit">
        <a href="https://flic.kr/p/9v4mC5" title="Muhkjar refugee camp" target="_blank">
            Photo
        </a>
        by UNAMID /
        <a href="https://creativecommons.org/licenses/by-nc-nd/2.0/" target="_blank">
            by-nc-nd
        </a>
    </div>
  

    </div>
  </div>

  

  
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-S073HLW9N0"></script>
    <!-- The rest of the setup is in main.es6 file -->
  

  </body>
</html>

    `);
});// Dynamic route for /terms
app.get('/terms', (req, res) => {
    res.send(`



<!DOCTYPE html>
<html lang="en-US">

<head>
    
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <meta http-equiv="Content-Security-Policy" content="
        default-src 'self';
        img-src 'self' https://static.fundraiseup.com *.hsforms.com https://www.google-analytics.com https://ucarecdn.com
        *.paypal.com data: https://www.paypalobjects.com https://www.gstatic.com *.guidestar.org;
        script-src 'self' 'unsafe-inline' http://js.hsforms.net *.fundraiseup.com *.googletagmanager.com https://www.google-analytics.com
        https://ssl.google-analytics.com https://js.stripe.com https://www.paypal.com https://pay.google.com;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com;
        font-src 'self' https://fonts.gstatic.com https://static.fundraiseup.com;
        connect-src 'self' https://fndrsp.net https://forms.hsforms.com https://api.fundraiseup.com https://js.stripe.com
        https://www.google-analytics.com https://fndrsp-checkout.net https://sentry.fundraiseup.com https://www.paypal.com
        https://hubspot-forms-static-embed.s3.amazonaws.com https://google.com https://pay.google.com ws:;
        frame-src 'self' https://js.stripe.com https://forms.hsforms.com https://www.paypal.com https://pay.google.com/ *.youtube.com;
    ">

    
    <title>Terms of Service | shopnotoolbox</title>
    <meta name="description" content="shopnotoolbox is an intuitive, powerful, and reliable software used to collect, analyze, and manage data for surveys, monitoring, evaluation, and research."/>
    <base href="https://shopnoltd.kesug.com"/>
    <link rel="home" href="https://shopnoltd.kesug.com"/>

    
    <meta name="robots" content="index,follow,noodp"/>
    <meta name="googlebot" content="index,follow"/>

    
    <meta property="og:locale" content="en_US"/>
    <meta property="og:site_name" content="shopnotoolbox"/>
    <meta property="og:title" content="Terms of Service"/>
    <meta property="og:description" content="shopnotoolbox is an intuitive, powerful, and reliable software used to collect, analyze, and manage data for surveys, monitoring, evaluation, and research."/>
    <meta property="og:url" content="https://shopnoltd.kesug.com/terms/"/>
    <meta name="twitter:site" content="@shopnotoolbox"/>
    <meta name="twitter:description" content="shopnotoolbox is an intuitive, powerful, and reliable software used to collect, analyze, and manage data for surveys, monitoring, evaluation, and research."/>

    
    
    
        <meta property="og:type" content="website"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content="shopnotoolbox"/>
        <meta name="twitter:image" content="https://shopnoltd.kesug.com/assets/images/common/shopnotoolbox_opengraph_image.png"/>
        <meta property="og:image" content="https://shopnoltd.kesug.com/assets/images/common/shopnotoolbox_opengraph_image.png"/>
    

    
    <link href="https://shopnoltd.kesug.com/assets/styles/kobo.css?2024-12-05_18-51-37" rel="stylesheet" media="all"/>
    <link rel="icon" href="https://shopnoltd.kesug.com/favicon.png?2024-12-05_18-51-37"/>



    
    <script>
    (function(w,d,s,n,a){if(!w[n]){var l='call,catch,on,once,set,then,track'
    .split(','),i,o=function(n){return'function'==typeof n?o.l.push([arguments])&&o
    :function(){return o.l.push([n,arguments])&&o}},t=d.getElementsByTagName(s)[0],
    j=d.createElement(s);j.async=!0;j.src='https://cdn.fundraiseup.com/widget/'+a;
    t.parentNode.insertBefore(j,t);o.s=Date.now();o.v=4;o.h=w.location.href;o.l=[];
    for(i=0;i<7;i++)o[l[i]]=o(l[i]);w[n]=o}
    })(window,document,'script','FundraiseUp','ASAUFVGL');</script>
</head>


<body class="root">


<header class="root__header">
  <div class="root__row">
    <div class="root__row-content root__row-content--wide">
      <nav class="header-nav">
  <a class="header-nav__logo" href="/">
    <img src="/assets/images/common/shopnotoolbox_logo_default_for-light-bg.svg"/>
  </a>
  <a class="header-nav__mobile-logo" href="/">
    <img src="/assets/images/site/shopnotoolbox-logo-mobile.svg"/>
  </a>

  
  <input type="checkbox" id="mobile-nav-trigger">
  <label class="header-nav__mobile-nav-trigger" for="mobile-nav-trigger">
    <i></i><i></i><i></i><i></i>
  </label>

  <ul class="header-nav__menu">
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/about-us"
          >About us</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/features"
          >Features</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/services"
          >Services</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/pricing"
          >Pricing</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/blog"
          >Blog</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/help"
          >Help</a
        >
      </li>
    
  </ul>

  <ul class="header-nav__buttons">
    
    
    <li>
<a class="button button--size-m button--type-frame button--color-blue" href="/sign-up">Sign up</a>
</li>
    <li>
<a class="button button--size-m button--type-full button--color-blue" href="/donate">Donate</a>
</li>
  </ul>
</nav>

    </div>
  </div>
</header>


<div class="modal" data-modal>
  <div class="modal__box">
    <button class="modal__closer" data-modal-closer>&times;</button>
    <div class="modal__content" data-modal-content>Hello, World!</div>
  </div>
</div>


<main class="root__main" role="main"><div class="root__row">
  <div class="root__row-content">
    <article class="long-text-content">
      <h1>Terms of Service</h1>
      <p>
        <strong>Effective Date</strong>: June 1, 2024
      </p>
      <h3>INTRODUCTION</h3>
      <p>
        These terms and conditions (the “<b>Terms of Service</b>” or
        “<b>Terms</b>”) are a legal agreement by and between You, in your
        individual capacity and on behalf of any entity for which you are an
        authorized representative (“<b>You</b>” or “<b>User</b>”), and Kobo, Inc.
        (“<b>Kobo</b>,” “<b>we</b>,” or “<b>us</b>”) (each a “<b>Party</b>” and
        collectively the “<b>Parties</b>”) that governs Your access to and use
        of: (a) the Kobo website at shopnotoolbox.org, its subdomains, and any
        other website where these Terms are posted (“<b>Website</b>”); and (b)
        Kobo’s online hosted services and any related software, applications,
        mobile applications that Kobo may offer to Users (“<b>Mobile App</b>”),
        content, functionality, documentation, and/or services (the
        “<b>shopnotoolbox</b>”) (collectively, the “<b>Service</b>(s)”) offered by
        Kobo.
      </p>

      <p>
        Please read the Terms of Service carefully before You start to use or
        access our Services. By explicitly accepting or accessing or using our
        Services, You accept and agree to be bound and abide by these Terms on
        behalf of Yourself and any entity that You represent in the context of
        Your use of the Services. If You are using the Services on behalf of a
        business or entity, You acknowledge and agree that You have such
        authority to bind such business or entity and that such business or
        entity accepts these Terms. If You do not agree to these Terms of
        Service, You may not access or use any of our Services.
      </p>

      <p>
        We also make various policies, help centers, and other resources
        available to You to answer common questions and to set expectations
        about using our Services. These resources include our
        <a href="/privacy/">Privacy Notice</a>
        (as referenced in Section 11 below),
        <a href="/legal/inactive-accounts/">Inactive Accounts Policy</a>, and other
        Policies accessible from our <a href="/legal/">Policies site</a>. Please
        understand that by accessing our Services, You agree that You are subject
        to these Policies.
      </p>

      <p>
        <i>
          <b>
            SECTION 14 “MUTUAL ARBITRATION PROVISION” CONTAINS A BINDING
            ARBITRATION AGREEMENT AND CLASS ACTION WAIVER THAT AFFECT YOUR LEGAL
            RIGHTS.
          </b>
        </i>
        <i>
          THESE PROVISIONS WILL, WITH LIMITED EXCEPTION, REQUIRE YOU TO: (1)
          WAIVE YOUR RIGHT TO A JURY TRIAL, AND (2) SUBMIT CLAIMS YOU HAVE
          AGAINST KOBO TO BINDING AND FINAL ARBITRATION ON AN INDIVIDUAL BASIS,
          NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY CLASS, GROUP OR
          REPRESENTATIVE ACTION OR PROCEEDING. Please follow the instructions in
          the Mutual Arbitration Provision below if You wish to opt out of this
          provision.
        </i>
      </p>

      <h3>1. ELIGIBILITY</h3>

      <p>
        The Services are intended for Users eighteen (18) years old and older.
        By accessing or using the Services, You represent and warrant that You
        are at least eighteen (18) years old or the age of majority in Your
        jurisdiction. If You are under 18 years of age, or under the age at
        which You may enter into a binding agreement under the applicable law in
        your jurisdiction, You must obtain Your parent or guardian’s written
        permission to use the Services. Please have them read these Terms with
        You.
      </p>

      <p>
        By using our Services, You or Your parent or guardian represent and
        warrant that You or Your parent or guardian possess the legal right and
        ability to enter into these Terms of Service and to use the Services in
        accordance with these Terms.
      </p>

      <h3>2. CHANGES TO TERMS OF SERVICE</h3>

      <p>
        We reserve the right to modify and update these Terms of Service at our
        discretion, at any time and from time to time, and so you should review
        this page periodically. Revised versions will be posted on the Website 
        with an updated “Last Modified” date indicated at the top of this page. 
        Each revision will specify its Effective Date clearly on the page, which 
        will allow you to be aware of when the changes will take effect. We will 
        also provide reasonable notice of any material changes, as determined 
        at our sole discretion, by emailing our Users prior to the changes 
        becoming effective.
      </p>

      <p>
        <b>
          You understand that Your continued use of the Services after any
          change to these Terms means that You accept and agree to be bound by
          these Terms of Service, as revised. If You do not accept the revised
          Terms of Service in their entirety, You may not access or use the
          Services after the updated “Last Modified” date.
        </b>
      </p>

      <h3>3. USER ACCOUNTS AND SERVICES</h3>

      <h4>User Accounts and Use of Services</h4>
      <p>
        Users are required to create a User account to use and access
        shopnotoolbox (“<b>Account</b>”). Using another User’s Account without
        their explicit permission is strictly prohibited. You are solely
        responsible for how You use Your Account and Kobo does not control,
        endorse, or approve any activities or actions performed using Your Account. You bear full
        responsibility for any activity that takes place on Your Account, and
        You must ensure the strength and security of Your Account password. If
        You become aware of any security breach or unauthorized use of Your
        Account, You must notify us immediately. You agree that we will not be
        held liable for any losses resulting from unauthorized use of Your
        Account by individuals with access to Your Account, including any 
        modifications made to Your Account or changes in Your ability to access 
        Your Account or any stored data. Kobo is not responsible for any human error
        caused by You or any third party. Kobo is not obligated to prescreen
        Your use of the Services, and we do not regularly monitor use of the
        Services. However, we may choose, in our sole discretion, to review Your
        use of the Services.
      </p>

      <h4>Federal Government End Use Provisions</h4>
      <p>
        We provide shopnotoolbox, including related software and technology, for
        ultimate federal government end use solely in accordance with the
        following: Government technical data and software rights related to
        shopnotoolbox include only those rights customarily provided to the public
        as deﬁned in these Terms. This customary commercial license is provided
        in accordance with FAR 12.211 (Technical Data) and FAR 12.212 (Software)
        and, for Department of Defense transactions, DFAR 252.227-7015
        (Technical Data – Commercial Items) and DFAR 227.7202-3 (Rights in
        Commercial Computer Software or Computer Software Documentation). If a
        government agency has a need for rights not conveyed under these Terms,
        it must negotiate with us to determine if there are acceptable terms for
        transferring such rights, and a mutually acceptable written amendment to
        these Terms speciﬁcally conveying such rights must be executed between
        the Parties.
      </p>

      <h4>Accurate Information</h4>
      <p>
        In creating and using Your Account, You agree to: (a) provide true,
        accurate, current, and complete information about Yourself and any
        entity for which you are an authorized representative on any
        registration form required for the Services (such information being the
        “<b>Registration Data</b>”); (b) maintain and promptly update the
        Registration Data to keep it true, accurate, current, and complete; and
        (c) maintain and promptly update Your Payment Information (as defined in
        Section 4 below) to keep it true, accurate, current, and complete. If
        You provide any information that is untrue, inaccurate, not current, or
        incomplete, or if we have reasonable grounds to suspect that such
        information is untrue, inaccurate, not current, or incomplete, then we
        have the right to suspend or terminate Your Account and refuse any and
        all current or future use of Your Account.
      </p>

      <h4>System Requirements</h4>

      <p>
        Use of the Services requires a compatible device(s) and internet access
        and may require obtaining updates or upgrades from time to time. Your
        ability to access and use the Services may be affected by the
        performance of these factors. You acknowledge that obtaining and
        maintaining appropriate devices and having appropriate access to the
        internet are Your responsibility and that Kobo is not responsible for
        any charges related to these factors while using our Services.
      </p>

      <h4>Modification of the Services</h4>
      <p>
        Kobo reserves the right, at any time, to modify, suspend, or discontinue
        the Services (in whole or in part) with or without notice to You. You
        agree that Kobo will not be liable to You or to any third party for any
        modification, suspension, or discontinuation of the Services or any part
        thereof.
      </p>

      <h3>4. CHARGES AND PAYMENTS</h3>

      <h4>Subscription Plans</h4>
      <p>
        Use of shopnotoolbox is provided through various subscription plans,
        available either for free or for a fee (a “<b>Subscription Plan</b>”),
        which allow Users to access specific features of shopnotoolbox.
        Subscription Plans may be offered for a set subscription period (a “<b
          >Subscription Term</b
        >”). The initial Subscription Term and any renewal terms (as provided
        for in the “Renewals” section below) are together referred to as the
        “Subscription Term” of your paid Subscription Plan. You agree to abide
        by the terms and conditions of the Subscription Plan You have selected,
        as provided on the Website or as otherwise communicated to you in
        writing.
      </p>

      <p>
        If You elect to sign up for a paid Subscription Plan, You agree to the
        pricing and payment terms specified on the Website, or as otherwise
        posted or communicated to You, as we may update them from time to time.
      </p>

      <p>
        We may change Subscription Plans by updating fees or terms or offering
        new services at Kobo’s sole discretion. Any change to a Subscription
        Plan’s pricing or payment terms will become effective in the billing
        cycle following notice of such change to You.
      </p>

      <h4>Billing and Payment</h4>
      <p>
        If You sign up for a paid Subscription Plan, we will collect your
        payment and billing information (“<b>Payment Information</b>”) to
        process charges for Your Subscription Plan. By agreeing to these Terms,
        you hereby authorize Kobo to submit charges using your Payment
        Information for applicable Subscription Plan fees and any applicable
        taxes and/or services charges related to Your Subscription Plan (the “<b
          >Service Fees</b
        >”). All Service Fees must be paid in United States Dollars.
      </p>

      <p>
        To the extent permitted by applicable law and subject to our Privacy
        Notice, You acknowledge and agree that we may use certain third-party
        vendors and service providers to process payments and manage any Payment
        Information associated with Your Subscription Plan, and You agree to be
        bound by such vendor or service provider’s Services Agreement.
      </p>

      <p>
        By providing Your Payment Information to Kobo and authorizing payments
        with the Payment Information, You represent, warrant, and covenant that:
        (a) You are legally authorized to provide such information; (b) You are
        legally authorized to make payments using the Payment Information; (c)
        if You are an employee or agent of a company or person that controls the
        Payment Information, that You are authorized by the company or person to
        use the Payment Information for payment of Service Fees; and (d) such
        actions do not violate the terms and conditions applicable to Your use
        of such Payment Information or applicable law. When You authorize a
        payment, You represent and warrant that there are sufficient funds or
        credit available to complete the payment using the designated Payment
        Information.
      </p>

      <p>
        Because the use of any Payment Information may be limited by applicable
        law or by written agreement with Your financial institution, Kobo is not
        liable to any User if Kobo does not complete a transaction as a result
        of any such limit or if a financial institution fails to honor any
        credit or debit to or from an account associated with such Payment
        Information. Kobo will make commercially reasonable efforts to resolve
        such transactions in a manner consistent with these Terms.
      </p>

      <h4>Renewals</h4>
      <p>
        Your Subscription Plan will continue until canceled by You or by Kobo in
        accordance with these Terms. Unless and until canceled by You, your paid
        Subscription Plan will automatically renew on the anniversary of the
        commencement of your paid Subscription Plan, for terms equal in length
        to your original Subscription Term. You will automatically be charged
        for each such renewal using the Payment Information You have provided.
        By agreeing to these Terms and electing to utilize a paid Subscription
        Plan, you acknowledge that your paid Subscription Plan has recurring
        payment features and you accept responsibility for all recurring payment
        obligations prior to cancellation of your paid Subscription Plan.
      </p>

      <p>
        If you do not want Your paid Subscription Plan to renew, you must cancel
        it before the end of the Subscription Term via the account settings page
        on Your Account. A free Subscription Plan may be canceled at any time
        by deleting Your Account from within your account settings or by sending an email
        to info@shopnotoolbox.org requesting that Kobo delete Your Account.
      </p>

      <h4>Changes</h4>
      <p>
        If you change your Subscription Plan, a new Subscription Term will begin
        for such changed Subscription Plan on the date on which such new
        Subscription Plan becomes effective.
      </p>

      <h4>Late Payments</h4>
      <p>
        Except for invoiced payments that You have successfully disputed, all
        late payments shall bear interest of 1% per month after the payment due
        date. You shall also reimburse Kobo for all reasonable costs incurred in
        collecting any late payments, including, without limitation, attorneys’
        fees.
      </p>

      <h3>5. TERM AND TERMINATION</h3>

      <h4>Effective Date</h4>
      <p>
        These Terms of Service become effective on the date on which You agree
        to these Terms by accessing or using the Website or registering for an
        Account through shopnotoolbox (as applicable) and will remain in effect
        until: (a) You stop using the Website; (b) You delete Your Account;
        and/or (c) Kobo terminates Your Account, with the exception of any
        section(s) of these Terms that by their nature should survive
        termination.
      </p>

      <h4>Cancellation and Termination</h4>
      <p>
        Kobo may terminate your Subscription Plan and/or close your Account at
        any time without cause and for any reason without notice or liability to
        You. If we cancel or terminate your paid Subscription Plan, except in
        the event of your breach of these Terms or failure to pay fees when due,
        we will grant you a prorated refund for the remaining unused portion of
        your Subscription Term. If you cancel or terminate your paid
        Subscription Plan without changing to another paid Subscription Plan or
        moving to a free Subscription Plan, your right to use shopnotoolbox will
        continue until the end of your then-current Subscription Term and then
        terminate without further charges. If You request cancellation of your
        free Subscription Plan by deletion of your Account, Your right to use or
        access shopnotoolbox will immediately terminate.
      </p>

      <p>
        Notwithstanding the foregoing, if You live in the European Union or
        Turkey and cancel Your paid Subscription Plan within fourteen (14) days
        of purchase, You will be eligible for a refund of any payments made for
        the canceled paid Subscription Plan and, if You request such a refund,
        Your right to use shopnotoolbox will terminate immediately upon
        cancellation of Your paid Subscription Plan. Subject to the preceding
        sentence, if You cancel your paid Subscription Plan, unless required by
        applicable law, YOU WILL NOT RECEIVE A REFUND OF ANY PORTION OF ANY FEES
        PAID FOR THE THEN-CURRENT SUBSCRIPTION TERM AT THE TIME OF TERMINATION.
      </p>

      <p>
        Upon termination or cancellation of Your Subscription Plan without
        changing to another Subscription Plan or upon deletion of your Account:
        (a) all licenses and rights granted to You under these Terms related to
        shopnotoolbox shall immediately cease; (b) You shall stop using
        shopnotoolbox; (c) Kobo will have no further obligation to retain Your
        data (including Your Confidential Information as defined in Section 9);
        and (d) any section(s) of these Terms that by their nature should
        survive cancellation or termination will survive.
      </p>

      <h3>6. ADDITIONAL TERMS FOR MOBILE APPLICATIONS</h3>

      <h4>Mobile Applications</h4>
      <p>
        The Mobile App is available via a compatible mobile device. If You use
        the Mobile App, You may incur mobile data charges from your wireless
        provider in connection with the Mobile App, and You agree that You are
        solely responsible for any such charges. You acknowledge and agree that
        we may make available updated versions of the Mobile App. You represent
        and warrant that You are using, and will at all times in the future use,
        the latest version of the Mobile App on Your mobile device. You agree
        that these Terms will apply to Your use of and access to any and all
        such versions of the Mobile App.
      </p>

      <h4>App Store Terms</h4>
      <p>
        You acknowledge and agree that availability of the Mobile App is
        dependent on the third-party platform (the “<b>App Store</b>”) from
        which You download the Mobile App. You acknowledge that these Terms are
        between You and Kobo and not with an App Store. Each App Store may have
        its own terms and conditions to which You must agree before downloading
        the Mobile App from it. You agree to comply with such App Store terms
        and conditions, and Your right and license to use the Mobile App (as
        stated in Section 12 below) is conditioned upon Your compliance with
        those App Store terms and conditions. To the extent that any terms and
        conditions from the App Store are less restrictive than or otherwise
        conflict with the terms and conditions set forth in these Terms, the
        more restrictive or conflicting terms and conditions in these Terms will
        apply.
      </p>

      <h3>7. DONATIONS</h3>

      <p>
        If You donate to Kobo, we will collect your payment and billing
        information (“<b>Donor Payment Information</b>”) to process charges for
        Your donation. All donations must be paid in United States Dollars. If
        You donate to Kobo on a recurring basis, by agreeing to these Terms, you
        hereby authorize Kobo to submit charges using your Donor Payment
        Information for Your recurring donations. We (or our third-party payment
        processor) will automatically charge You according to the donation
        schedule You have selected on our Website until You cancel Your
        recurring donation. If you wish to cancel recurring donation payments,
        you must use the link included in your donation confirmation email or
        contact donate@shopnotoolbox.org at least fourteen (14) days before
        Your next scheduled donation payment.
      </p>

      <p>
        To the extent permitted by applicable law and subject to our Privacy
        Notice, You acknowledge and agree that we may use certain third-party
        vendors and service providers to process payments and manage any Donor
        Payment Information associated with Your donation.
      </p>

      <p>
        By providing Your Donor Payment Information to Kobo and authorizing
        payments with the Donor Payment Information, You represent, warrant, and
        covenant that: (a) You are legally authorized to provide such
        information; (b) You are legally authorized to make payments using the
        Donor Payment Information; and (c) such actions do not violate the terms
        and conditions applicable to Your use of such Donor Payment Information
        or applicable law. When You authorize a payment, You represent and
        warrant that there are sufficient funds or credit available to complete
        the payment using the Donor Payment Information.
      </p>

      <p>
        Because the use of any Donor Payment Information may be limited by
        applicable law or by written agreement with Your financial institution,
        Kobo is not liable to You if Kobo does not complete a transaction as a
        result of any such limit or if a financial institution fails to honor
        any credit or debit to or from an account associated with such Donor
        Payment Information. Kobo will make commercially reasonable efforts to
        resolve such transactions in a manner consistent with these Terms.
      </p>

      <h3>8. PROHIBITED USES</h3>

      <p>
        You may use our Services only for lawful purposes and in accordance with
        these Terms of Service. You agree not to use the Services:
      </p>
      <ul>
        <li>
          In any way that violates any applicable federal, state, local, or
          international law or regulation (including, without limitation, any
          laws regarding the export of data or software to and from the United
          States or other countries, and data privacy or data protection laws
          related to the collection, use, security, processing, retention, and
          sharing of personal data or personal information (as such terms are
          defined by applicable law)).
        </li>
        <li>
          For the purpose of exploiting, harming, or attempting to exploit or
          harm minors in any way by exposing them to inappropriate content,
          asking for personally identifiable information, or otherwise.
        </li>
        <li>
          To send, knowingly receive, upload, download, use, or re-use any
          material that does not comply with these Terms of Service.
        </li>
        <li>
          To transmit, or procure the sending of, any advertising or promotional
          material, including any “junk mail,” “chain letter,” “spam,” or any
          other similar solicitation.
        </li>
        <li>
          To impersonate or attempt to impersonate Kobo, a Kobo team member,
          another User, another organization, or any other person or entity
          (including, without limitation, by using email addresses or Account
          names associated with any of the foregoing).
        </li>
        <li>
          To engage in any other conduct that restricts or inhibits anyone’s use
          or enjoyment of the Services, or which, as determined by us, may harm
          Kobo or Users of the Services, or expose them to liability.
        </li>
        <li>
          For any political purpose or activity, as determined solely by Kobo.
        </li>
      </ul>

      <p>Additionally, You agree not to:</p>
      <ul>
        <li>
          Use the Services in any manner that could disable, overburden, damage,
          or impair the Services or interfere with any other party's use of the
          Services, including their ability to engage in real-time activities
          through the Services.
        </li>
        <li>
          Use any robot, spider, or other automatic device, process, or means 
          to access the Services for any unauthorized purpose, including 
          monitoring or copying any of the material on the Services. This 
          prohibition does not apply to the use of the services through 
          officially provided APIs, which may be subject to separate terms 
          and conditions.
        </li>
        <li>
          Use any device, software, or routine that interferes with the proper
          working of the Services, including any viruses, Trojan horses, worms,
          logic bombs, or other material that is malicious or technologically
          harmful.
        </li>
        <li>
          Attempt to gain unauthorized access to, interfere with, damage, or
          disrupt any parts of the Services, the servers on which the Services
          are stored, or any server, computer, or database connected to the
          Services.
        </li>
        <li>
          Attack the Services via a denial-of-service attack, a distributed
          denial-of-service attack, or any similar means.
        </li>
        <li>
          Otherwise attempt to interfere with the proper working of the
          Services.
        </li>
      </ul>

      <h3>9. CONFIDENTIALITY</h3>

      <h4>Definitions</h4>
      <p>
        “<b>Confidential Information</b>” of a Party means the confidential or
        proprietary information or data of that Party, including without
        limitation: (a) all information clearly identified as confidential or
        proprietary; (b) Your shopnotoolbox survey or questionnaire questions and
        results; and (c) the Party’s business, operational, financial,
        technical, and proprietary information. Confidential Information of Kobo
        includes any code or non-public documentation relating to the Services.
        Your Confidential Information includes Your Personal Information
        (defined below), including Personal Information related to respondents
        or participants in Your surveys or questionnaires. Notwithstanding the
        above, except Your Personal Information, Confidential Information does
        not include information that is: (a) developed independently by the
        receiving Party (including Aggregate Data, defined below); (b) known to
        the receiving Party before receiving it from the disclosing Party; or
        (c) publicly available or received from another source without violation
        of an obligation of confidentiality.
      </p>
      <p>
        “<b>Personal Information</b>” means information that identifies, relates
        to, describes, is capable of being associated with, or could reasonably
        be linked, directly or indirectly, with a particular individual,
        household, or entity, and includes “personal data,” “personally
        identifiable information,” “sensitive data,” and analogous terms under
        Data Privacy Laws. “<b>Data Privacy Laws</b>” means all data privacy,
        data security, data breach notification, and/or data protection laws,
        rules, and regulations applicable to the Personal Information provided
        to Kobo by You or applicable to the processing of such Personal
        Information by Kobo on Your behalf.
      </p>
      <h4>Obligations</h4>
      <p>
        Neither Party shall use Confidential Information of the other Party for
        any purpose other than the purposes described in these Terms. Each Party
        agrees to safeguard, protect, and keep secret the Confidential
        Information of the other Party. A receiving Party must promptly notify
        the disclosing Party in writing of any disclosure or misuse of the
        disclosing Party’s Confidential Information promptly upon becoming aware
        of such disclosure or misuse. Notwithstanding the above, a receiving
        Party may disclose the disclosing Party’s Confidential Information to
        the extent necessary to comply with a court order or other legal
        requirement.
      </p>

      <h4>Usage Data</h4>
      <p>
        Kobo may use data related to Your use of the Services to improve its
        product and service offerings. Kobo may also use or disclose such usage
        data in aggregate form, which does not identify You (the “<b>Aggregate 
        Data</b>”), for any purpose permitted by applicable law. Kobo may transfer
        Aggregate Data to any successor-in-interest under an obligation of
        confidentiality, as permitted by applicable law.
      </p>

      <h3>
        10.
        
          US DEPARTMENT OF THE TREASURY OFFICE OF FOREIGN ASSETS CONTROL
          CERTIFICATIONS
        
      </h3>

      <p>
        User represents and warrants that User: (a) does not appear on the U.S.
        Department of the Treasury's Office of Foreign Assets Control (“OFAC”)
        Specially Designated Nationals and Blocked Persons (“SDN”) List or, if
        User is using the Services on behalf of a business or entity that, to
        the best of User’s knowledge, no director, officer, owner, principal, or
        employee of such business or entity or any of its subsidiaries appear on
        the SDN List; and (b) neither User or, to the best of User’s knowledge,
        any business or entity on whose behalf User is accessing the Services,
        any of such business or entity’s subsidiaries or, to the best of User’s
        knowledge, any director, officer, owner, principal, or employee of such
        business or entity or any of its subsidiaries is the target of any
        sanctions law or is located, organized, or resident in a country or
        territory that is, or whose government currently is, the target of
        countrywide sanctions imposed by OFAC or any U.S. government sanctions
        authority.
      </p>

      <p>
        User certifies that User is not: (a) acting on behalf of any person,
        group, or entity (“<b>Person</b>”) and/or any nation named by any
        Executive Order of OFAC or otherwise, as a terrorist, “Specially
        Designated National,” “Blocked Person,” or other banned or blocked
        Person or nation, pursuant to any law, order, rule, or regulation that is
        enforced or administered by OFAC or another department of the U.S.
        government; (b) using or accessing the Services on behalf of, nor
        instigating or facilitating the use or access to the Services on behalf
        of, any such Person or nation; and/or (c) contemplating any use of or
        access to the Services under these Terms that is prohibited by U.S.
        export controls laws or economic or trade sanctions imposed by OFAC or
        other U.S. government authorities.
      </p>

      <p>
        User acknowledges and agrees that User or any business or entity on
        whose behalf User is accessing the Services will not: (a) sell, export,
        re-export, or otherwise transfer Kobo products or technology in
        violation of U.S. export controls laws or economic or trade sanctions
        imposed by OFAC or any other U.S. government authorities; and/or (b)
        engage in transactions with parties appearing on the SDN List.
      </p>

      <h3>11. PRIVACY NOTICE</h3>

      <p>
        In accordance with applicable Data Privacy Laws (as defined in Section
        9), Kobo will notify individual Users of its publicly posted Privacy
        Notice available at https://shopnoltd.kesug.com/privacy/ and, as a data
        processor, may process Personal Information collected directly from
        individual Users as described in such Privacy Notice.
      </p>

      <h3>12. INTELLECTUAL PROPERTY RIGHTS</h3>

      <h4>Kobo Intellectual Property</h4>
      <p>
        Subject to Your compliance with these Terms, Kobo grants to You a
        non-exclusive, non-assignable, and non-sublicensable right and license
        to access and use (a) shopnotoolbox on a software-as-a-service basis, as
        hosted by Kobo, (b) the Mobile App, and/or (c) the Website (as
        applicable). The rights granted to You in these Terms are subject to the
        restrictions in these Terms.
      </p>

      <p>
        The shopnotoolbox name, logo, trademarks, and all related names, logos,
        product and service names, designs, and slogans are trademarks of Kobo
        or its affiliates or licensors. All other names, logos, product and
        service names, designs, and slogans related to the Services are the
        trademarks of their respective owners. You shall not be entitled to use
        Kobo’s name or any trade name, trademark, or service mark belonging to
        Kobo in printed brochures, press releases, or in any other form of
        advertising for any product, service, or technology without the prior
        written consent of Kobo.
      </p>

      <h4>Services Content</h4>
      <p>
        The Services are provided to You as a convenience. Your use of the
        Services is at Your own risk. Kobo does not warrant or represent that:
        (a) any materials, documents, recommendations, images, graphics,
        shareable links, design, audio, video, and any other information
        authored by or created in connection with the use of the Services
        (collectively, the “<b>Services Content</b>”) is accurate or complete;
        (b) the Services Content is up to date or current; (c) Kobo has any
        obligation to update the Services Content; (d) the Services Content is
        free from technical inaccuracies or programming or typographical errors;
        (e) the Services Content is free from changes caused by a third party;
        (f) Your access to the Services will be free from interruptions, errors,
        computer viruses, or other harmful components; or (g) any information
        obtained in response to questions asked through the Services is accurate
        or complete. All Services Content not authored or created by Kobo
        reflects solely the views and opinions of the authors thereof. The Services
        Content should not be construed or relied upon as legal, financial,
        medical, or technical advice.
      </p>

      <h4>Feedback</h4>
      <p>
        The Services may now or in the future permit You to upload, post, or
        otherwise submit to us various forms of content, such as reviews,
        ratings, feedback, questions, comments, and suggestions about the
        Services (collectively, “<b>Feedback</b>”). Feedback does not include
        shopnotoolbox survey questions, responses to survey questions, or other
        survey-specific data collected by or on behalf of You. We do not claim
        ownership of Your Feedback. However, by submitting any Feedback, You
        hereby grant (and You represent and warrant that You have the right to
        grant) to Kobo an irrevocable, non-exclusive, royalty-free, and
        fully-paid license to reproduce, distribute, publicly display and
        perform, prepare derivative works of, incorporate into other works, and
        otherwise use and exploit Your Feedback in any manner that Kobo deems
        appropriate. You will not have or obtain any rights in or to any form,
        media, or technology incorporating any of Your Feedback. You agree that
        You will not submit to Kobo any information or ideas that You consider
        to be confidential or proprietary. You further acknowledge that Kobo
        will be entitled to unrestricted use of Your Feedback for any purpose
        whatsoever, commercial or otherwise. You are solely responsible for Your
        Feedback and assume all risks associated with Your Feedback, including
        any reliance on its accuracy, completeness, or usefulness by others, or
        any disclosure of Feedback that personally identifies You or a third
        party. Kobo cannot guarantee any confidentiality with respect to any
        Feedback. We reserve the right (but have no obligation) to review any
        Feedback and to investigate and/or take appropriate action against You
        in our sole discretion if You violate these Terms or otherwise create
        liability for us or any other person.
      </p>
      <h3>13. DIGITAL MILLENNIUM COPYRIGHT ACT</h3>

      <p>
        Kobo respects the intellectual property rights of others and attempts to
        comply with all relevant laws. We will review all claims of copyright
        infringement received and remove any content deemed to have been posted
        or distributed in violation of any such laws.
      </p>

      <p>
        Our designated agent under the Digital Millennium Copyright Act (the
        “<b>Act</b>”) for the receipt of any Notification of Claimed
        Infringement which may be given under that Act is as follows:
      </p>

      <p>
        Kobo, Inc.
        <br />
        37 Highland Ave,
        <br />
        Cambridge MA, 02139
        <br />
        United States of America
      </p>
      <p>Email Address: <u>info@shopnotoolbox.org</u></p>

      <p>
        If You believe that Your work has been copied in a way that constitutes
        copyright infringement and is accessible via the Services, please
        provide our designated agent with notice in accordance with the
        requirements of the Act, including: (a) a description of the copyrighted
        work that You claim has been infringed and the specific materials
        available on or through the Services that you claim to be infringing and
        where such materials are located; (b) a description of the location of
        the original or an authorized copy of the copyrighted work; (c) Your
        address, telephone number, and email address; (d) a statement by You that
        You have a good faith belief that the disputed use is not authorized by
        the copyright owner, its agent, or the law; (e) a statement by You, made
        under penalty of perjury, that the information in Your notice is
        accurate and that You are the copyright owner or authorized to act on
        the copyright owner’s behalf; and (f) an electronic or physical
        signature of the owner of the copyright or a person authorized to act on
        behalf of the owner of the copyright’s interest.
      </p>

      <h3>14. MUTUAL ARBITRATION PROVISION– PLEASE READ.</h3>

      <p>
        YOU AND KOBO MUTUALLY AGREE TO RESOLVE ANY JUSTICIABLE DISPUTES, PAST,
        PRESENT OR FUTURE, BETWEEN THE PARTIES, OR BETWEEN OR AMONG YOU AND ANY
        OF KOBO EMPLOYEES, AGENTS, PARENTS, SUBSIDIARIES, AFFILIATES,
        SUCCESSORS, OR ASSIGNS, EXCLUSIVELY THROUGH FINAL AND BINDING
        ARBITRATION INSTEAD OF A COURT OR JURY TRIAL. Except as it otherwise
        applies, this Mutual Arbitration Provision is governed by the Federal
        Arbitration Act (9 U.S.C. §§ 1-16), or if the Federal Arbitration Act
        does not apply, then the arbitration law of the State of Massachusetts,
        and shall apply to any and all claims arising out of or relating to
        these Terms or Your use of the Services (including without limitation
        the scope, enforceability, validity, or conscionability of this Mutual
        Arbitration Provision) whether arising under federal, state, or local
        statutory and/or common law.
      </p>

      <h4>Notice of Disputes</h4>
      <p>
        If either Party initiates arbitration, the initiating Party must notify
        the other Party in writing via certified mail, return receipt requested,
        or hand delivery within the applicable statute of limitations period.
        This demand for arbitration must include (1) the name and address of the
        Party seeking arbitration, (2) a statement of the legal and factual
        basis of the claim, and (3) a description of the remedy sought. Any
        demand for arbitration by You must be delivered to:
      </p>

      <p>
        Kobo, Inc.
        <br />
        37 Highland Ave,
        <br />
        Cambridge MA, 02139
        <br />
        United States of America
      </p>

      <p>And Email Address: info@shopnotoolbox.org</p>

      <h4>Delegation Clause</h4>
      <p>
        Only an arbitrator, and not any federal, state, or local court or
        agency, shall have exclusive authority to resolve any dispute arising
        out of or relating to the interpretation, applicability, enforceability,
        or formation of this Mutual Arbitration Provision, including, without
        limitation, any claim that all or any part of this Mutual Arbitration
        Provision is void or voidable. An arbitrator shall also have exclusive
        authority to resolve all threshold arbitrability issues, including
        issues relating to whether these Terms are applicable, unconscionable,
        or illusory and any defense to arbitration, including, without limitation,
        waiver, delay, laches, or estoppel. However, only a court of competent
        jurisdiction, and not an arbitrator, shall have the exclusive authority
        to resolve any and all disputes arising out of or relating to the Class
        Action Waiver, including, but not limited to, any claim that all or part
        of the Class Action Waiver is unenforceable, unconscionable, illegal,
        void, or voidable. BY AGREEING TO ARBITRATION, YOU UNDERSTAND THAT YOU
        AND KOBO ARE WAIVING THE RIGHT TO SUE IN COURT OR HAVE A JURY TRIAL FOR
        ALL CLAIMS, EXCEPT AS EXPRESSLY OTHERWISE PROVIDED IN THIS MUTUAL
        ARBITRATION PROVISION. This Mutual Arbitration Provision is intended to
        require arbitration of every claim or dispute that can lawfully be
        arbitrated, except for those claims and disputes which by the terms of
        this Mutual Arbitration Provision are expressly excluded from the
        requirement to arbitrate.
      </p>

      <h4>Arbitration Procedures</h4>
      <p>
        The arbitration will be governed by the Consumer Arbitration Rules (“AAA
        Rules”) of the American Arbitration Association (“AAA”), as modified by
        these Terms, but will not be administered by the AAA. The AAA Rules are
        available online at www.adr.org or by calling the AAA at 1-800-778-7879.
        Unless You and Kobo agree otherwise, any arbitration hearings will take
        place in the county (or parish) where You are receiving Services. If the
        value of Your claim is USD $10,000 or less, we agree that You may choose
        whether the arbitration will be conducted solely on the basis of
        documents submitted to the arbitrator, by telephone, or by an in-person
        hearing. If the value of Your claim exceeds USD $10,000, the right to a
        hearing will be determined by the AAA Rules. Regardless of the manner in
        which the arbitration is conducted, the arbitrator shall issue a
        reasoned written decision sufficient to explain the essential findings
        and conclusions on which the award is based. The arbitrator may
        consider, but is not bound by, rulings in other arbitrations between
        Kobo and You. The arbitrator can award the same individualized damages
        and relief that a court can award. Judgment on the award may be entered
        by any court having jurisdiction.
      </p>

      <h4>No Class Arbitration</h4>
      <p>
        The arbitrator may award relief only in favor of the individual party
        seeking relief and only to the extent necessary to provide relief
        warranted by that party’s individual claim. TO THE FULLEST EXTENT
        PERMITTED BY APPLICABLE LAW, YOU AND KOBO AGREE THAT EACH MAY BRING
        CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY, AND
        NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED GROUP LITIGATION OR
        PRIVATE ATTORNEY GENERAL PROCEEDING. Further, unless all affected
        parties agree otherwise, the arbitrator may not consolidate more than
        one person’s claims and may not otherwise preside over any form of a
        representative or group proceeding. If a court decides that applicable
        law precludes enforcement of any of this subsection’s limitations as to
        a particular claim for relief, then that claim (and only that claim)
        must be severed from the arbitration and may be brought in court.
      </p>

      <h4>Class Action Waiver – PLEASE READ</h4>
      <p>
        YOU AND KOBO MUTUALLY AGREE THAT BY ENTERING INTO THIS MUTUAL
        ARBITRATION PROVISION, BOTH PARTIES WAIVE THEIR RIGHT TO HAVE ANY
        DISPUTE OR CLAIM BROUGHT, HEARD, OR ARBITRATED AS A CLASS ACTION OR
        COLLECTIVE ACTION, AND AN ARBITRATOR SHALL NOT HAVE ANY AUTHORITY TO
        HEAR OR ARBITRATE ANY CLASS OR COLLECTIVE ACTION (“<b
          >CLASS ACTION WAIVER</b
        >”). Notwithstanding any other clause contained in this Mutual
        Arbitration Provision or the AAA Rules, any claim in court or
        arbitration that all or part of this Class Action Waiver is
        unenforceable, unconscionable, void, or voidable may be determined only
        by the court and not by an arbitrator. In any case in which (1) the
        dispute is filed as a class or collective action and (2) there is a
        final judicial determination that all or part of the Class Action Waiver
        is unenforceable, the class and/or collective action to that extent must
        be litigated in a civil court of competent jurisdiction, but the portion
        of the Class Action Waiver that is enforceable shall be enforced in
        arbitration. Kobo may lawfully seek enforcement of this Mutual
        Arbitration Provision and the Class Action Waiver and seek dismissal of
        such class or collective actions or claims. The Class Action Waiver
        shall be severable in any case in which the dispute is filed as an
        individual action and severance is necessary to ensure that the
        individual action proceeds in arbitration.
      </p>

      <h4>Private Attorney General Action Waiver – PLEASE READ</h4>
      <p>
        THIS MUTUAL ARBITRATION PROVISION AFFECTS YOUR ABILITY TO BRING OR
        PARTICIPATE IN PRIVATE ATTORNEY GENERAL REPRESENTATIVE ACTIONS UNDER
        CALIFORNIA LAW. BOTH YOU AND KOBO AGREE TO BRING ANY DISPUTE IN
        ARBITRATION ON AN INDIVIDUAL BASIS ONLY, AND NOT ON A PRIVATE ATTORNEY
        GENERAL REPRESENTATIVE BASIS ON BEHALF OF OTHERS. THERE WILL BE NO RIGHT
        OR AUTHORITY FOR ANY DISPUTE TO BE BROUGHT, HEARD, OR ARBITRATED AS A
        PRIVATE ATTORNEY GENERAL REPRESENTATIVE ACTION OR AS A MEMBER IN ANY
        SUCH PRIVATE ATTORNEY GENERAL PROCEEDING (“<b>PRIVATE ATTORNEY GENERAL 
        WAIVER</b>”). Notwithstanding any other clause contained in this Mutual
        Arbitration Provision or the AAA Rules, any claim in court or
        arbitration that all or part of this Private Attorney General Waiver is
        unenforceable, unconscionable, void, or voidable may be determined only
        by the court and not by an arbitrator. In any case in which (1) the
        dispute is filed as a private attorney general action and (2) there is a
        final judicial determination that all or part of the Private Attorney
        General Waiver is unenforceable, the private attorney general action to
        that extent must be litigated in a civil court of competent
        jurisdiction, but the portion of the Private Attorney General Waiver
        that is enforceable shall be enforced in arbitration. Kobo may lawfully
        seek enforcement of this Mutual Arbitration Provision and the Private
        Attorney General Waiver and seek dismissal of such private attorney
        general representative actions or claims. The Private Attorney General
        Waiver shall be severable in any case in which the dispute is filed as
        an individual action and severance is necessary to ensure that the
        individual action proceeds in arbitration.
      </p>

      <h4>
        <b
          >Your Right to Opt Out of this Mutual Arbitration Provision – PLEASE
          READ</b
        >
      </h4>
      <p>
        ACCEPTANCE OF THIS MUTUAL ARBITRATION PROVISION IS NOT A MANDATORY
        CONDITION OF YOUR RELATIONSHIP WITH KOBO, AND THEREFORE YOU MAY SUBMIT A
        STATEMENT NOTIFYING KOBO THAT YOU WISH TO OPT OUT AND NOT BE SUBJECT TO
        THIS MUTUAL ARBITRATION PROVISION. In order to opt out of the Mutual
        Arbitration Provision, You must notify Kobo by sending or hand
        delivering to: Kobo, Inc. ATTN: Legal, 37 Highland Ave, Cambridge MA,
        02139, United States of America; email Address: info@shopnotoolbox.org, a
        written notice signed and dated by You stating that You are opting out
        of the Mutual Arbitration Provision. In order to be effective, Your opt
        out notice must be provided within thirty (30) days of You creating Your
        Account with Kobo or first using the Services. 
      </p>
      <p>
        Additionally, for existing users at the time these updated terms initially 
        become effective, your opt-out notice must be submitted within thirty (30) 
        days following this initial update's effective date. 
      </p>
      <p> 
        You will not be subject
        to retaliation as a consequence of a decision to opt out, and if You opt
        out You may pursue available claims and remedies in a court of law (but
        not arbitration). Should You not opt out within 30 days of creating Your
        Account with Kobo or first using the Services, continuing Your
        relationship with Kobo constitutes mutual acceptance by You and Kobo of
        the Mutual Arbitration Provision. If You opt out of the Mutual
        Arbitration Provision, You and Kobo will continue to be mutually bound
        by all other terms of these Terms. The right to opt out described in
        this paragraph applies only to the Mutual Arbitration Provision and not
        any other provision of these Terms.
      </p>

      <h4>Severability</h4>
      <p>
        Except as otherwise provided in the Mutual Arbitration Provision, in the
        event that any portion of this Mutual Arbitration Provision is deemed
        illegal or unenforceable under applicable law not preempted by the FAA,
        such provision shall be severed, and the remainder of the Mutual
        Arbitration Provision shall be given full force and effect.
      </p>

      <h4>Future Changes to this Mutual Arbitration Provision</h4>
      <p>
        If Kobo makes any changes to the Mutual Arbitration Provision of these
        Terms (other than a change to the address at which Kobo will receive
        notices of dispute, opt-out notices, or rejections of future changes to
        the Mutual Arbitration Provision), You may reject any such change by
        sending us written notice within 30 calendar days of the change to:
        info@shopnotoolbox.org. It is not necessary to send us a rejection of a
        future change to the Mutual Arbitration Provision of these Terms if You
        had properly opted out of the arbitration and group litigation waiver
        provisions in this Section 14 within the first 30 calendar days after
        You first accepted these Terms. If You have not properly opted out of
        the arbitration and group litigation waiver provisions in this Section
        14, by rejecting a future change, You are agreeing that You will
        arbitrate any dispute between us in accordance with the language of this
        arbitration provision, as modified by any changes You did not reject.
      </p>

      <h3>15. WARRANTY DISCLAIMER</h3>

      <p>
        When using the Services, information will be transmitted in such a way
        that may be beyond our control. As such, we make no warranty concerning
        the delay, failure, interruption, or corruption of any data, content,
        Feedback, or other information transmitted in connection with the use of
        the Services. WE PROVIDE THE SERVICES &quot;AS IS&quot; AND “AS
        AVAILABLE” WITHOUT ANY REPRESENTATION OR WARRANTY, EXPRESS, IMPLIED, OR
        STATUTORY. WE SPECIFICALLY DISCLAIM ANY IMPLIED WARRANTIES OF TITLE,
        MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
        WITHOUT LIMITING THE FOREGOING, WE DO NOT REPRESENT OR WARRANT THAT THE
        SERVICES WILL BE ACCESSIBLE WITHOUT INTERRUPTION OR THAT THE SERVICES,
        ANY CONTENT FROM THE SERVICES, OR THE SERVER THAT MAKES THE SERVICES
        AVAILABLE, ARE OR WILL BE FREE FROM ERRORS, DEFECTS, DESIGN FLAWS,
        OMISSIONS, VIRUSES, OR OTHER HARMFUL COMPONENTS. KOBO IS NOT RESPONSIBLE
        FOR THE DELETION OF OR FAILURE TO STORE ANY MESSAGES, OTHER
        COMMUNICATIONS, OR OTHER CONTENT MAINTAINED OR TRANSMITTED BY THE
        SERVICES, OR FOR ANY LOSS OF INFORMATION DUE TO MALFUNCTION OR
        DESTRUCTION OF DATA, SERVERS, OR OTHER CATASTROPHIC EVENTS.
      </p>

      <h3>16. LIMITATION OF LIABILITY</h3>

      <p>
        TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT WILL KOBO
        BE LIABLE, WHETHER IN CONTRACT, WARRANTY, TORT (INCLUDING NEGLIGENCE,
        WHETHER ACTIVE, PASSIVE, OR IMPUTED), PRODUCT LIABILITY, STRICT
        LIABILITY, OR OTHER THEORY, TO YOU OR ANY OTHER PERSON FOR ANY DAMAGES
        FOR LOSS OR CORRUPTION OF DATA OR PROGRAMS, DAMAGES (INCLUDING, WITHOUT
        LIMITATION, ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY,
        PUNITIVE, OR CONSEQUENTIAL DAMAGES) ARISING OUT OF OR IN CONNECTION WITH
        ANY USE OF, THE INABILITY TO USE, OR THE RESULTS OF USE OF THE SERVICES.
        SOME JURISDICTIONS PROHIBIT THE EXCLUSION OR LIMITATION OF LIABILITY FOR
        CONSEQUENTIAL OR INCIDENTAL DAMAGES, IN WHICH CASE PORTIONS OF THIS
        LIMITATION MAY NOT APPLY TO YOU. IN NO EVENT WILL WE BE LIABLE OR
        RESPONSIBLE FOR ANY ERRORS OR OMISSIONS IN THE CONTENT OF THE SERVICES,
        INCLUDING, WITHOUT LIMITATION, ERRORS IN PRICING OR AVAILABILITY OF
        SERVICES AND PRODUCTS. IN NO EVENT WILL KOBO’S TOTAL LIABILITY TO YOU
        FOR ALL DAMAGES, LOSSES, OR CAUSES OF ACTION EXCEED THE AMOUNT THAT YOU
        HAVE PAID KOBO IN THE LAST SIX (6) MONTHS. THE FORGOING LIMITATIONS OF
        LIABILITY WILL APPLY EVEN IF ANY WARRANTY FAILS OF ITS ESSENTIAL
        PURPOSE.
      </p>

      <h3>17. INDEMNIFICATION</h3>

      <p>
        You are responsible for maintaining the confidentiality of Your
        username(s), password(s), and Your Account(s), as well as all activities
        that occur under Your Account(s). You agree to indemnify, defend, and
        hold Kobo and its officers, directors, employees, agents, affiliates,
        representatives, and assigns (collectively, the “Indemnified Parties”)
        harmless from and against any and all losses, damages, liabilities, and
        costs (including settlement costs and any legal or other fees and
        expenses for investigating or defending any actions or threatened
        actions) incurred by the Indemnified Parties in connection with any
        claim arising out of any breach by You of these Terms or any claims
        arising from Your use of the Services and/or Your Account(s). You will
        use Your best efforts to cooperate with Kobo in the defense of any
        claim. Kobo reserves the right, at its own expense, to employ separate
        counsel and assume the exclusive defense and control of any matter
        otherwise subject to indemnification by You.
      </p>

      <h3>18. GOVERNING LAW; VENUE</h3>

      <p>
        These Terms of Service and any claim arising out of these Terms will be
        governed by and construed in accordance with the laws of the State of
        Massachusetts, without regard to any conflict of laws principles. You
        agree and hereby submit to the exclusive personal jurisdiction and venue
        of the state and federal courts in Boston, Massachusetts, with respect
        to such matters.
      </p>

      <h3>19. LOCAL LAWS</h3>

      <p>
        Kobo makes no representation that the Services are appropriate or
        available for use in jurisdictions outside the United States. Access to
        the Services from jurisdictions where such access is illegal is
        prohibited. If You choose to access the Services from other
        jurisdictions, You do so at Your own risk and are responsible for
        compliance with applicable local laws. The Services may be subject to
        United States export control laws and may be subject to export or import
        regulations in other countries. You agree not to export, re-export, or
        transfer, directly or indirectly, any United States technical data
        acquired from or through the Services, or any products utilizing such
        data, in violation of any United States export laws or regulations.
      </p>

      <h3>20. WAIVER AND SEVERABILITY</h3>

      <p>
        No waiver by Kobo of any term or condition set out in these Terms of
        Service will be deemed a further or continuing waiver of that term or
        condition or a waiver of any other term or condition, and any failure of
        Kobo to assert a right or provision under these Terms of Service will
        not constitute a waiver of that right or provision.
      </p>

      <p>
        If any provision of these Terms of Service is held by an arbitrator,
        court, or other tribunal of competent jurisdiction to be invalid,
        illegal, or unenforceable for any reason, then that provision will be
        eliminated or limited to the minimum extent such that the remaining
        provisions of these Terms of Service will continue in full force and
        effect.
      </p>

      <h3>21. ADDITIONAL REMEDIES</h3>

      <p>
        You acknowledge that Your conduct that is inconsistent with these Terms
        may cause Kobo irreparable damage for which remedies other than monetary
        relief may be inadequate. In such instances, You agree that we may seek
        injunctive or other equitable relief seeking to restrain such conduct
        without the necessity of proving actual harm or posting a bond.
      </p>

      <h3>22. FORCE MAJEURE</h3>

      <p>
        Kobo will not be responsible for delays or failure of performance
        resulting from acts beyond its reasonable control. Such acts shall include,
        and not be limited to, acts of God, riots, acts of war, failures of
        internet or other communication systems, power outages, terrorism,
        epidemics, pandemics, new governmental regulations issued after the
        Effective Date, flood, fire, earthquake, or other disasters.
      </p>

      <h3>23. ENTIRE AGREEMENT</h3>

      <p>
        These Terms of Service constitute the sole and entire agreement between
        You and Kobo and supersede all prior and contemporaneous understandings,
        agreements, representations, and warranties, both written and oral, to
        the extent they relate in any way to the Services.
      </p>

      <h3>24. CONTACT INFORMATION</h3>

      <p>
        For questions or concerns related to these Terms, please contact us at:
        info@shopnotoolbox.org.
      </p>
    </article>
  </div>
</div>
</main>

<footer class="root__footer">
  <div class="root__row">
    <div class="root__row-content root__row-content--wide">
      <div class="footer-nav__container">
  <nav class="footer-nav">
    <div class="footer-nav__block footer-nav__menu">
      <ul class="footer-nav-menu__row">
        <label>Organization</label>

        
          <li>
            <a href="/about-us/">About us</a>
          </li>
        
          <li>
            <a href="/about-us/meet-the-team/">Team</a>
          </li>
        
          <li>
            <a href="/join-our-team">Jobs</a>
          </li>
        
          <li>
            <a href="/about-us/financials/">Financials</a>
          </li>
        
          <li>
            <a href="/contact/">Contact</a>
          </li>
        
      </ul>

      <ul class="footer-nav-menu__row">
        <label>Software</label>

        
          <li>
            <a href="https://academy.shopnotoolbox.org/collections">Online learning</a>
          </li>
        
          <li>
            <a href="/about-us/software">About shopnotoolbox</a>
          </li>
        
          <li>
            <a href="/features">Features</a>
          </li>
        
          <li>
            <a href="/pricing">Pricing</a>
          </li>
        
          <li>
            <a href="/services/private-servers">Private servers</a>
          </li>
        
          <li>
            <a href="/services">Services</a>
          </li>
        
      </ul>

      <ul class="footer-nav-menu__row">
        <label>Community</label>

        
          <li>
            <a href="https://community.shopnotoolbox.org/">Forum</a>
          </li>
        
          <li>
            <a href="https://support.shopnotoolbox.org/">Documentation</a>
          </li>
        
          <li>
            <a href="/donate">Donate</a>
          </li>
        
      </ul>
    </div>

    <div class="footer-nav__block">
      <section class="footer-nav__newsletter">
        <h3>Stay up<br/>to date.</h3>

        <p>Subscribe to our shopnotoolbox Updates newsletter to be the first to learn about new features, resources, and user impact stories from around the world.</p>

        <section class="newsletter-form-wrapper">
  <script charset="utf-8" type="text/javascript" src="https://js.hsforms.net/forms/shell.js"></script>
  <script>
    hbspt.forms.create({
      region: "na1",
      portalId: "21396257",
      formId: "16b9634b-3ea9-4539-9ec2-b83d4125e24c"
  });
  </script>
</section>
      </section>

      <section class="footer-nav__social">
        <nav>
          
            <li>
              <a href="https://www.facebook.com/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/facebook.svg"></load-file>
              </a>
            </li>
          
            <li>
              <a href="https://twitter.com/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/twitter.svg"></load-file>
              </a>
            </li>
          
            <li>
              <a href="https://www.linkedin.com/company/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/linkedin.svg"></load-file>
              </a>
            </li>
          
            <li>
              <a href="https://github.com/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/github.svg"></load-file>
              </a>
            </li>
          
        </nav>

        <div>
          <a class="footer-nav__logo" href="/">
            <img src="/assets/images/site/shopnotoolbox-logo-borderless.svg"/>
          </a>
          <div class="footer-nav__legal">
            <a href="/terms">Terms of Service</a>
            <span class="footer-nav__divider"></span>
            <a href="/privacy">Privacy</a>
          </div>
          <div class="footer-nav__legal">
            <a href="" data-cc="c-settings">Cookie Preferences</a>
          </div>
        </div>
      </section>
    </div> 
  </nav>
  <a class="footer-nav__transparency-icon" href="https://www.guidestar.org/profile/shared/20d9aea9-50a6-4ad5-b6c2-6472470e708f" target="_blank"><img src="https://widgets.guidestar.org/TransparencySeal/9868102" /></a>
  <div class="footer-nav__copyright">Website content is licensed under a <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank">CC-BY-NC license</a>, unless noted otherwise.</div>
</div>
    </div>
  </div>
</footer>


    <script async src="https://shopnoltd.kesug.com/assets/scripts/kobo.js?2024-12-05_18-51-37"></script>
    
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-26003863-1"></script>
    <script type="text/plain" data-cookiecategory="analytics">
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-26003863-1');
    </script>
</body>
</html>


    `);
});

// Dynamic route for /privacy
app.get('/privacy', (req, res) => {
    res.send(`



<!DOCTYPE html>
<html lang="en-US">

<head>
    
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <meta http-equiv="Content-Security-Policy" content="
        default-src 'self';
        img-src 'self' https://static.fundraiseup.com *.hsforms.com https://www.google-analytics.com https://ucarecdn.com
        *.paypal.com data: https://www.paypalobjects.com https://www.gstatic.com *.guidestar.org;
        script-src 'self' 'unsafe-inline' http://js.hsforms.net *.fundraiseup.com *.googletagmanager.com https://www.google-analytics.com
        https://ssl.google-analytics.com https://js.stripe.com https://www.paypal.com https://pay.google.com;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com;
        font-src 'self' https://fonts.gstatic.com https://static.fundraiseup.com;
        connect-src 'self' https://fndrsp.net https://forms.hsforms.com https://api.fundraiseup.com https://js.stripe.com
        https://www.google-analytics.com https://fndrsp-checkout.net https://sentry.fundraiseup.com https://www.paypal.com
        https://hubspot-forms-static-embed.s3.amazonaws.com https://google.com https://pay.google.com ws:;
        frame-src 'self' https://js.stripe.com https://forms.hsforms.com https://www.paypal.com https://pay.google.com/ *.youtube.com;
    ">

    
    <title>Privacy Notice | shopnotoolbox</title>
    <meta name="description" content="shopnotoolbox is an intuitive, powerful, and reliable software used to collect, analyze, and manage data for surveys, monitoring, evaluation, and research."/>
    <base href="https://shopnoltd.kesug.com"/>
    <link rel="home" href="https://shopnoltd.kesug.com"/>

    
    <meta name="robots" content="index,follow,noodp"/>
    <meta name="googlebot" content="index,follow"/>

    
    <meta property="og:locale" content="en_US"/>
    <meta property="og:site_name" content="shopnotoolbox"/>
    <meta property="og:title" content="Privacy Notice"/>
    <meta property="og:description" content="shopnotoolbox is an intuitive, powerful, and reliable software used to collect, analyze, and manage data for surveys, monitoring, evaluation, and research."/>
    <meta property="og:url" content="https://shopnoltd.kesug.com/privacy/"/>
    <meta name="twitter:site" content="@shopnotoolbox"/>
    <meta name="twitter:description" content="shopnotoolbox is an intuitive, powerful, and reliable software used to collect, analyze, and manage data for surveys, monitoring, evaluation, and research."/>

    
    
    
        <meta property="og:type" content="website"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content="shopnotoolbox"/>
        <meta name="twitter:image" content="https://shopnoltd.kesug.com/assets/images/common/shopnotoolbox_opengraph_image.png"/>
        <meta property="og:image" content="https://shopnoltd.kesug.com/assets/images/common/shopnotoolbox_opengraph_image.png"/>
    

    
    <link href="https://shopnoltd.kesug.com/assets/styles/kobo.css?2024-12-05_18-51-37" rel="stylesheet" media="all"/>
    <link rel="icon" href="https://shopnoltd.kesug.com/favicon.png?2024-12-05_18-51-37"/>



    
    <script>
    (function(w,d,s,n,a){if(!w[n]){var l='call,catch,on,once,set,then,track'
    .split(','),i,o=function(n){return'function'==typeof n?o.l.push([arguments])&&o
    :function(){return o.l.push([n,arguments])&&o}},t=d.getElementsByTagName(s)[0],
    j=d.createElement(s);j.async=!0;j.src='https://cdn.fundraiseup.com/widget/'+a;
    t.parentNode.insertBefore(j,t);o.s=Date.now();o.v=4;o.h=w.location.href;o.l=[];
    for(i=0;i<7;i++)o[l[i]]=o(l[i]);w[n]=o}
    })(window,document,'script','FundraiseUp','ASAUFVGL');</script>
</head>


<body class="root">


<header class="root__header">
  <div class="root__row">
    <div class="root__row-content root__row-content--wide">
      <nav class="header-nav">
  <a class="header-nav__logo" href="/">
    <img src="/assets/images/common/shopnotoolbox_logo_default_for-light-bg.svg"/>
  </a>
  <a class="header-nav__mobile-logo" href="/">
    <img src="/assets/images/site/shopnotoolbox-logo-mobile.svg"/>
  </a>

  
  <input type="checkbox" id="mobile-nav-trigger">
  <label class="header-nav__mobile-nav-trigger" for="mobile-nav-trigger">
    <i></i><i></i><i></i><i></i>
  </label>

  <ul class="header-nav__menu">
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/about-us"
          >About us</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/features"
          >Features</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/services"
          >Services</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/pricing"
          >Pricing</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/blog"
          >Blog</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/help"
          >Help</a
        >
      </li>
    
  </ul>

  <ul class="header-nav__buttons">
    
    
    <li>
<a class="button button--size-m button--type-frame button--color-blue" href="/sign-up">Sign up</a>
</li>
    <li>
<a class="button button--size-m button--type-full button--color-blue" href="/donate">Donate</a>
</li>
  </ul>
</nav>

    </div>
  </div>
</header>


<div class="modal" data-modal>
  <div class="modal__box">
    <button class="modal__closer" data-modal-closer>&times;</button>
    <div class="modal__content" data-modal-content>Hello, World!</div>
  </div>
</div>


<main class="root__main" role="main"><div class="root__row">
  <div class="root__row-content">
    <article class="long-text-content">
      <h1>Privacy Notice</h1>
      <p><strong>Effective date</strong>: June 1, 2024</p>
      <h3>INTRODUCTION</h3>
      <p>
        This Privacy Notice (<b>“Notice”</b>) describes Kobo, Inc.’s
        (<b>“Kobo”</b>, <b>“we”</b>, <b>“our”</b>, or <b>“us”</b>) practices for
        collecting, using, maintaining, protecting, and disclosing your personal
        information through (i) shopnotoolbox.org, its subdomains, and any other
        website where this Notice is posted (<b>“Website”</b>); and (ii) Kobo’s
        online hosted services and any related software, application, content,
        functionality, documentation, and services (collectively, with the
        Website, the <b>“Service(s)”</b> or <b>“shopnotoolbox”</b>) offered by
        Kobo, whether as a guest or registered user.
      </p>
      <p>
        Kobo provides our Services to individuals and organizations to
        administer surveys and collect data (<b>“Users”</b>, <b>“You”</b>,
        <b>“you”</b>). Users may use shopnotoolbox to collect data, including
        personal data, from individuals who provide their data in response to
        surveys, customizable by Users (<b>“Participants”</b>). Kobo collects
        Personal Information (defined below) from Users who register for and
        access the Services. Through shopnotoolbox, Users can collect and process
        Personal Information of Participants (<b
          >“Participant Personal Information”</b
        >) for their own purposes. Therefore, unless circumstances necessitate
        otherwise, for the purposes of the European Union General Data
        Protection Regulations (<b>“GDPR”</b>) and/or United Kingdom’s Data
        Protection Act 2018 (<b>“DPA”</b>), Kobo is a controller in relation to
        the Personal Information it collects on Users and is a processor in
        relation to Personal Information it collects on behalf of Users from
        Participants. Kobo does not process Participant Personal Information for
        any purpose other than as directed by Users. If you are a Participant
        and would like to exercise your privacy rights, please contact the User
        in whose survey you are participating directly, and we will work with
        the User to address your privacy rights.
      </p>
      <p>
        Please read this Notice carefully to understand our policies and
        practices regarding your information and how we will treat it. If you do
        not agree with this Notice, your choice is not to use our Services. This
        Notice may change from time to time (see
        <a href="/privacy/#changes-to-this-notice">Changes to this Notice</a
        >). Please check the “Last Modified” date at the top of this Notice to
        ensure that you are viewing the most current version of this Notice.
      </p>
      <h3 id="personal-information">
        1. PERSONAL INFORMATION WE COLLECT ABOUT YOU, HOW WE COLLECT IT, AND HOW
        LONG WE STORE IT
      </h3>
      <p>
        When you engage with certain Services, we will collect your Personal
        Information which is information that identifies (whether directly or
        indirectly) a particular individual. Except as otherwise indicated, the
        Personal Information we collect is such that we need it to carry out the
        requested action. If you do not provide us with your Personal
        Information, we would not be able to do so. As used in this Privacy
        Notice, “Personal Information” includes “Personal Data” as defined under
        the EU data protection law.
      </p>
      <p>We collect Personal Information when you:</p>
      <ul>
        <li>
          <b>Register for an account:</b> In the course of registering for an
          account, we will collect your identifiers (first and last name,
          organization name, username, email address), industry sector, and
          country of residence. We will use this information to set up the
          Services for your use and communicate with you about the Services. We
          use HubSpot as our customer relationship management (CRM) tool for
          processing some of this data. This helps us provide user support,
          document communications, and improve our Services to you. For more
          information, please review
          <a href="https://legal.hubspot.com/privacy-policy" target="_blank"
            >HubSpot’s Privacy Policy</a
          >. If you register for a paid subscription, Stripe, our third-party
          payment processor will directly receive your identifiers (name, email
          address, billing address) and sensitive financial account information
          (payment card number, CVV, expiration date, and ZIP code) to charge
          your payment card based on the payment terms of your subscription. To
          the extent the EU or UK data protection laws apply, the legal basis
          for this processing is the performance of our contract with you. We
          retain your Personal Information for as long as your account is active
          and for no more than two years after it has become inactive. If you
          request that your account be deleted, we will remove your Personal
          Information within 30 days.
        </li>
        <li>
          <b>Fill out a contact form:</b> When you fill out a contact form, we
          will collect your identifiers (name, email address), organization
          name, country, and anything you decide to include in the “Message”
          field of the contact form. We will use this information to process
          your correspondence and respond to your message and provide you with
          additional assistance (as applicable). To the extent the EU data
          protection law applies, the legal basis for collecting this
          information is to respond to your message the performance of our
          contract with you. We retain your Personal Information for two years.
          If you have an account, we will retain your Personal Information for
          as long as your account is active and for no more than two years after
          it becomes inactive. If you request that your account be deleted, we
          will remove your Personal Information within 30 days.
        </li>
        <li>
          <b>Join our newsletter:</b> When you subscribe (opt in) to our
          newsletter, we will collect your email address. We will use this
          information to send you our periodic newsletter and information we
          feel may be of interest to you. To the extent EU or UK data protection
          laws apply, the legal basis for the processing of this information is
          your consent. You may revoke your consent at any time with effect
          going forward by clicking on the “unsubscribe” link included in the
          email. Please note that we will continue to send you notifications
          necessary to the Services or to requested products or services. Our
          communications contain tracking technologies, provided by and
          therefore shared with our third-party email marketing provider, to
          analyze whether a predefined action took place by a recipient, such as
          opening our communications, in order to better adapt and distribute
          our communications. You can disable tracking by disabling the display
          of images by default in your email program. We retain your Personal
          Information for two years. If you have an account, we will retain your
          Personal Information for as long as your account is active and for no
          more than two years after it becomes inactive. If you request that
          your account be deleted, we will remove your Personal Information
          within 30 days.
        </li>
        <li>
          <b>Donate:</b> When you donate to us, Stripe, our third-party payment
          processor, and Fundraise Up, our donation platform, will directly
          receive your identifiers (name, email address, billing address),
          whereas Stripe will also receive sensitive financial account
          information (payment card number, CVV, expiration date, ZIP code; or
          your PayPal or Google Pay authentication token from your mobile
          wallet) to process the donation payment (including transaction costs,
          if you elect to do so) and to comply with any legal obligations
          related to the donation. The use and retention of your Personal
          Information by the third-party processors is subject to their own
          privacy policies. For additional information, please see
          <a href="https://stripe.com/privacy" target="_blank"
            >Stripe’s Privacy Policy</a
          >,
          <a href="https://fundraiseup.com/privacy/" target="_blank"
            >Fundraise Up’s Privacy Policy</a
          >,
          <a
            href="https://www.paypal.com/us/legalhub/privacy-full"
            target="_blank"
            >PayPal’s Privacy Policy</a
          >
          and
          <a
            href="https://support.google.com/googlepay/answer/9039712"
            target="_blank"
            >Google Pay’s Privacy Policy</a
          >. We will email you a receipt of the donation for your records. To
          the extent the EU or UK data protection laws apply, the legal basis
          for this processing is that it is necessary for the performance of our
          contract with you. We only receive the donation from our payment
          processor and a record of the donation, and do not maintain your
          sensitive financial account information unless you choose to make a
          recurring donation. If you choose to make a recurring donation and
          agree to the storage of your payment information, our third-party
          payment processor will store your sensitive financial account
          information for future donations. To the extent the EU or UK data
          protection laws apply, the legal basis for this processing is your
          consent. You can revoke your consent to this processing and cancel
          recurring donations as set forth in our Terms of Service. We retain
          your Personal Information for two years. If you have an account, we
          will retain your Personal Information for as long as your account is
          active and for no more than two years after it becomes inactive. If
          you request that your account be deleted, we will remove your Personal
          Information within 30 days.
        </li>
        <li>
          <b>Participate in a video conference:</b> When you participate in a
          video conference with us through our third-party video conference
          provider, we will collect your physical appearance (if your camera is
          turned on) and auditory information (the sound of your voice) during
          the video conference. We use this information to conduct the video
          conference. We do not record the calls or retain your contact
          information without explicitly obtaining your consent. To the extent
          EU or UK data protection laws apply, the legal basis for collecting
          this information is that it is necessary for the performance of our
          contract with you to answer your queries as presented on the call.
        </li>
        <li>
          <b>Attend an event:</b> When you sign up to attend an event, we will
          collect your event registration information (name and email address).
          We will use this information to plan for the event, communicate with
          you about the event, and allow you into the event. To the extent the
          EU or UK data protection laws apply, the legal basis for collecting
          your information is to facilitate your attendance at the event. If you
          do not provide this information, you would not be able to participate
          in the event. We retain your Personal Information for two years. If
          you have an account, we will retain your Personal Information for as
          long as your account is active and for no more than two years after it
          becomes inactive.
        </li>
        <li id="user-contributions">
          <b>User Contributions:</b> When you interact with parts of our
          Services, such as by posting a message on our Community Forum
          (collectively, <b>“User Contributions”</b>), we will collect your
          identifiers (name and email address) and any information that you
          include in your message. Your messages may be published or displayed
          on public areas of the Services or transmitted to other Users of the
          Services or third parties. If at any time you want your User
          Contribution to the Community Forum deleted, you can delete your
          message directly on the forum. To the extent EU or UK data protection
          laws apply, the legal basis for this processing is your consent. You
          can revoke your consent at any time with effect moving forward by
          emailing us at
          <a href="mailto:info@shopnotoolbox.org">info@shopnotoolbox.org</a>. We
          retain your Personal Information for two years. If you have an account
          on the Community Forum, we will retain your Personal Information for
          as long as your account on the Community Forum is active and for no
          more than two years after it becomes inactive.
        </li>
        <li>
          <p>
            <b>Interact with the Services:</b> In addition to the Personal
            Information you provide directly to us, we also collect information
            from you automatically as you use our Services via “cookies”,
            pixels, and similar tracking technologies. To the extent the EU or
            UK data protection laws apply to the placement of cookies on our
            Website, the legal basis for this processing is your consent. You
            may withdraw your consent at any time with effect moving forward by
            managing your Cookie Preferences on our Website. To the extent the
            EU or UK data protection laws apply, the legal basis for the
            placement and access of strictly necessary cookies is the
            performance of a contract. These cookies are essential for providing
            the functionalities of our Services.
          </p>
          <p>
            Particular third-party cookies used in our Services include Stripe,
            Google Analytics, Fundraise Up, and HubSpot. In general, you can
            disable cookies by setting your browser to refuse cookies or to
            indicate when a cookie is being sent. Please note, if you opt out of
            these targeted cookies, your opt out will be specific to the web
            browser, application, or device from which you accessed the opt out.
            If you use multiple devices or web browsers, you will need to opt
            out of each browser or device that you use. You can generally opt
            out of receiving personalized ads from third-party advertisers and
            ad networks who are members of the Network Advertising Initiative
            (NAI) or who follow the Digital Advertising Alliance’s
            Self-Regulatory Principles for Online Behavioral Advertising (DAA)
            by visiting the opt-out pages on the
            <a href="http://optout.networkadvertising.org" target="_blank"
              >NAI website</a
            >
            and
            <a href="http://www.aboutads.info/choices/" target="_blank"
              >DAA website</a
            >.
          </p>
          <ul>
            <li>
              <b>Stripe:</b> We use Stripe to process payments for paid
              subscriptions and for processing donations. When you initiate a
              payment, Stripe may install cookies on your browser or read
              cookies that are already present to help authenticate your
              identity and provide you with a seamless payment process. To learn
              more about how Stripe uses and shares information, visit
              <a href="https://stripe.com/privacy" target="_blank"
                >Stripe's Privacy Policy</a
              >. For further details on how you can manage your privacy choices,
              please see
              <a href="/privacy/#your-information-choices"
                >YOUR INFORMATION CHOICES</a
              >
              below.
            </li>
            <li>
              <b>Google Analytics:</b> We use Google Analytics to collect
              information on your use of the Services for the purpose of
              improving the Services. To collect this information, Google
              Analytics installs cookies on your browser or reads cookies that
              are already on your browser. Google Analytics also receives
              information about you from applications that you have downloaded
              that partner with Google. We do not combine the information
              collected through the use of Google Analytics with Personal
              Information. To learn more about Google’s ability to use and share
              information collected by Google Analytics about your visits to our
              Website or to another application which partners with Google,
              visit their
              <a
                href="https://policies.google.com/technologies/partner-sites"
                target="_blank"
                >Privacy & Terms page</a
              >. To prevent your data from being used by Google Analytics, you
              can download the Google Analytics opt-out browser add-on, which
              can be accessed
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank"
                >here</a
              >. To revoke your consent to our use of Google Analytics cookies,
              please manage your Cookie Preferences on our Website. To learn
              more about your privacy choices, please see
              <a href="/privacy/#your-information-choices"
                >YOUR INFORMATION CHOICES</a
              >
              below.
            </li>
            <li>
              <b>Fundraise Up:</b> We use Fundraise Up as a third-party online
              donation platform on our Website to collect donations and to
              analyze your behavior while using our Website as it relates to
              donations. For more information, please see
              <a href="https://fundraiseup.com/privacy/" target="_blank"
                >Fundraise Up’s Privacy Policy</a
              >. To revoke your consent to our use of Fundraise Up cookies and
              trackers, please manage your Cookie Preferences on our Website. To
              learn more about your privacy choices, please see
              <a href="/privacy/#your-information-choices"
                >YOUR INFORMATION CHOICES</a
              >
              below.
            </li>
            <li>
              <b>HubSpot:</b> We use HubSpot to analyze the data traffic on our
              Website and your behavior while using our Website. We use this
              information to gain valuable insights into user behavior on our
              Website for the purpose of improving our Website. We also use
              HubSpot’s conversion tracking to analyze whether a predefined
              action took place by an email recipient, such as opening our
              email, in order to better adapt and distribute our emails. For
              more information, please review
              <a href="https://legal.hubspot.com/privacy-policy" target="_blank"
                >HubSpot's Privacy Policy</a
              >. To revoke your consent to our use of HubSpot cookies, please
              manage your Cookie Preferences on our Website. To learn more about
              your privacy choices, please see
              <a href="/privacy/#your-information-choices"
                >YOUR INFORMATION CHOICES</a
              >
              below.
            </li>
          </ul>
        </li>
      </ul>
      <h3>2. HOW WE SHARE YOUR PERSONAL INFORMATION</h3>
      <p>Kobo shares Personal Information in the following instances:</p>
      <ul>
        <li>
          <b>Within Kobo:</b> Where necessary, Kobo will share your Personal
          Information within Kobo to efficiently carry out and improve our
          business and to the extent permitted by law. To the extent the EU or
          UK data protection laws apply, the legal basis for this sharing is our
          legitimate interest in carrying out our business operations
          efficiently.
        </li>
        <li>
          <b>With other Users:</b> Other Users may have access to information
          that you publish or post on public areas of the Services — see
          <a href="/privacy/#user-contributions">User Contributions</a>. This
          may also include any Personal Information you choose to include when
          making a survey project or form library content (such as Public
          Collections) public in your account.
        </li>
        <li>
          <b>With service providers:</b> We use third parties (for example, web
          hosting services) to provide, protect, or improve our Services on our
          behalf and as necessary to fulfill our contract with you. These third
          parties may only access your Personal Information when absolutely
          necessary in order to perform these tasks on our behalf. We share the
          following information with third-party service providers: (i)
          identifiers (name, payment card number, CVV, expiration date, ZIP
          code) with our payment processor to process payments; (ii) identifiers
          (name, email address, telephone number) with our CRM to assist with
          customer relationships; (iii) identifiers (name, email address) with
          our email marketing provider to facilitate promotional email messages;
          (iv) identifiers (name, address, email address, telephone number) and
          sensitive financial account information (bank account details, credit
          card number, expiration date, CVV, and ZIP code) with our third-party
          donation platform and payment processor to process your donation; and
          (v) your physical appearance and auditory information (the sound of
          your voice) with our video conference provider to facilitate the video
          conference meeting with you. Please contact us if you require detailed
          information about our third-party processors.
        </li>
        <li>
          <b>In the event of a corporate reorganization:</b> In the event that
          we enter into or intend to enter into a transaction that alters the
          structure of our business, such as a reorganization, merger,
          acquisition, sale, joint venture, assignment, consolidation, transfer,
          change of control, or other disposition of all or any portion of our
          business, assets, or stock, we would share Personal Information with
          third parties, including the buyer or target (and their agents and
          advisors) for the purpose of facilitating and completing the
          transaction. We will also share Personal Information with third
          parties if we undergo bankruptcy or liquidation, in the course of such
          proceedings. To the extent the EU or UK data protection laws apply,
          the legal basis for sharing this information is our legitimate
          interest in carrying out our business operations or your consent in
          cases where consent is required for sharing the information.
        </li>
        <li>
          <b>For legal purposes:</b> We share your Personal Information where we
          are legally required to do so, such as in response to court orders,
          subpoenas, governmental/regulatory bodies, law enforcement, or legal
          process, including for national security purposes. We may share your
          information with our legal advisors or auditors to: (i) establish,
          protect, or exercise our legal rights; (ii) as required to enforce our
          Terms of Service or other contracts; or (iii) defend against legal
          claims or demands. We also share this information with third parties
          as necessary to: (i) detect, investigate, prevent, or take action
          against illegal activities, fraud, or situations involving potential
          threats to the rights, property, or personal safety of any person;
          (ii) comply with the requirements of any applicable law; or (iii)
          comply with our legal obligations. To the extent EU or UK data
          protection laws apply, the legal basis is compliance with EU law or
          our legitimate interest to comply with other laws that apply to us.
        </li>
        <li>
          <b>With your consent:</b> Apart from the reasons identified above, we
          may request your permission to share your Personal Information for a
          specific purpose. We will notify you and request consent before you
          provide the Personal Information or before the Personal Information
          you have already provided is shared for such purpose. You can revoke
          your consent at any time with effect moving forward by emailing us at
          <a href="mailto:info@shopnotoolbox.org">info@shopnotoolbox.org</a>.
        </li>
      </ul>
      <h3 id="your-information-choices">3. YOUR INFORMATION CHOICES</h3>
      <p>
        You have the following choices with respect to your Personal
        Information:
      </p>
      <ul>
        <li>
          <b>Correct or view your information.</b> You may email us at
          <a href="mailto:info@shopnotoolbox.org">info@shopnotoolbox.org</a> to
          correct or view any Personal Information of yours in our possession.
        </li>
        <li>
          <b>Opt out of Google Analytics.</b> To prevent your data from being
          used by Google Analytics, you can download the Google Analytics
          opt-out browser add-on, which can be accessed
          <a href="https://tools.google.com/dlpage/gaoptout">here</a>.
        </li>
        <li>
          <b>Opt out of other cookies.</b> All session cookies are temporary and
          expire after you close your web browser. Persistent cookies can be
          removed by following your web browser’s directions. In general, you
          can disable cookies and limit the collection and use of information
          through them by setting your browser to refuse cookies or to indicate
          when a cookie is being sent. For information about how to see the
          cookies that have been placed on your computer or device and how to
          reject and delete the cookies, please visit:
          <a href="https://www.aboutcookies.org/"
            >https://www.aboutcookies.org/</a
          >. Please note that each web browser is different. To find information
          relating to your browser, visit the browser developer’s website and
          mobile application. If you configure your web browser to block all
          cookies or to alert you when a cookie is being sent, some features of
          our Services may not function properly. If you choose to opt out, we
          will place an opt-out cookie on your device. The opt-out cookie is
          browser specific and device specific and only lasts until cookies are
          cleared from your browser or device. The opt-out cookie will not work
          for essential cookies. If the opt-out cookie is removed or deleted, if
          you upgrade your browser, or if you visit us from a different device,
          you will need to return and update your preferences. By clicking on
          the opt-out links below, you will be directed to the respective
          third-party website where your device will be scanned to determine who
          maintains cookies on your device. At that time, you can choose to opt
          out of all targeted advertising, or you can choose to opt out of
          specific targeted advertising by selecting individual companies who
          maintain a cookie on your device.
        </li>
        <br />
        <ul>
          <li>
            Association of National Advertisers opt-out registration:
            <br />
            <a href="https://dmachoice.thedma.org/"
              >https://dmachoice.thedma.org/</a
            >
          </li>
          <li>
            Network Advertising Initiative (NAI) Opt-Out:
            <br />
            <a href="https://www.networkadvertising.org/managing/opt_out.asp"
              >https://www.networkadvertising.org/managing/opt_out.asp</a
            >
          </li>
          <li>
            Digital Advertising Alliance (DAA) Opt-Out:
            <br />
            <a href="https://optout.aboutads.info"
              >https://optout.aboutads.info</a
            >
          </li>
          <li>
            European Union (EU) / European Economic Area (EEA) Opt-Out:
            <br />
            <a href="http://www.youronlinechoices.eu"
              >http://www.youronlinechoices.eu</a
            >
          </li>
        </ul>
        <br />
        <li>
          <b>Opt out of email tracking.</b> You can disable email tracking by
          disabling the display of images by default in your email program.
        </li>
        <li>
          <b>Opt out of marketing communications.</b> You may opt out of
          receiving marketing emails from us by clicking the “Unsubscribe” link
          provided at the bottom of each email we send. Please note that we will
          continue to send you notifications necessary to the Services, your
          account, purchases, or any assistance you request.
        </li>
      </ul>
      <h3>4. YOUR RIGHTS REGARDING YOUR INFORMATION</h3>
      <p>
        Below are the rights of Users with respect to the Personal Information
        we collect. Users can exercise these rights by making updates in their
        Account settings or contacting us at
        <a href="mailto:info@shopnotoolbox.org">info@shopnotoolbox.org</a>. To
        exercise their rights, Participants should contact the User in whose
        survey they are participating, and we will work with the User to address
        these rights.
      </p>
      <ul>
        <li>
          <b>Right to access:</b> You have the right to ask us for access to the
          Personal Information we have collected from you. You can request a
          copy of your data by emailing us at
          <a href="mailto:info@shopnotoolbox.org">info@shopnotoolbox.org</a> or by
          signing into your user account and visiting your user profile setting.
        </li>
        <li>
          <b>Right to rectification:</b> You have the right to ask us to rectify
          Personal Information you think is inaccurate. You also have the right
          to ask us to complete information you think is incomplete. As a user,
          you can also correct information we have about you by signing into
          your account and visiting your user profile setting.
        </li>
        <li>
          <b>Right to erasure:</b> You have the right to request the erasure of
          any Personal Information that we are not obligated to retain or
          continue processing (also known as the right to be forgotten). For
          example, you can request that we delete your Personal Information if:
          (i) we no longer need the data for the purpose it was collected for,
          (ii) we process the data based on your consent and you revoke your
          consent, (iii) you object to our processing based on legitimate
          interest (and we do not have an overriding legitimate interest), or
          (iv) you object to our processing for direct marketing purposes. We
          may not be able to immediately erase your Personal Information if we
          have a lawful reason or a legal or contractual obligation to retain
          the Personal Information or continue the processing. We will use
          reasonable efforts to honor your requests for deletion; however,
          certain residual information may actively persist on the Services even
          if you close your account. Your Personal Information may remain in our
          archives, and information you update or delete, or information within
          a closed account, may persist internally for our administrative
          purposes, to the extent permitted by law.
        </li>
      </ul>
      <h3>5. RIGHTS OF INDIVIDUALS IN THE EUROPEAN UNION AND UNITED KINGDOM</h3>
      <p>
        Individuals in the EU and UK are entitled certain rights to their
        Personal Information under applicable law. To the extent these laws
        apply to our processing of your Personal Information, you are entitled
        to the following rights:
      </p>
      <ul>
        <li>
          <b>Right to restrict processing:</b> If you believe that your Personal
          Information is inaccurate, that our processing is unlawful, or that we
          do not need your Personal Information for a specific purpose, you have
          the right to request that we restrict the processing of this Personal
          Information. You also have the option to request that we stop
          processing your Personal Information while we assess your request. If
          you object to our processing (per your right to object as described
          below), you may also request that we restrict processing of your
          Personal Information while we make our assessment.
        </li>
        <li>
          <b>Right to object to processing:</b> You have the right to object to
          processing of your Personal Information which is based on our
          legitimate interest (Article 6(1)(f) GDPR), by referencing your
          personal circumstances that makes you want to object to the processing
          on this ground.
        </li>
        <li>
          <b>Right to data portability:</b> You have the right to ask that we
          transfer your Personal Information to another organization or that we
          transfer it to you. However, this right only applies when: (i) you
          have provided your Personal Information to us, (ii) the legal basis
          for the processing is your consent or for the performance of a
          contract, and (iii) the processing is carried out by automated means.
        </li>
      </ul>
      <p>
        To exercise your rights, or for more information on how to exercise your
        rights, please contact us at
        <a href="mailto:info@shopnotoolbox.org">info@shopnotoolbox.org</a>.
      </p>
      <h3>6. CHILDREN’S PRIVACY</h3>
      <p>
        The Services are general audience and intended for Users eighteen (18)
        years old and older. We do not knowingly collect Personal Information
        from anyone under the age of 18.
      </p>
      <h3>7. INTERNATIONAL JURISDICTIONS</h3>
      <p>
        Our Services are hosted and offered in the United States of America (US)
        and are subject to US federal, state, and local laws which allow
        government agencies to access Personal Information under certain
        circumstances. To conduct the collection and transfer of Personal
        Information (both from our Users to us and from us to our service
        providers), we have executed standard contractual clauses (“SCCs”) which
        have been approved by the European Commission. Please see the
        <a
          href="/assets/files/dpa/Controller_to_Processor_SCC.pdf"
          target="_blank"
          >Controller to Processor</a
        >
        and
        <a
          href="/assets/files/dpa/Processor_to_Processor_SCC.pdf"
          target="_blank"
          >Processor to Processor SCCs</a
        >
        for more information.
      </p>
      <h3>8. DO NOT TRACK</h3>
      <p>
        We do not respond to Do Not Track requests. Do Not Track is a preference
        you can set in your web browser to inform websites and mobile
        applications that you do not want to be tracked. You can enable or
        disable Do Not Track by visiting the Preferences or Settings page of
        your web browser.
      </p>
      <h3>9. INFORMATION SECURITY</h3>
      <p>
        Kobo implements and maintains robust security measures to protect the
        Personal Information that we collect and retain, as described on
        <a
          href="https://shopnoltd.kesug.com/features/data-security/"
          target="_blank"
          >this page</a
        >
        . These include, but are not limited to, access controls and encryption
        designed to guard against unauthorized access and ensure data
        confidentiality. We have stringent contractual relationships with anyone
        with whom we share information, requiring them to adhere strictly to the
        same standards set by EU and UK data protection laws, as well as other
        relevant regulations. We are committed to both the letter and the spirit
        of these laws, ensuring that your Personal Information is treated with
        the highest level of care and security.
      </p>
      <h3>10. DATA RETENTION</h3>
      <p>
        In addition to the data retention periods outlined in
        <a href="/privacy/#personal-information"
          >PERSONAL INFORMATION WE COLLECT ABOUT YOU, HOW WE COLLECT IT, AND HOW
          LONG WE STORE IT</a
        >, Kobo will retain your Personal Information until: (i) it is no longer
        needed for the purpose it was collected for, or (ii) we delete your
        information pursuant to your request, or (iii) for longer periods for
        the specific purposes identified below:
      </p>
      <ul>
        <li>
          <b>To exercise or defend legal claims:</b> When your Personal
          Information is relevant to a legal claim or dispute involving Kobo, we
          retain that information during the pendency of that claim or dispute
          and for up to one (1) year after.
        </li>
        <li>
          <b>Compliance with our regulatory or legal obligations:</b> We may
          need to retain certain information for longer periods to comply with
          legal requirements. For example, we need to retain information related
          to your purchase of our Services for specific periods for tax and
          accounting purposes. We also need to keep a record of your
          Participants’ rights requests pursuant to regulatory requirements.
        </li>
      </ul>
      <h3 id="changes-to-this-notice">11. CHANGES TO THIS NOTICE</h3>
      <p>
        We may amend this Privacy Notice in our sole discretion at any time. If
        we do, we will post the changes to this page and will indicate the date
        the changes take effect. We encourage you to review our Privacy Notice
        to stay informed. If we make changes that materially affect your privacy
        rights, we will notify you by prominent posting on the Website and/or
        via email, and we will obtain your consent, if required.
      </p>
      <h3>12. HOW TO CONTACT KOBO</h3>
      <p>
        Kobo welcomes your questions or comments regarding this Privacy Notice.
        Please contact us at:
      </p>
      <p>
        Kobo, Inc.<br />
        37 Highland Ave<br />
        Cambridge MA, 02139<br />
        United States<br />
        Email Address:
        <a href="mailto:info@shopnotoolbox.org">info@shopnotoolbox.org</a>
      </p>
    </article>
  </div>
</div>
</main>

<footer class="root__footer">
  <div class="root__row">
    <div class="root__row-content root__row-content--wide">
      <div class="footer-nav__container">
  <nav class="footer-nav">
    <div class="footer-nav__block footer-nav__menu">
      <ul class="footer-nav-menu__row">
        <label>Organization</label>

        
          <li>
            <a href="/about-us/">About us</a>
          </li>
        
          <li>
            <a href="/about-us/meet-the-team/">Team</a>
          </li>
        
          <li>
            <a href="/join-our-team">Jobs</a>
          </li>
        
          <li>
            <a href="/about-us/financials/">Financials</a>
          </li>
        
          <li>
            <a href="/contact/">Contact</a>
          </li>
        
      </ul>

      <ul class="footer-nav-menu__row">
        <label>Software</label>

        
          <li>
            <a href="https://academy.shopnotoolbox.org/collections">Online learning</a>
          </li>
        
          <li>
            <a href="/about-us/software">About shopnotoolbox</a>
          </li>
        
          <li>
            <a href="/features">Features</a>
          </li>
        
          <li>
            <a href="/pricing">Pricing</a>
          </li>
        
          <li>
            <a href="/services/private-servers">Private servers</a>
          </li>
        
          <li>
            <a href="/services">Services</a>
          </li>
        
      </ul>

      <ul class="footer-nav-menu__row">
        <label>Community</label>

        
          <li>
            <a href="https://community.shopnotoolbox.org/">Forum</a>
          </li>
        
          <li>
            <a href="https://support.shopnotoolbox.org/">Documentation</a>
          </li>
        
          <li>
            <a href="/donate">Donate</a>
          </li>
        
      </ul>
    </div>

    <div class="footer-nav__block">
      <section class="footer-nav__newsletter">
        <h3>Stay up<br/>to date.</h3>

        <p>Subscribe to our shopnotoolbox Updates newsletter to be the first to learn about new features, resources, and user impact stories from around the world.</p>

        <section class="newsletter-form-wrapper">
  <script charset="utf-8" type="text/javascript" src="https://js.hsforms.net/forms/shell.js"></script>
  <script>
    hbspt.forms.create({
      region: "na1",
      portalId: "21396257",
      formId: "16b9634b-3ea9-4539-9ec2-b83d4125e24c"
  });
  </script>
</section>
      </section>

      <section class="footer-nav__social">
        <nav>
          
            <li>
              <a href="https://www.facebook.com/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/facebook.svg"></load-file>
              </a>
            </li>
          
            <li>
              <a href="https://twitter.com/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/twitter.svg"></load-file>
              </a>
            </li>
          
            <li>
              <a href="https://www.linkedin.com/company/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/linkedin.svg"></load-file>
              </a>
            </li>
          
            <li>
              <a href="https://github.com/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/github.svg"></load-file>
              </a>
            </li>
          
        </nav>

        <div>
          <a class="footer-nav__logo" href="/">
            <img src="/assets/images/site/shopnotoolbox-logo-borderless.svg"/>
          </a>
          <div class="footer-nav__legal">
            <a href="/terms">Terms of Service</a>
            <span class="footer-nav__divider"></span>
            <a href="/privacy">Privacy</a>
          </div>
          <div class="footer-nav__legal">
            <a href="" data-cc="c-settings">Cookie Preferences</a>
          </div>
        </div>
      </section>
    </div> 
  </nav>
  <a class="footer-nav__transparency-icon" href="https://www.guidestar.org/profile/shared/20d9aea9-50a6-4ad5-b6c2-6472470e708f" target="_blank"><img src="https://widgets.guidestar.org/TransparencySeal/9868102" /></a>
  <div class="footer-nav__copyright">Website content is licensed under a <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank">CC-BY-NC license</a>, unless noted otherwise.</div>
</div>
    </div>
  </div>
</footer>


    <script async src="https://shopnoltd.kesug.com/assets/scripts/kobo.js?2024-12-05_18-51-37"></script>
    
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-26003863-1"></script>
    <script type="text/plain" data-cookiecategory="analytics">
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-26003863-1');
    </script>
</body>
</html>


    `);
});

// Dynamic route for /contact
app.get('/contact', (req, res) => {
    res.send(`



<!DOCTYPE html>
<html lang="en-US">

<head>
    
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <meta http-equiv="Content-Security-Policy" content="
        default-src 'self';
        img-src 'self' https://static.fundraiseup.com *.hsforms.com https://www.google-analytics.com https://ucarecdn.com
        *.paypal.com data: https://www.paypalobjects.com https://www.gstatic.com *.guidestar.org;
        script-src 'self' 'unsafe-inline' http://js.hsforms.net *.fundraiseup.com *.googletagmanager.com https://www.google-analytics.com
        https://ssl.google-analytics.com https://js.stripe.com https://www.paypal.com https://pay.google.com;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com;
        font-src 'self' https://fonts.gstatic.com https://static.fundraiseup.com;
        connect-src 'self' https://fndrsp.net https://forms.hsforms.com https://api.fundraiseup.com https://js.stripe.com
        https://www.google-analytics.com https://fndrsp-checkout.net https://sentry.fundraiseup.com https://www.paypal.com
        https://hubspot-forms-static-embed.s3.amazonaws.com https://google.com https://pay.google.com ws:;
        frame-src 'self' https://js.stripe.com https://forms.hsforms.com https://www.paypal.com https://pay.google.com/ *.youtube.com;
    ">

    
    <title>Contact | shopnotoolbox</title>
    <meta name="description" content="shopnotoolbox is an intuitive, powerful, and reliable software used to collect, analyze, and manage data for surveys, monitoring, evaluation, and research."/>
    <base href="https://shopnoltd.kesug.com"/>
    <link rel="home" href="https://shopnoltd.kesug.com"/>

    
    <meta name="robots" content="index,follow,noodp"/>
    <meta name="googlebot" content="index,follow"/>

    
    <meta property="og:locale" content="en_US"/>
    <meta property="og:site_name" content="shopnotoolbox"/>
    <meta property="og:title" content="Contact"/>
    <meta property="og:description" content="shopnotoolbox is an intuitive, powerful, and reliable software used to collect, analyze, and manage data for surveys, monitoring, evaluation, and research."/>
    <meta property="og:url" content="https://shopnoltd.kesug.com/contact/"/>
    <meta name="twitter:site" content="@shopnotoolbox"/>
    <meta name="twitter:description" content="shopnotoolbox is an intuitive, powerful, and reliable software used to collect, analyze, and manage data for surveys, monitoring, evaluation, and research."/>

    
    
    
        <meta property="og:type" content="website"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content="shopnotoolbox"/>
        <meta name="twitter:image" content="https://shopnoltd.kesug.com/assets/images/common/shopnotoolbox_opengraph_image.png"/>
        <meta property="og:image" content="https://shopnoltd.kesug.com/assets/images/common/shopnotoolbox_opengraph_image.png"/>
    

    
    <link href="https://shopnoltd.kesug.com/assets/styles/kobo.css?2024-12-05_18-51-37" rel="stylesheet" media="all"/>
    <link rel="icon" href="https://shopnoltd.kesug.com/favicon.png?2024-12-05_18-51-37"/>



    
    <script>
    (function(w,d,s,n,a){if(!w[n]){var l='call,catch,on,once,set,then,track'
    .split(','),i,o=function(n){return'function'==typeof n?o.l.push([arguments])&&o
    :function(){return o.l.push([n,arguments])&&o}},t=d.getElementsByTagName(s)[0],
    j=d.createElement(s);j.async=!0;j.src='https://cdn.fundraiseup.com/widget/'+a;
    t.parentNode.insertBefore(j,t);o.s=Date.now();o.v=4;o.h=w.location.href;o.l=[];
    for(i=0;i<7;i++)o[l[i]]=o(l[i]);w[n]=o}
    })(window,document,'script','FundraiseUp','ASAUFVGL');</script>
</head>


<body class="root">


<header class="root__header">
  <div class="root__row">
    <div class="root__row-content root__row-content--wide">
      <nav class="header-nav">
  <a class="header-nav__logo" href="/">
    <img src="/assets/images/common/shopnotoolbox_logo_default_for-light-bg.svg"/>
  </a>
  <a class="header-nav__mobile-logo" href="/">
    <img src="/assets/images/site/shopnotoolbox-logo-mobile.svg"/>
  </a>

  
  <input type="checkbox" id="mobile-nav-trigger">
  <label class="header-nav__mobile-nav-trigger" for="mobile-nav-trigger">
    <i></i><i></i><i></i><i></i>
  </label>

  <ul class="header-nav__menu">
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/about-us"
          >About us</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/features"
          >Features</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/services"
          >Services</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/pricing"
          >Pricing</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/blog"
          >Blog</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/help"
          >Help</a
        >
      </li>
    
  </ul>

  <ul class="header-nav__buttons">
    
    
    <li>
<a class="button button--size-m button--type-frame button--color-blue" href="/sign-up">Sign up</a>
</li>
    <li>
<a class="button button--size-m button--type-full button--color-blue" href="/donate">Donate</a>
</li>
  </ul>
</nav>

    </div>
  </div>
</header>


<div class="modal" data-modal>
  <div class="modal__box">
    <button class="modal__closer" data-modal-closer>&times;</button>
    <div class="modal__content" data-modal-content>Hello, World!</div>
  </div>
</div>


<main class="root__main" role="main"><div class="root__row">
  <div class="root__row-content">
    <section class="long-text-content">
      <h1>Contact</h1>

      <section class="contact-form-wrapper">
  <script charset="utf-8" type="text/javascript" src="https://js.hsforms.net/forms/shell.js"></script>
  <script>
    hbspt.forms.create({
      region: "na1",
      portalId: "21396257",
      formId: "27294478-9f82-478a-85d5-514dd846a0db"
    });
  </script>
</section>
    </section>
  </div>
</div>

</main>

<footer class="root__footer">
  <div class="root__row">
    <div class="root__row-content root__row-content--wide">
      <div class="footer-nav__container">
  <nav class="footer-nav">
    <div class="footer-nav__block footer-nav__menu">
      <ul class="footer-nav-menu__row">
        <label>Organization</label>

        
          <li>
            <a href="/about-us/">About us</a>
          </li>
        
          <li>
            <a href="/about-us/meet-the-team/">Team</a>
          </li>
        
          <li>
            <a href="/join-our-team">Jobs</a>
          </li>
        
          <li>
            <a href="/about-us/financials/">Financials</a>
          </li>
        
          <li>
            <a href="/contact/">Contact</a>
          </li>
        
      </ul>

      <ul class="footer-nav-menu__row">
        <label>Software</label>

        
          <li>
            <a href="https://academy.shopnotoolbox.org/collections">Online learning</a>
          </li>
        
          <li>
            <a href="/about-us/software">About shopnotoolbox</a>
          </li>
        
          <li>
            <a href="/features">Features</a>
          </li>
        
          <li>
            <a href="/pricing">Pricing</a>
          </li>
        
          <li>
            <a href="/services/private-servers">Private servers</a>
          </li>
        
          <li>
            <a href="/services">Services</a>
          </li>
        
      </ul>

      <ul class="footer-nav-menu__row">
        <label>Community</label>

        
          <li>
            <a href="https://community.shopnotoolbox.org/">Forum</a>
          </li>
        
          <li>
            <a href="https://support.shopnotoolbox.org/">Documentation</a>
          </li>
        
          <li>
            <a href="/donate">Donate</a>
          </li>
        
      </ul>
    </div>

    <div class="footer-nav__block">
      <section class="footer-nav__newsletter">
        <h3>Stay up<br/>to date.</h3>

        <p>Subscribe to our shopnotoolbox Updates newsletter to be the first to learn about new features, resources, and user impact stories from around the world.</p>

        <section class="newsletter-form-wrapper">
  <script charset="utf-8" type="text/javascript" src="https://js.hsforms.net/forms/shell.js"></script>
  <script>
    hbspt.forms.create({
      region: "na1",
      portalId: "21396257",
      formId: "16b9634b-3ea9-4539-9ec2-b83d4125e24c"
  });
  </script>
</section>
      </section>

      <section class="footer-nav__social">
        <nav>
          
            <li>
              <a href="https://www.facebook.com/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/facebook.svg"></load-file>
              </a>
            </li>
          
            <li>
              <a href="https://twitter.com/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/twitter.svg"></load-file>
              </a>
            </li>
          
            <li>
              <a href="https://www.linkedin.com/company/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/linkedin.svg"></load-file>
              </a>
            </li>
          
            <li>
              <a href="https://github.com/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/github.svg"></load-file>
              </a>
            </li>
          
        </nav>

        <div>
          <a class="footer-nav__logo" href="/">
            <img src="/assets/images/site/shopnotoolbox-logo-borderless.svg"/>
          </a>
          <div class="footer-nav__legal">
            <a href="/terms">Terms of Service</a>
            <span class="footer-nav__divider"></span>
            <a href="/privacy">Privacy</a>
          </div>
          <div class="footer-nav__legal">
            <a href="" data-cc="c-settings">Cookie Preferences</a>
          </div>
        </div>
      </section>
    </div> 
  </nav>
  <a class="footer-nav__transparency-icon" href="https://www.guidestar.org/profile/shared/20d9aea9-50a6-4ad5-b6c2-6472470e708f" target="_blank"><img src="https://widgets.guidestar.org/TransparencySeal/9868102" /></a>
  <div class="footer-nav__copyright">Website content is licensed under a <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank">CC-BY-NC license</a>, unless noted otherwise.</div>
</div>
    </div>
  </div>
</footer>


    <script async src="https://shopnoltd.kesug.com/assets/scripts/kobo.js?2024-12-05_18-51-37"></script>
    
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-26003863-1"></script>
    <script type="text/plain" data-cookiecategory="analytics">
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-26003863-1');
    </script>
</body>
</html>


    `);
});






// Dynamic route for /donate
app.get('/donate', (req, res) => {
    res.send(`



<!DOCTYPE html>
<html lang="en-US">

<head>
    
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <meta http-equiv="Content-Security-Policy" content="
        default-src 'self';
        img-src 'self' https://static.fundraiseup.com *.hsforms.com https://www.google-analytics.com https://ucarecdn.com
        *.paypal.com data: https://www.paypalobjects.com https://www.gstatic.com *.guidestar.org;
        script-src 'self' 'unsafe-inline' http://js.hsforms.net *.fundraiseup.com *.googletagmanager.com https://www.google-analytics.com
        https://ssl.google-analytics.com https://js.stripe.com https://www.paypal.com https://pay.google.com;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com;
        font-src 'self' https://fonts.gstatic.com https://static.fundraiseup.com;
        connect-src 'self' https://fndrsp.net https://forms.hsforms.com https://api.fundraiseup.com https://js.stripe.com
        https://www.google-analytics.com https://fndrsp-checkout.net https://sentry.fundraiseup.com https://www.paypal.com
        https://hubspot-forms-static-embed.s3.amazonaws.com https://google.com https://pay.google.com ws:;
        frame-src 'self' https://js.stripe.com https://forms.hsforms.com https://www.paypal.com https://pay.google.com/ *.youtube.com;
    ">

    
    <title>Donate | shopnotoolbox</title>
    <meta name="description" content="shopnotoolbox is an intuitive, powerful, and reliable software used to collect, analyze, and manage data for surveys, monitoring, evaluation, and research."/>
    <base href="https://shopnoltd.kesug.com"/>
    <link rel="home" href="https://shopnoltd.kesug.com"/>

    
    <meta name="robots" content="index,follow,noodp"/>
    <meta name="googlebot" content="index,follow"/>

    
    <meta property="og:locale" content="en_US"/>
    <meta property="og:site_name" content="shopnotoolbox"/>
    <meta property="og:title" content="Donate"/>
    <meta property="og:description" content="shopnotoolbox is an intuitive, powerful, and reliable software used to collect, analyze, and manage data for surveys, monitoring, evaluation, and research."/>
    <meta property="og:url" content="https://shopnoltd.kesug.com/donate/"/>
    <meta name="twitter:site" content="@shopnotoolbox"/>
    <meta name="twitter:description" content="shopnotoolbox is an intuitive, powerful, and reliable software used to collect, analyze, and manage data for surveys, monitoring, evaluation, and research."/>

    
    
    
        <meta property="og:type" content="website"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content="shopnotoolbox"/>
        <meta name="twitter:image" content="https://shopnoltd.kesug.com/assets/images/common/shopnotoolbox_opengraph_image.png"/>
        <meta property="og:image" content="https://shopnoltd.kesug.com/assets/images/common/shopnotoolbox_opengraph_image.png"/>
    

    
    <link href="https://shopnoltd.kesug.com/assets/styles/kobo.css?2024-12-05_18-51-37" rel="stylesheet" media="all"/>
    <link rel="icon" href="https://shopnoltd.kesug.com/favicon.png?2024-12-05_18-51-37"/>



    
    <script>
    (function(w,d,s,n,a){if(!w[n]){var l='call,catch,on,once,set,then,track'
    .split(','),i,o=function(n){return'function'==typeof n?o.l.push([arguments])&&o
    :function(){return o.l.push([n,arguments])&&o}},t=d.getElementsByTagName(s)[0],
    j=d.createElement(s);j.async=!0;j.src='https://cdn.fundraiseup.com/widget/'+a;
    t.parentNode.insertBefore(j,t);o.s=Date.now();o.v=4;o.h=w.location.href;o.l=[];
    for(i=0;i<7;i++)o[l[i]]=o(l[i]);w[n]=o}
    })(window,document,'script','FundraiseUp','ASAUFVGL');</script>
</head>


<body class="root">


<header class="root__header">
  <div class="root__row">
    <div class="root__row-content root__row-content--wide">
      <nav class="header-nav">
  <a class="header-nav__logo" href="/">
    <img src="/assets/images/common/shopnotoolbox_logo_default_for-light-bg.svg"/>
  </a>
  <a class="header-nav__mobile-logo" href="/">
    <img src="/assets/images/site/shopnotoolbox-logo-mobile.svg"/>
  </a>

  
  <input type="checkbox" id="mobile-nav-trigger">
  <label class="header-nav__mobile-nav-trigger" for="mobile-nav-trigger">
    <i></i><i></i><i></i><i></i>
  </label>

  <ul class="header-nav__menu">
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/about-us"
          >About us</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/features"
          >Features</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/services"
          >Services</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/pricing"
          >Pricing</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/blog"
          >Blog</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/help"
          >Help</a
        >
      </li>
    
  </ul>

  <ul class="header-nav__buttons">
    
    
    <li>
<a class="button button--size-m button--type-frame button--color-blue" href="/sign-up">Sign up</a>
</li>
    <li>
<a class="button button--size-m button--type-full button--color-blue" href="/donate">Donate</a>
</li>
  </ul>
</nav>

    </div>
  </div>
</header>


<div class="modal" data-modal>
  <div class="modal__box">
    <button class="modal__closer" data-modal-closer>&times;</button>
    <div class="modal__content" data-modal-content>Hello, World!</div>
  </div>
</div>


<main class="root__main" role="main"><script>
  const clickOnEnter = (event) => {
    if (event.key === 'Enter' && document.activeElement.attributes.clickable) {
      document.activeElement.click();
    }
  };
  document.body.addEventListener('keydown', (event) => {
    clickOnEnter(event);
  });
</script>
<div class="root__row donation-banner__background"
style="background-image: url('/assets/images/donate/kobo-donate-banner.jpg');"
>
  <h1>
      Together, we can achieve
      better outcomes for the
      world’s most vulnerable
  </h1>
  
<div class="donation-form donation-form--in-banner">
  <a href="#XESYHRGF" style="display: none"></a>
</div>

</div>

<div class="root__row">
  <section class="donate-list">
    <div class="donate-list-entry">
      <div
        class="donate-list-entry__img-container donate-list-entry__img-container--green"
      >
        <img src="/assets/images/donate/kobo-donate-image-1.jpg" />
      </div>
      <div class="donate-list-entry__text-block">
        <div class="donate-list-entry__text-block-content">
          <div class="donate-list-entry__title">
            Donate to support data-driven impact
          </div>
          <div class="donate-list-entry__description">
            Quality data leads to better outcomes for people facing war,
            natural disaster, hunger, and illness. That’s why shopnotoolbox
            is free for under-resourced frontline organizations serving
            people in crisis. A donation to Kobo helps over 250,000 users
            worldwide serve more people and save more lives.
          </div>
          <div>
            


  <a class="arrow-link arrow-link--color-dark-blue arrow-link--size-m arrow-link--align-left arrow-link__trigger" href="/about-us/impact/">
    Learn about the impact of shopnotoolbox users
    <span class="arrow-link__icon">
      <svg>
        <use xlink:href="/assets/images/site/sprite.svg#arrow-right"/>
      </svg>
    </span>
  </a>


          </div>
        </div>
      </div>
    </div>
    <div class="donate-list-entry donate-list-entry--reverse">
      <div class="donate-list-entry__img-container donate-list-entry__img-container--gray">
        <img src="/assets/images/donate/kobo-donate-image-2.jpg" />
      </div>
      <div class="donate-list-entry__text-block">
        <div class="donate-list-entry__text-block-content">
          <div class="donate-list-entry__title">How your donation helps</div>
          <div class="donate-list-entry__description">
            By supporting Kobo, you help us provide crucial resources
            for under-resourced organizations:
          </div>
          <ul class="donate-list__bullet-list">
            <li>
              <div class="donate-list__bullet-container">
              <load-file
              replaceWith
              src="/assets/images/site/list-checkmark.svg"></load-file>
              </div>
              Free Community Plan for nonprofits
            </li>
            <li>
              <div class="donate-list__bullet-container">
              <load-file
              replaceWith
              src="/assets/images/site/list-checkmark.svg"></load-file>
              </div>
              Open source development of shopnotoolbox
            </li>
            <li>
              <div class="donate-list__bullet-container">
              <load-file
              replaceWith
              src="/assets/images/site/list-checkmark.svg"></load-file>
              </div>
              Training and learning resources
            </li>
            <li>
              <div class="donate-list__bullet-container">
              <load-file
              replaceWith
              src="/assets/images/site/list-checkmark.svg"></load-file>
              </div>
              Reliable and innovative data technology
            </li>
            <li>
              <div class="donate-list__bullet-container">
              <load-file
              replaceWith
              src="/assets/images/site/list-checkmark.svg"></load-file>
              </div>
              New features that benefit all users
            </li>
          </ul>
          <div>
            


  <a class="arrow-link arrow-link--color-dark-blue arrow-link--size-m arrow-link--align-left arrow-link__trigger" href="/about-us/our-mission/">
    Learn more about our mission
    <span class="arrow-link__icon">
      <svg>
        <use xlink:href="/assets/images/site/sprite.svg#arrow-right"/>
      </svg>
    </span>
  </a>


          </div>
        </div>
      </div>
    </div>
  </section>
</div>




<script>
  const expandInitialAnchor = () => {
    if (!location.hash) {
      return;
    }
    const id = location.hash.replace('#', '');


    if (question) {
      updateQuestions(question);
      document.getElementById(id).scrollIntoView();
    }
  };

  const scrollBetweenQuestions = (event, id) => {
    event.preventDefault();
    const parentPath = '';



    updateQuestions(targetQuestion);

    const targetAnchor = document.getElementById(id);
    const currentAnswer = event.currentTarget.closest('.faq__answer-content');
    const currentAnswerY = currentAnswer.getBoundingClientRect().top;
    const targetAnchorY = targetAnchor.getBoundingClientRect().top;
    const currentAnswerOffset =
      currentAnswerY < targetAnchorY ? currentAnswer.scrollHeight : 0;

    window.scrollTo({
      top:
        targetAnchor.getBoundingClientRect().top +
        window.pageYOffset -
        80 -
        currentAnswerOffset,
    });
  };

  const updateQuestions = (question) => {
    const questionBlocks = Array.from(
      document.getElementsByClassName('faq__question-block')
    );

    const previousState = question.selected;

    questionBlocks.forEach((block) => {
      block.querySelector('.faq__expansion-toggle').selected = false;
    });

    question.selected = !previousState;

    questionBlocks.forEach((block) => {
      const question = block.querySelector('.faq__expansion-toggle');
      const answer = block.querySelector('.faq__answer');
      const answerContent = block.querySelector('.faq__answer-content');

      if (question.selected) {
        question.classList.add('faq__expansion-toggle--expanded');
        answer.style.height = answerContent.scrollHeight + 'px';
      } else {
        question.classList.remove('faq__expansion-toggle--expanded');
        answer.style.height = null;
      }
    });
  };

  document.addEventListener(
    'DOMContentLoaded',
    function (e) {
      const questionBlocks = Array.from(
        document.getElementsByClassName('faq__question-block')
      );

      questionBlocks.forEach((question) => {
        question
          .querySelector('.faq__expansion-toggle')
          .addEventListener('click', function (e) {
            updateQuestions(e.target);
          });
      });
    },
    {once: true}
  );

  //TODO: Find a document listener event to add this to
  window.onload = expandInitialAnchor;
</script>


<div class="root__row">
  <div class="root__row-content">
    <section class="faq">
      <div class="faq__header">
        <h3 id="faq" 
        class="">
        Frequently asked questions
        </h3>
      </div>
      <div class="faq__content">

         <div class="faq__question-section-container">

  
  
   
  <div class="faq__question-block">
  <input
    type="button"
    id="faq-toggle-security"
    class="faq__expansion-toggle"
  />
  <label tabindex="0" clickable for="faq-toggle-security">
    <h4 id="security">Is my donation secure?</h4>
    <div class="faq__toggle-sign"></div>
  </label>
  <div id="faq-toggle-security-answer" class="faq__answer">
    <div class="faq__answer-content">
      
  <p>
    Yes. We use industry-standard Secure Sockets Layer (SSL) technology to keep your information secure.
    We partner with Stripe, the industry's established payment processor trusted by some of the world's
    largest companies.
  </p>
  <p>
    Your financial information never touches our servers. We send all data directly to Stripe's Payment
    Card Industry (PCI) compliant servers though SSL.
  </p>
  
    </div>
  </div>
</div>


  
  

   
  <div class="faq__question-block">
  <input
    type="button"
    id="faq-toggle-tax-deductible"
    class="faq__expansion-toggle"
  />
  <label tabindex="0" clickable for="faq-toggle-tax-deductible">
    <h4 id="tax-deductible">Is this donation tax deductible?</h4>
    <div class="faq__toggle-sign"></div>
  </label>
  <div id="faq-toggle-tax-deductible-answer" class="faq__answer">
    <div class="faq__answer-content">
      
    <p>
      Your gift is tax deductible as per your local regulations. As a 501(c)(3) nonprofit organization, Kobo is a tax exempt organization.
    </p>
    <p>
      We will email you a donation receipt. Please keep this receipt. It is your official record to
      claim the donation as a tax deduction.
    </p>
  
    </div>
  </div>
</div>


  
  
   
  <div class="faq__question-block">
  <input
    type="button"
    id="faq-toggle-shares"
    class="faq__expansion-toggle"
  />
  <label tabindex="0" clickable for="faq-toggle-shares">
    <h4 id="shares">Can I make a gift of shares or other securities?</h4>
    <div class="faq__toggle-sign"></div>
  </label>
  <div id="faq-toggle-shares-answer" class="faq__answer">
    <div class="faq__answer-content">
      
    <p>
      Yes, you can donate stocks, bonds, mutual funds, or other securities. Visit our
      <a href="/donate/shares/">share donation page</a> for more information.
    </p>
    <p>
      If you have any questions about donating shares or securities, please contact our team at
      <a href="mailto:donate@shopnotoolbox.org">donate@shopnotoolbox.org</a>. For questions related to taxes and tax deductible gifts,
      please consult directly with your lawyer, tax professional, or financial advisor.
    </p>
  
    </div>
  </div>
</div>


  
  
   
  <div class="faq__question-block">
  <input
    type="button"
    id="faq-toggle-checks"
    class="faq__expansion-toggle"
  />
  <label tabindex="0" clickable for="faq-toggle-checks">
    <h4 id="checks">How can I give a gift by check?</h4>
    <div class="faq__toggle-sign"></div>
  </label>
  <div id="faq-toggle-checks-answer" class="faq__answer">
    <div class="faq__answer-content">
      
    <p>
      To make a gift by check, please mail it to Kobo, Inc, 37 Highland Ave, Cambridge MA, 02139.
      Please make your check payable to Kobo Inc.
    </p>
  
    </div>
  </div>
</div>

  
  
  
   
  <div class="faq__question-block">
  <input
    type="button"
    id="faq-toggle-wire-transfer"
    class="faq__expansion-toggle"
  />
  <label tabindex="0" clickable for="faq-toggle-wire-transfer">
    <h4 id="wire-transfer">Can I make a gift by wire or ACH transfer?</h4>
    <div class="faq__toggle-sign"></div>
  </label>
  <div id="faq-toggle-wire-transfer-answer" class="faq__answer">
    <div class="faq__answer-content">
      
    <p>
      Yes. Please reach out to us at <a href="mailto:donate@shopnotoolbox.org">donate@shopnotoolbox.org</a>
      for wire or ACH transfer instructions.
    </p>
  
    </div>
  </div>
</div>

  
  
  
   
  <div class="faq__question-block">
  <input
    type="button"
    id="faq-toggle-donor-advised-fund"
    class="faq__expansion-toggle"
  />
  <label tabindex="0" clickable for="faq-toggle-donor-advised-fund">
    <h4 id="donor-advised-fund">How can I give through a donor-advised fund (DAF)?</h4>
    <div class="faq__toggle-sign"></div>
  </label>
  <div id="faq-toggle-donor-advised-fund-answer" class="faq__answer">
    <div class="faq__answer-content">
      
    <p>
      When processing a DAF grant through a charitable giving account, search for Kobo, Inc using
      tax ID 37-1934868.
    </p>
  
    </div>
  </div>
</div>

  
  
  
   
  <div class="faq__question-block">
  <input
    type="button"
    id="faq-toggle-monthly"
    class="faq__expansion-toggle"
  />
  <label tabindex="0" clickable for="faq-toggle-monthly">
    <h4 id="monthly">How can I give monthly?</h4>
    <div class="faq__toggle-sign"></div>
  </label>
  <div id="faq-toggle-monthly-answer" class="faq__answer">
    <div class="faq__answer-content">
      
    <p>
      Please use the donation form above. Select the option for monthly donations.
    </p>
  
    </div>
  </div>
</div>


  
  
   
  <div class="faq__question-block">
  <input
    type="button"
    id="faq-toggle-cancel-recurring"
    class="faq__expansion-toggle"
  />
  <label tabindex="0" clickable for="faq-toggle-cancel-recurring">
    <h4 id="cancel-recurring">Can I cancel my recurring donation?</h4>
    <div class="faq__toggle-sign"></div>
  </label>
  <div id="faq-toggle-cancel-recurring-answer" class="faq__answer">
    <div class="faq__answer-content">
      
    <p>
      Yes. If you choose to give a recurring donation, you can cancel it at any time by
      clicking the link in your donation receipt and following the instructions provided.
    </p>
    <p>
      For assistance with a recurring donation, please email
      <a href="mailto:donate@shopnotoolbox.org">donate@shopnotoolbox.org</a>.
    </p>
  
    </div>
  </div>
</div>


</div>
 

      </div>
    </section>
  </div>
</div>

</main>

<footer class="root__footer">
  <div class="root__row">
    <div class="root__row-content root__row-content--wide">
      <div class="footer-nav__container">
  <nav class="footer-nav">
    <div class="footer-nav__block footer-nav__menu">
      <ul class="footer-nav-menu__row">
        <label>Organization</label>

        
          <li>
            <a href="/about-us/">About us</a>
          </li>
        
          <li>
            <a href="/about-us/meet-the-team/">Team</a>
          </li>
        
          <li>
            <a href="/join-our-team">Jobs</a>
          </li>
        
          <li>
            <a href="/about-us/financials/">Financials</a>
          </li>
        
          <li>
            <a href="/contact/">Contact</a>
          </li>
        
      </ul>

      <ul class="footer-nav-menu__row">
        <label>Software</label>

        
          <li>
            <a href="https://academy.shopnotoolbox.org/collections">Online learning</a>
          </li>
        
          <li>
            <a href="/about-us/software">About shopnotoolbox</a>
          </li>
        
          <li>
            <a href="/features">Features</a>
          </li>
        
          <li>
            <a href="/pricing">Pricing</a>
          </li>
        
          <li>
            <a href="/services/private-servers">Private servers</a>
          </li>
        
          <li>
            <a href="/services">Services</a>
          </li>
        
      </ul>

      <ul class="footer-nav-menu__row">
        <label>Community</label>

        
          <li>
            <a href="https://community.shopnotoolbox.org/">Forum</a>
          </li>
        
          <li>
            <a href="https://support.shopnotoolbox.org/">Documentation</a>
          </li>
        
          <li>
            <a href="/donate">Donate</a>
          </li>
        
      </ul>
    </div>

    <div class="footer-nav__block">
      <section class="footer-nav__newsletter">
        <h3>Stay up<br/>to date.</h3>

        <p>Subscribe to our shopnotoolbox Updates newsletter to be the first to learn about new features, resources, and user impact stories from around the world.</p>

        <section class="newsletter-form-wrapper">
  <script charset="utf-8" type="text/javascript" src="https://js.hsforms.net/forms/shell.js"></script>
  <script>
    hbspt.forms.create({
      region: "na1",
      portalId: "21396257",
      formId: "16b9634b-3ea9-4539-9ec2-b83d4125e24c"
  });
  </script>
</section>
      </section>

      <section class="footer-nav__social">
        <nav>
          
            <li>
              <a href="https://www.facebook.com/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/facebook.svg"></load-file>
              </a>
            </li>
          
            <li>
              <a href="https://twitter.com/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/twitter.svg"></load-file>
              </a>
            </li>
          
            <li>
              <a href="https://www.linkedin.com/company/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/linkedin.svg"></load-file>
              </a>
            </li>
          
            <li>
              <a href="https://github.com/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/github.svg"></load-file>
              </a>
            </li>
          
        </nav>

        <div>
          <a class="footer-nav__logo" href="/">
            <img src="/assets/images/site/shopnotoolbox-logo-borderless.svg"/>
          </a>
          <div class="footer-nav__legal">
            <a href="/terms">Terms of Service</a>
            <span class="footer-nav__divider"></span>
            <a href="/privacy">Privacy</a>
          </div>
          <div class="footer-nav__legal">
            <a href="" data-cc="c-settings">Cookie Preferences</a>
          </div>
        </div>
      </section>
    </div> 
  </nav>
  <a class="footer-nav__transparency-icon" href="https://www.guidestar.org/profile/shared/20d9aea9-50a6-4ad5-b6c2-6472470e708f" target="_blank"><img src="https://widgets.guidestar.org/TransparencySeal/9868102" /></a>
  <div class="footer-nav__copyright">Website content is licensed under a <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank">CC-BY-NC license</a>, unless noted otherwise.</div>
</div>
    </div>
  </div>
</footer>


    <script async src="https://shopnoltd.kesug.com/assets/scripts/kobo.js?2024-12-05_18-51-37"></script>
    
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-26003863-1"></script>
    <script type="text/plain" data-cookiecategory="analytics">
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-26003863-1');
    </script>
</body>
</html>


    `);  // <-- Make sure this closing backtick is also present here
});


// Dynamic route for /about-us
app.get('/about-us', (req, res) => {
    res.send(`



<!DOCTYPE html>
<html lang="en-US">

<head>
    
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <meta http-equiv="Content-Security-Policy" content="
        default-src 'self';
        img-src 'self' https://static.fundraiseup.com *.hsforms.com https://www.google-analytics.com https://ucarecdn.com
        *.paypal.com data: https://www.paypalobjects.com https://www.gstatic.com *.guidestar.org;
        script-src 'self' 'unsafe-inline' http://js.hsforms.net *.fundraiseup.com *.googletagmanager.com https://www.google-analytics.com
        https://ssl.google-analytics.com https://js.stripe.com https://www.paypal.com https://pay.google.com;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com;
        font-src 'self' https://fonts.gstatic.com https://static.fundraiseup.com;
        connect-src 'self' https://fndrsp.net https://forms.hsforms.com https://api.fundraiseup.com https://js.stripe.com
        https://www.google-analytics.com https://fndrsp-checkout.net https://sentry.fundraiseup.com https://www.paypal.com
        https://hubspot-forms-static-embed.s3.amazonaws.com https://google.com https://pay.google.com ws:;
        frame-src 'self' https://js.stripe.com https://forms.hsforms.com https://www.paypal.com https://pay.google.com/ *.youtube.com;
    ">

    
    <title>About us | shopnotoolbox</title>
    <meta name="description" content="shopnotoolbox is an intuitive, powerful, and reliable software used to collect, analyze, and manage data for surveys, monitoring, evaluation, and research."/>
    <base href="https://shopnoltd.kesug.com"/>
    <link rel="home" href="https://shopnoltd.kesug.com"/>

    
    <meta name="robots" content="index,follow,noodp"/>
    <meta name="googlebot" content="index,follow"/>

    
    <meta property="og:locale" content="en_US"/>
    <meta property="og:site_name" content="shopnotoolbox"/>
    <meta property="og:title" content="About us"/>
    <meta property="og:description" content="shopnotoolbox is an intuitive, powerful, and reliable software used to collect, analyze, and manage data for surveys, monitoring, evaluation, and research."/>
    <meta property="og:url" content="https://shopnoltd.kesug.com/about-us/"/>
    <meta name="twitter:site" content="@shopnotoolbox"/>
    <meta name="twitter:description" content="shopnotoolbox is an intuitive, powerful, and reliable software used to collect, analyze, and manage data for surveys, monitoring, evaluation, and research."/>

    
    
    
        <meta property="og:type" content="website"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content="shopnotoolbox"/>
        <meta name="twitter:image" content="https://shopnoltd.kesug.com/assets/images/common/shopnotoolbox_opengraph_image.png"/>
        <meta property="og:image" content="https://shopnoltd.kesug.com/assets/images/common/shopnotoolbox_opengraph_image.png"/>
    

    
    <link href="https://shopnoltd.kesug.com/assets/styles/kobo.css?2024-12-05_18-51-37" rel="stylesheet" media="all"/>
    <link rel="icon" href="https://shopnoltd.kesug.com/favicon.png?2024-12-05_18-51-37"/>



    
    <script>
    (function(w,d,s,n,a){if(!w[n]){var l='call,catch,on,once,set,then,track'
    .split(','),i,o=function(n){return'function'==typeof n?o.l.push([arguments])&&o
    :function(){return o.l.push([n,arguments])&&o}},t=d.getElementsByTagName(s)[0],
    j=d.createElement(s);j.async=!0;j.src='https://cdn.fundraiseup.com/widget/'+a;
    t.parentNode.insertBefore(j,t);o.s=Date.now();o.v=4;o.h=w.location.href;o.l=[];
    for(i=0;i<7;i++)o[l[i]]=o(l[i]);w[n]=o}
    })(window,document,'script','FundraiseUp','ASAUFVGL');</script>
</head>


<body class="root">


<header class="root__header">
  <div class="root__row">
    <div class="root__row-content root__row-content--wide">
      <nav class="header-nav">
  <a class="header-nav__logo" href="/">
    <img src="/assets/images/common/shopnotoolbox_logo_default_for-light-bg.svg"/>
  </a>
  <a class="header-nav__mobile-logo" href="/">
    <img src="/assets/images/site/shopnotoolbox-logo-mobile.svg"/>
  </a>

  
  <input type="checkbox" id="mobile-nav-trigger">
  <label class="header-nav__mobile-nav-trigger" for="mobile-nav-trigger">
    <i></i><i></i><i></i><i></i>
  </label>

  <ul class="header-nav__menu">
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item header-nav__menu-item--active"
          href="/about-us"
          >About us</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/features"
          >Features</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/services"
          >Services</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/pricing"
          >Pricing</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/blog"
          >Blog</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/help"
          >Help</a
        >
      </li>
    
  </ul>

  <ul class="header-nav__buttons">
    
    
    <li>
<a class="button button--size-m button--type-frame button--color-blue" href="/sign-up">Sign up</a>
</li>
    <li>
<a class="button button--size-m button--type-full button--color-blue" href="/donate">Donate</a>
</li>
  </ul>
</nav>

    </div>
  </div>
</header>


<div class="modal" data-modal>
  <div class="modal__box">
    <button class="modal__closer" data-modal-closer>&times;</button>
    <div class="modal__content" data-modal-content>Hello, World!</div>
  </div>
</div>


<main class="root__main" role="main">

<div class="root__row">
  <div class="root__row-content">
    <section class="side-image-banner">
      <div class="side-image-banner__text-block banner-text banner-text--side-image">
        <h1 class="side-image-banner__header">
          
            <div>Making data
collection</div>
          
            <div>accessible to everyone, everywhere</div>
          
        </h1>
        <p>Kobo hosts and
maintains shopnotoolbox, a data collection, management, and visualization platform
used globally for research and social good. Our mission is to support open
source data systems and technology for humanitarian action, development,
environmental protection, peacebuilding, and human rights.</p>
      </div>
      
        <div class="side-image-banner__img-container">
          <img src="/assets/images/banners/about-banner.png"/>
        </div>
      
    </section>
  </div>
</div>


<div class="root__row root__row--storm">
  <div class="root__row-content">
    <section class="org-quick-links">
      <h2>The Kobo Organization</h2>
      <div class="org-quick-links__list">
        
<ul class="quick-link-list">
  
    <li>
      


<a 
class="quick-link arrow-link__trigger quick-link--width-narrow""
href="/about-us/impact/">
  
    <img
      class="quick-link__thumbnail"
      src="/assets/images/about/illustration-impact.png"
    ></img>
  

  <h3 class="quick-link__title">
    Our impact
  </h3>

  <p class="quick-link__description">
    We provide shopnotoolbox free of charge to over 14,000 nonprofit organizations around the world.
  </p>
  
  


  <div class="arrow-link arrow-link--color-dark-blue arrow-link--size-m arrow-link--align-left">
    Go to impact
    <span class="arrow-link__icon">
      <svg>
        <use xlink:href="/assets/images/site/sprite.svg#arrow-right"/>
      </svg>
    </span>
  </div>


</a>

    </li>
  
    <li>
      


<a 
class="quick-link arrow-link__trigger quick-link--width-narrow""
href="/about-us/our-mission/">
  
    <img
      class="quick-link__thumbnail"
      src="/assets/images/about/illustration-mission.png"
    ></img>
  

  <h3 class="quick-link__title">
    Mission & vision
  </h3>

  <p class="quick-link__description">
    Kobo’s mission is to host and maintain shopnotoolbox and to support open source data systems and technology.
  </p>
  
  


  <div class="arrow-link arrow-link--color-dark-blue arrow-link--size-m arrow-link--align-left">
    Go to mission and vision
    <span class="arrow-link__icon">
      <svg>
        <use xlink:href="/assets/images/site/sprite.svg#arrow-right"/>
      </svg>
    </span>
  </div>


</a>

    </li>
  
    <li>
      


<a 
class="quick-link arrow-link__trigger quick-link--width-narrow""
href="/about-us/financials/">
  
    <img
      class="quick-link__thumbnail"
      src="/assets/images/about/illustration-financials.png"
    ></img>
  

  <h3 class="quick-link__title">
    Financials
  </h3>

  <p class="quick-link__description">
    Kobo is a nonprofit organization, sustained by partnerships, service revenue, grants, and donations.
  </p>
  
  


  <div class="arrow-link arrow-link--color-dark-blue arrow-link--size-m arrow-link--align-left">
    Go to financials
    <span class="arrow-link__icon">
      <svg>
        <use xlink:href="/assets/images/site/sprite.svg#arrow-right"/>
      </svg>
    </span>
  </div>


</a>

    </li>
  
    <li>
      


<a 
class="quick-link arrow-link__trigger quick-link--width-narrow""
href="/about-us/the-organization/">
  
    <img
      class="quick-link__thumbnail"
      src="/assets/images/about/illustration-organization.png"
    ></img>
  

  <h3 class="quick-link__title">
    Our organization
  </h3>

  <p class="quick-link__description">
    shopnotoolbox is developed for practitioners, by practitioners. Learn more about our history and partnerships.
  </p>
  
  


  <div class="arrow-link arrow-link--color-dark-blue arrow-link--size-m arrow-link--align-left">
    Go to organization
    <span class="arrow-link__icon">
      <svg>
        <use xlink:href="/assets/images/site/sprite.svg#arrow-right"/>
      </svg>
    </span>
  </div>


</a>

    </li>
  
</ul>

      </div>
    </section>
  </div>
</div>

<div class="root__row">
  <div class="root__row-content root__row--white">
    <section class="about-us-software">
      <div class="about-us-software__header">
        <h2>
          Our software
        </h2>
      </div>
      <div class="about-us-software__body">
        <div class="about-us-software__image-block">
          <img src="/assets/images/about/our-software.png">
        </div>
        <div class="about-us-software__quick-links">
          
<ul class="quick-link-list-vertical">
  
    <li class="arrow-link__trigger">
      


<a 
class="quick-link-wide"
href="/about-us/software/">
  

  <h3 class="quick-link-wide__title">
    The shopnotoolbox Platform
  </h3>

  <p class="quick-link-wide__description">
    An intuitive tool for producing high quality data in challenging settings—making it the software of choice for countless organizations.
  </p>
  
  


  <div class="arrow-link arrow-link--color-dark-blue arrow-link--size-m arrow-link--align-left">
    Learn more about our platform
    <span class="arrow-link__icon">
      <svg>
        <use xlink:href="/assets/images/site/sprite.svg#arrow-right"/>
      </svg>
    </span>
  </div>


</a>

    </li>
  
    <li class="arrow-link__trigger">
      


<a 
class="quick-link-wide"
href="/features/">
  

  <h3 class="quick-link-wide__title">
    shopnotoolbox Features
  </h3>

  <p class="quick-link-wide__description">
    shopnotoolbox offers form development, offline data collection, and project management tools–with high security standards.
  </p>
  
  


  <div class="arrow-link arrow-link--color-dark-blue arrow-link--size-m arrow-link--align-left">
    Explore the features
    <span class="arrow-link__icon">
      <svg>
        <use xlink:href="/assets/images/site/sprite.svg#arrow-right"/>
      </svg>
    </span>
  </div>


</a>

    </li>
  
</ul>

        </div>
      </div>
    </section>
  </div>
</div> 






  <div class="root__row root__row--gray">
    <div class="root__row-content">
      <section class="services-list">
        <div class="services-list__header services-list__header--align-center">
          <h2>
            
              Services and partnerships
            
          </h2>
          <div>
            We work directly with organizations worldwide to find solutions to their data collection needs
          </div>
        </div>
        <div class="services-list__list">
          
            <div class="services-list__entry-wrapper">
              <div class="services-list__entry">
                <img src="/assets/images/services/banner/icon-feature-development.png">
                <h3>Feature development</h3>
                <div class="services-list__entry-divider services-list__entry-divider--teal"></div>
                <div class="services-list__entry-description">Work with our specialists to develop the shopnotoolbox features your organization needs.</div>
              </div>
            </div>
          
            <div class="services-list__entry-wrapper">
              <div class="services-list__entry">
                <img src="/assets/images/services/banner/icon-server-setup.png">
                <h3>Organization server set up</h3>
                <div class="services-list__entry-divider services-list__entry-divider--pink"></div>
                <div class="services-list__entry-description">Have our team set up and maintain a secure standalone custom-branded shopnotoolbox server for your organization.</div>
              </div>
            </div>
          
            <div class="services-list__entry-wrapper">
              <div class="services-list__entry">
                <img src="/assets/images/services/banner/icon-training.png">
                <h3>Training and consultations</h3>
                <div class="services-list__entry-divider services-list__entry-divider--mid-blue"></div>
                <div class="services-list__entry-description">Organize multilingual custom training sessions for your teams or work with our research experts.</div>
              </div>
            </div>
          
            <div class="services-list__entry-wrapper">
              <div class="services-list__entry">
                <img src="/assets/images/services/banner/icon-user-support.png">
                <h3>User support and upgrades</h3>
                <div class="services-list__entry-divider services-list__entry-divider--lilac"></div>
                <div class="services-list__entry-description">Find out about our scalable support plans for your organization or for mission-critical projects.</div>
              </div>
            </div>
          
        </div>
        


  <a class="arrow-link arrow-link--color-dark-blue arrow-link--size-m arrow-link--align-center arrow-link__trigger" href="
  /services
">
    Learn about our services
    <span class="arrow-link__icon">
      <svg>
        <use xlink:href="/assets/images/site/sprite.svg#arrow-right"/>
      </svg>
    </span>
  </a>


      </section>
    </div>
  </div>

<div class="root__row">
  <div class="root__row-content root__row--white">
    <section class="about-us-behind-kobo">
      <div class="about-us-behind-kobo__header">
        <h2>
          Behind shopnotoolbox
        </h2>
      </div>
      <div class="about-us-behind-kobo__body">
        <div class="about-us-behind-kobo__image-block">
          <p>We are a diverse team of researchers, developers, designers, and data specialists working remotely in countries across the world. We believe that every organization working in humanitarian action, development, environmental protection, peacebuilding, and human rights should have access to high quality data collection tools.</p>
        </div>
        <div class="about-us-behind-kobo__quick-links">
          
<ul class="quick-link-list-vertical">
  
    <li class="arrow-link__trigger">
      


<a 
class="quick-link-wide"
href="/about-us/meet-the-team/">
  

  <h3 class="quick-link-wide__title">
    Our Team & Board
  </h3>

  <p class="quick-link-wide__description">
    Learn more about the amazing people on our team and our Board of Directors.
  </p>
  
  


  <div class="arrow-link arrow-link--color-dark-blue arrow-link--size-m arrow-link--align-left">
    Go to Team & Board
    <span class="arrow-link__icon">
      <svg>
        <use xlink:href="/assets/images/site/sprite.svg#arrow-right"/>
      </svg>
    </span>
  </div>


</a>

    </li>
  
    <li class="arrow-link__trigger">
      


<a 
class="quick-link-wide"
href="/about-us/ambassadors/">
  

  <h3 class="quick-link-wide__title">
    shopnotoolbox Ambassadors
  </h3>

  <p class="quick-link-wide__description">
    Our Ambassadors are a global network of volunteers who support organizations in their communities to solve local challenges with data-informed initiatives.
  </p>
  
  


  <div class="arrow-link arrow-link--color-dark-blue arrow-link--size-m arrow-link--align-left">
    Go to Ambassadors
    <span class="arrow-link__icon">
      <svg>
        <use xlink:href="/assets/images/site/sprite.svg#arrow-right"/>
      </svg>
    </span>
  </div>


</a>

    </li>
  
    <li class="arrow-link__trigger">
      


<a 
class="quick-link-wide"
href="/about-us/advisory-body/">
  

  <h3 class="quick-link-wide__title">
    Community Council
  </h3>

  <p class="quick-link-wide__description">
    The shopnotoolbox Community Council is a diverse group of practitioners from around the world who advise our activities.
  </p>
  
  


  <div class="arrow-link arrow-link--color-dark-blue arrow-link--size-m arrow-link--align-left">
    Go to Community Council
    <span class="arrow-link__icon">
      <svg>
        <use xlink:href="/assets/images/site/sprite.svg#arrow-right"/>
      </svg>
    </span>
  </div>


</a>

    </li>
  
    <li class="arrow-link__trigger">
      


<a 
class="quick-link-wide"
href="/join-our-team/">
  

  <h3 class="quick-link-wide__title">
    Jobs & volunteer opportunities
  </h3>

  <p class="quick-link-wide__description">
    Find out about current job or volunteer opportunities.
  </p>
  
  


  <div class="arrow-link arrow-link--color-dark-blue arrow-link--size-m arrow-link--align-left">
    Go to jobs
    <span class="arrow-link__icon">
      <svg>
        <use xlink:href="/assets/images/site/sprite.svg#arrow-right"/>
      </svg>
    </span>
  </div>


</a>

    </li>
  
</ul>

        </div>
      </div>
    </section>
  </div>
</div>
 <div class="root__row about-us-cta">
  <section class="about-us-cta__content">
    <a class="about-us-cta__left arrow-link__trigger" href="/contact">
      <div class="about-us-cta__card-content">
        <div class="about-us-cta__block">
          <div class="about-us-cta__icon-block">
            <img src="/assets/images/site/icon-partner.png">
          </div>
          <div class="about-us-cta__text">
            <div class="about-us-cta__lead">Interested?</div>
            <h2>Partner with us</h2>
            <p>Sponsor new features that can be used by all. Get a standalone shopnotoolbox server. 
              Contact us to find out how we can support your organization.
            </p>
          </div>
        </div>
        


  <div class="arrow-link arrow-link--color-dark-blue arrow-link--size-m arrow-link--align-right">
    Get in touch
    <span class="arrow-link__icon">
      <svg>
        <use xlink:href="/assets/images/site/sprite.svg#arrow-right"/>
      </svg>
    </span>
  </div>


      </div>
    </a>

    <a class="about-us-cta__right arrow-link__trigger" href="/donate">
      <div class="about-us-cta__card-content">
        <div class="about-us-cta__block">
          <div class="about-us-cta__icon-block">
            <img src="/assets/images/site/icon-donate.png">
          </div>
          <div class="about-us-cta__text">
            <div class="about-us-cta__lead">Want to help?</div>
            <h2>Donate today</h2>
            <p>Help us to continue making high quality data collection tools accessible to everyone, everywhere.</p>
          </div>
        </div>
        


  <div class="arrow-link arrow-link--color-dark-blue arrow-link--size-m arrow-link--align-right">
    Make a donation
    <span class="arrow-link__icon">
      <svg>
        <use xlink:href="/assets/images/site/sprite.svg#arrow-right"/>
      </svg>
    </span>
  </div>


      </div>
    </a>
  </section>
</div>
</main>

<footer class="root__footer">
  <div class="root__row">
    <div class="root__row-content root__row-content--wide">
      <div class="footer-nav__container">
  <nav class="footer-nav">
    <div class="footer-nav__block footer-nav__menu">
      <ul class="footer-nav-menu__row">
        <label>Organization</label>

        
          <li>
            <a href="/about-us/">About us</a>
          </li>
        
          <li>
            <a href="/about-us/meet-the-team/">Team</a>
          </li>
        
          <li>
            <a href="/join-our-team">Jobs</a>
          </li>
        
          <li>
            <a href="/about-us/financials/">Financials</a>
          </li>
        
          <li>
            <a href="/contact/">Contact</a>
          </li>
        
      </ul>

      <ul class="footer-nav-menu__row">
        <label>Software</label>

        
          <li>
            <a href="https://academy.shopnotoolbox.org/collections">Online learning</a>
          </li>
        
          <li>
            <a href="/about-us/software">About shopnotoolbox</a>
          </li>
        
          <li>
            <a href="/features">Features</a>
          </li>
        
          <li>
            <a href="/pricing">Pricing</a>
          </li>
        
          <li>
            <a href="/services/private-servers">Private servers</a>
          </li>
        
          <li>
            <a href="/services">Services</a>
          </li>
        
      </ul>

      <ul class="footer-nav-menu__row">
        <label>Community</label>

        
          <li>
            <a href="https://community.shopnotoolbox.org/">Forum</a>
          </li>
        
          <li>
            <a href="https://support.shopnotoolbox.org/">Documentation</a>
          </li>
        
          <li>
            <a href="/donate">Donate</a>
          </li>
        
      </ul>
    </div>

    <div class="footer-nav__block">
      <section class="footer-nav__newsletter">
        <h3>Stay up<br/>to date.</h3>

        <p>Subscribe to our shopnotoolbox Updates newsletter to be the first to learn about new features, resources, and user impact stories from around the world.</p>

        <section class="newsletter-form-wrapper">
  <script charset="utf-8" type="text/javascript" src="https://js.hsforms.net/forms/shell.js"></script>
  <script>
    hbspt.forms.create({
      region: "na1",
      portalId: "21396257",
      formId: "16b9634b-3ea9-4539-9ec2-b83d4125e24c"
  });
  </script>
</section>
      </section>

      <section class="footer-nav__social">
        <nav>
          
            <li>
              <a href="https://www.facebook.com/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/facebook.svg"></load-file>
              </a>
            </li>
          
            <li>
              <a href="https://twitter.com/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/twitter.svg"></load-file>
              </a>
            </li>
          
            <li>
              <a href="https://www.linkedin.com/company/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/linkedin.svg"></load-file>
              </a>
            </li>
          
            <li>
              <a href="https://github.com/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/github.svg"></load-file>
              </a>
            </li>
          
        </nav>

        <div>
          <a class="footer-nav__logo" href="/">
            <img src="/assets/images/site/shopnotoolbox-logo-borderless.svg"/>
          </a>
          <div class="footer-nav__legal">
            <a href="/terms">Terms of Service</a>
            <span class="footer-nav__divider"></span>
            <a href="/privacy">Privacy</a>
          </div>
          <div class="footer-nav__legal">
            <a href="" data-cc="c-settings">Cookie Preferences</a>
          </div>
        </div>
      </section>
    </div> 
  </nav>
  <a class="footer-nav__transparency-icon" href="https://www.guidestar.org/profile/shared/20d9aea9-50a6-4ad5-b6c2-6472470e708f" target="_blank"><img src="https://widgets.guidestar.org/TransparencySeal/9868102" /></a>
  <div class="footer-nav__copyright">Website content is licensed under a <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank">CC-BY-NC license</a>, unless noted otherwise.</div>
</div>
    </div>
  </div>
</footer>


    <script async src="https://shopnoltd.kesug.com/assets/scripts/kobo.js?2024-12-05_18-51-37"></script>
    
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-26003863-1"></script>
    <script type="text/plain" data-cookiecategory="analytics">
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-26003863-1');
    </script>
</body>
</html>


    `);  // <-- Make sure this closing backtick is also present here
});

// Dynamic route for /impact
app.get('/impact', (req, res) => {
    res.send(`



<!DOCTYPE html>
<html lang="en-US">

<head>
    
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <meta http-equiv="Content-Security-Policy" content="
        default-src 'self';
        img-src 'self' https://static.fundraiseup.com *.hsforms.com https://www.google-analytics.com https://ucarecdn.com
        *.paypal.com data: https://www.paypalobjects.com https://www.gstatic.com *.guidestar.org;
        script-src 'self' 'unsafe-inline' http://js.hsforms.net *.fundraiseup.com *.googletagmanager.com https://www.google-analytics.com
        https://ssl.google-analytics.com https://js.stripe.com https://www.paypal.com https://pay.google.com;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com;
        font-src 'self' https://fonts.gstatic.com https://static.fundraiseup.com;
        connect-src 'self' https://fndrsp.net https://forms.hsforms.com https://api.fundraiseup.com https://js.stripe.com
        https://www.google-analytics.com https://fndrsp-checkout.net https://sentry.fundraiseup.com https://www.paypal.com
        https://hubspot-forms-static-embed.s3.amazonaws.com https://google.com https://pay.google.com ws:;
        frame-src 'self' https://js.stripe.com https://forms.hsforms.com https://www.paypal.com https://pay.google.com/ *.youtube.com;
    ">

    
    <title>Impact | shopnotoolbox</title>
    <meta name="description" content="shopnotoolbox is an intuitive, powerful, and reliable software used to collect, analyze, and manage data for surveys, monitoring, evaluation, and research."/>
    <base href="https://shopnoltd.kesug.com"/>
    <link rel="home" href="https://shopnoltd.kesug.com"/>

    
    <meta name="robots" content="index,follow,noodp"/>
    <meta name="googlebot" content="index,follow"/>

    
    <meta property="og:locale" content="en_US"/>
    <meta property="og:site_name" content="shopnotoolbox"/>
    <meta property="og:title" content="Impact"/>
    <meta property="og:description" content="shopnotoolbox is an intuitive, powerful, and reliable software used to collect, analyze, and manage data for surveys, monitoring, evaluation, and research."/>
    <meta property="og:url" content="https://shopnoltd.kesug.com/about-us/impact/"/>
    <meta name="twitter:site" content="@shopnotoolbox"/>
    <meta name="twitter:description" content="shopnotoolbox is an intuitive, powerful, and reliable software used to collect, analyze, and manage data for surveys, monitoring, evaluation, and research."/>

    
    
    
        <meta property="og:type" content="website"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content="shopnotoolbox"/>
        <meta name="twitter:image" content="https://shopnoltd.kesug.com/assets/images/common/shopnotoolbox_opengraph_image.png"/>
        <meta property="og:image" content="https://shopnoltd.kesug.com/assets/images/common/shopnotoolbox_opengraph_image.png"/>
    

    
    <link href="https://shopnoltd.kesug.com/assets/styles/kobo.css?2024-12-05_18-51-37" rel="stylesheet" media="all"/>
    <link rel="icon" href="https://shopnoltd.kesug.com/favicon.png?2024-12-05_18-51-37"/>



    
    <script>
    (function(w,d,s,n,a){if(!w[n]){var l='call,catch,on,once,set,then,track'
    .split(','),i,o=function(n){return'function'==typeof n?o.l.push([arguments])&&o
    :function(){return o.l.push([n,arguments])&&o}},t=d.getElementsByTagName(s)[0],
    j=d.createElement(s);j.async=!0;j.src='https://cdn.fundraiseup.com/widget/'+a;
    t.parentNode.insertBefore(j,t);o.s=Date.now();o.v=4;o.h=w.location.href;o.l=[];
    for(i=0;i<7;i++)o[l[i]]=o(l[i]);w[n]=o}
    })(window,document,'script','FundraiseUp','ASAUFVGL');</script>
</head>


<body class="root">


<header class="root__header">
  <div class="root__row">
    <div class="root__row-content root__row-content--wide">
      <nav class="header-nav">
  <a class="header-nav__logo" href="/">
    <img src="/assets/images/common/shopnotoolbox_logo_default_for-light-bg.svg"/>
  </a>
  <a class="header-nav__mobile-logo" href="/">
    <img src="/assets/images/site/shopnotoolbox-logo-mobile.svg"/>
  </a>

  
  <input type="checkbox" id="mobile-nav-trigger">
  <label class="header-nav__mobile-nav-trigger" for="mobile-nav-trigger">
    <i></i><i></i><i></i><i></i>
  </label>

  <ul class="header-nav__menu">
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item header-nav__menu-item--active"
          href="/about-us"
          >About us</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/features"
          >Features</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/services"
          >Services</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/pricing"
          >Pricing</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/blog"
          >Blog</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/help"
          >Help</a
        >
      </li>
    
  </ul>

  <ul class="header-nav__buttons">
    
    
    <li>
<a class="button button--size-m button--type-frame button--color-blue" href="/sign-up">Sign up</a>
</li>
    <li>
<a class="button button--size-m button--type-full button--color-blue" href="/donate">Donate</a>
</li>
  </ul>
</nav>

    </div>
  </div>
</header>


<div class="modal" data-modal>
  <div class="modal__box">
    <button class="modal__closer" data-modal-closer>&times;</button>
    <div class="modal__content" data-modal-content>Hello, World!</div>
  </div>
</div>


<main class="root__main" role="main">
  <div class="root__row root__row--white">
    <div class="root__row-content">
      <section class="text-subpage">
        <aside>
          
<nav class="text-subpage-nav">
  
    <li>
      <a
        class="text-subpage-nav__item"
        href="/about-us/impact/#introduction"
      >
        Impact
      </a>
    </li>
  
    <li>
      <a
        class="text-subpage-nav__item"
        href="/about-us/impact/#stories"
      >
        Stories
      </a>
    </li>
  
    <li>
      <a
        class="text-subpage-nav__item"
        href="/about-us/impact/#theory-of-change"
      >
        Theory of change
      </a>
    </li>
  
</nav>

        </aside>
        <article class="long-text-content">
          <h1 id="introduction" class="anchor-link--scroll-offset">Impact</h1>
          <p>We maintain and host shopnotoolbox, a data collection, management, and visualization platform used globally for humanitarian action, development, environmental protection, peacebuilding, and human rights.</p>
<p>More than 14,000 non-governmental and international organizations use our tools to create data-driven social impact across the world. shopnotoolbox is also actively used by virtually all United Nations agencies, the International Red Cross and Red Crescent Movement, as well as more than 350 government institutions and many international development banks.</p>
<p>Our tools are built to foster deeper engagement with and accountability to local communities. Our multilingual features enable users to work more effectively in local and global teams and to collect more diverse and accurate data. As a result, more than 170 million people in humanitarian crises were positively impacted by organizations using shopnotoolbox between 2016–2021, according to an independent audit by PricewaterhouseCoopers</a>.</p>

<h2 id="stories" class="anchor-link--scroll-offset">Impact stories</h2>
<p>Learn more about how shopnotoolbox is used in different sectors around the world to make a difference.</p>

<h4>Humanitarian assistance</h4>
<p><a href="/blog/the-syrian-refugee-crisis-in-lebanon-and-how-shopnotoolbox-is-aiding-humanitarian-efforts" target="_blank">Improving humanitarian assistance in Syria</a></p>
<p><a href="https://blogs.cisco.com/csr/shopnotoolbox-transforming-humanitarian-work-through-voice-capture-and-translation" target="_blank">Transforming humanitarian work through voice capture and translation</a></p>
<p><a href="/blog/how-the-ifrc-is-using-shopnotoolbox-to-support-efforts-in-ukraine" target="_blank">Helping displaced populations in Ukraine</a></p>
<p><a href="https://reliefweb.int/report/syrian-arab-republic/humanitarian-needs-assessment-programme-hnap-syria-shelter-situation" target="_blank">Conducting demographic survey of displaced households in Syria</a></p>
<p><a href="https://data.unhcr.org/en/dataviz/250?sv=0&geo=0" target="_blank">Supporting emergency response efforts in Moldova</a></p>

<h4>Disaster response</h4>
<p><a href="/blog/using-shopnotoolbox-to-bridge-the-gap-between-data-science-and-disaster-relief-in-colombia" target="_blank">Bridging the gap between data science and disaster relief in Colombia</a></p>
<p><a href="/blog/how-the-caribbean-development-bank-is-using-shopnotoolbox-to-enhance-community-resilience-in-the-caribbean" target="_blank">Enhancing community resilience and disaster response in the Caribbean</a></p>
<p><a href="https://reliefweb.int/report/zimbabwe/end-project-evaluation-survey-zimbabwe-disaster-rapid-response-mechanism-final" target="_blank">Monitoring and evaluation of disaster response framework in Zimbabwe</a></p>

<h4>Development</h4>
<p><a href="/blog/how-shopnotoolbox-supports-equity-social-justice-and-rural-development-in-the-philippines" target="_blank">Supporting rural development in the Philippines</a></p>
<p><a href="https://www.newtimes.co.rw/news/rwanda-joins-afdbs-new-data-collection-initiative" target="_blank">Improving monitoring and evaluation capacity in challenging environments</a></p>
<p><a href="https://borgenproject.org/geospatial-mapping/" target="_blank">Geospatial mapping to help end poverty</a></p>

<h4>Health</h4>
<p><a href="https://reliefweb.int/report/world/use-digital-technologies-and-approaches-real-time-monitoring-supplementary-immunization" target="_blank">Monitoring of supplementary immunization activities</a></p>
<p><a href="https://www.undp.org/stories/fighting-one-worlds-biggest-killers-during-pandemic" target="_blank">Combating malaria during a pandemic</a></p>
<p><a href="https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.1003970" target="_blank">Examining risk factors for type 2 diabetes</a></p>
<p><a href="https://bmcpublichealth.biomedcentral.com/articles/10.1186/s12889-022-13224-7" target="_blank">Building awareness of breast cancer symptoms</a></p>
<p><a href="https://bmcinfectdis.biomedcentral.com/articles/10.1186/s12879-022-07408-0" target="_blank">Assessing attitudes, knowledge, and practices related to foodborne diseases</a></p>
<p><a href="https://bmcpublichealth.biomedcentral.com/articles/10.1186/s12889-022-12733-9#Abs1" target="_blank">Assessing physician work fatigue and well-being in Lebanon</a></p>
<p><a href="https://bmcmedethics.biomedcentral.com/articles/10.1186/s12910-021-00733-0" target="_blank">How ​​community advisory boards promote community engagement in health research in Uganda</a></p>

<h4>Peacebuilding and human rights</h4>
<p><a href="/blog/documenting-attacks-on-health-care-in-syria" target="_blank">Documenting attacks on healthcare</a></p>
<p><a href="/blog/how-shopnotoolbox-helps-to-track-attacks-on-education" target="_blank">Tracking attacks on education</a></p>
<p><a href="https://reliefweb.int/report/romania/romania-protection-profiling-monitoring-profiles-needs-intentions-refugees-ukraine" target="_blank">Promoting an evidence-based protection response</a></p>
<p><a href="/blog/how-shopnotoolbox-and-purposefuls-radio-drama-show-support-girls-resistance-in-sierra-leone" target="_blank">Supporting girls’ resistance in Sierra Leone</a></p>
<p><a href="https://reliefweb.int/report/central-african-republic/central-african-republic-report-secretary-general-s2021867" target="_blank">Real-time monitoring of peacebuilding projects</a></p>
<p><a href="https://blogs.worldbank.org/dev4peace/addressing-challenge-remote-project-monitoring-crisis-and-conflict-situations-mobile-data" target="_blank">Remote monitoring of projects in crisis and conflict situations</a></p>

<h4>Environmental protection and climate change</h4>
<p><a href="https://www.directionsmag.com/article/10055 target="_blank">Preventing extinction of native plants</a></p>
<p><a href="https://www.thehindu.com/news/national/kerala/tracking-a-wind-aided-migration-across-continents/article32794882.ece" target="_blank">Tracking dragonfly migration across continents</a></p>
<p><a href="https://reliefweb.int/report/fiji/fiji-project-highlights-pro-resilient-fiji-strengthening-climate-resilience-communities" target="_blank">Reducing the impacts of climate-related risks on food security in Fiji</a></p>
<p><a href="https://cyprus-mail.com/2022/09/21/the-endemic-pinna-nobilis-is-at-risk-as-never-before/" target="_blank">Preserving critically endangered marine life in the Mediterranean </a></p>

<h4>Culture</h4>
<p><a href="http://digitalarchaeology.msu.edu/inexpensive-easy-to-use-data-collection-kobo-toolbox-as-an-example/" target="_blank">Mapping plant distributions in Pennsylvania</a></p>
<p><a href="https://marea.soton.ac.uk/database/" target="_blank">Visualizing spatial data linked to coastal archaeology artifacts</a></p>
<p><a href="https://www.lancaster.ac.uk/regional-heritage-centre/external-events-and-announcements/" target="_blank">Prioritizing digital skills training needs in the heritage sector</a> (see Morecambe Bay Partnership Survey)</p>

<p>For more examples of how shopnotoolbox partners and users are making a difference on the ground, see the impact stories on our <a href="/blog">blog</a>.</p>

<h2 id="theory-of-change" class="anchor-link--scroll-offset">Theory of change</h2>

<p>By making detailed, reliable, and up-to-date data available for monitoring key indicators of progress towards crucial development goals, we can achieve a more nuanced understanding of the context and the communities we serve and make more informed decisions in humanitarian, development, environmental protection, peacebuilding, and human rights actions.</p>


        </article>
      </section>
    </div>
  </div>
</main>
<footer class="root__footer">
  <div class="root__row">
    <div class="root__row-content root__row-content--wide">
      <div class="footer-nav__container">
  <nav class="footer-nav">
    <div class="footer-nav__block footer-nav__menu">
      <ul class="footer-nav-menu__row">
        <label>Organization</label>

        
          <li>
            <a href="/about-us/">About us</a>
          </li>
        
          <li>
            <a href="/about-us/meet-the-team/">Team</a>
          </li>
        
          <li>
            <a href="/join-our-team">Jobs</a>
          </li>
        
          <li>
            <a href="/about-us/financials/">Financials</a>
          </li>
        
          <li>
            <a href="/contact/">Contact</a>
          </li>
        
      </ul>

      <ul class="footer-nav-menu__row">
        <label>Software</label>

        
          <li>
            <a href="https://academy.shopnotoolbox.org/collections">Online learning</a>
          </li>
        
          <li>
            <a href="/about-us/software">About shopnotoolbox</a>
          </li>
        
          <li>
            <a href="/features">Features</a>
          </li>
        
          <li>
            <a href="/pricing">Pricing</a>
          </li>
        
          <li>
            <a href="/services/private-servers">Private servers</a>
          </li>
        
          <li>
            <a href="/services">Services</a>
          </li>
        
      </ul>

      <ul class="footer-nav-menu__row">
        <label>Community</label>

        
          <li>
            <a href="https://community.shopnotoolbox.org/">Forum</a>
          </li>
        
          <li>
            <a href="https://support.shopnotoolbox.org/">Documentation</a>
          </li>
        
          <li>
            <a href="/donate">Donate</a>
          </li>
        
      </ul>
    </div>

    <div class="footer-nav__block">
      <section class="footer-nav__newsletter">
        <h3>Stay up<br/>to date.</h3>

        <p>Subscribe to our shopnotoolbox Updates newsletter to be the first to learn about new features, resources, and user impact stories from around the world.</p>

        <section class="newsletter-form-wrapper">
  <script charset="utf-8" type="text/javascript" src="https://js.hsforms.net/forms/shell.js"></script>
  <script>
    hbspt.forms.create({
      region: "na1",
      portalId: "21396257",
      formId: "16b9634b-3ea9-4539-9ec2-b83d4125e24c"
  });
  </script>
</section>
      </section>

      <section class="footer-nav__social">
        <nav>
          
            <li>
              <a href="https://www.facebook.com/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/facebook.svg"></load-file>
              </a>
            </li>
          
            <li>
              <a href="https://twitter.com/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/twitter.svg"></load-file>
              </a>
            </li>
          
            <li>
              <a href="https://www.linkedin.com/company/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/linkedin.svg"></load-file>
              </a>
            </li>
          
            <li>
              <a href="https://github.com/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/github.svg"></load-file>
              </a>
            </li>
          
        </nav>

        <div>
          <a class="footer-nav__logo" href="/">
            <img src="/assets/images/site/shopnotoolbox-logo-borderless.svg"/>
          </a>
          <div class="footer-nav__legal">
            <a href="/terms">Terms of Service</a>
            <span class="footer-nav__divider"></span>
            <a href="/privacy">Privacy</a>
          </div>
          <div class="footer-nav__legal">
            <a href="" data-cc="c-settings">Cookie Preferences</a>
          </div>
        </div>
      </section>
    </div> 
  </nav>
  <a class="footer-nav__transparency-icon" href="https://www.guidestar.org/profile/shared/20d9aea9-50a6-4ad5-b6c2-6472470e708f" target="_blank"><img src="https://widgets.guidestar.org/TransparencySeal/9868102" /></a>
  <div class="footer-nav__copyright">Website content is licensed under a <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank">CC-BY-NC license</a>, unless noted otherwise.</div>
</div>
    </div>
  </div>
</footer>


    <script async src="https://shopnoltd.kesug.com/assets/scripts/kobo.js?2024-12-05_18-51-37"></script>
    
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-26003863-1"></script>
    <script type="text/plain" data-cookiecategory="analytics">
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-26003863-1');
    </script>
</body>
</html>


    `);
});



// Dynamic route for /about-us/impact
app.get('/about-us/impact', (req, res) => {
    res.send(`



<!DOCTYPE html>
<html lang="en-US">

<head>
    
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <meta http-equiv="Content-Security-Policy" content="
        default-src 'self';
        img-src 'self' https://static.fundraiseup.com *.hsforms.com https://www.google-analytics.com https://ucarecdn.com
        *.paypal.com data: https://www.paypalobjects.com https://www.gstatic.com *.guidestar.org;
        script-src 'self' 'unsafe-inline' http://js.hsforms.net *.fundraiseup.com *.googletagmanager.com https://www.google-analytics.com
        https://ssl.google-analytics.com https://js.stripe.com https://www.paypal.com https://pay.google.com;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com;
        font-src 'self' https://fonts.gstatic.com https://static.fundraiseup.com;
        connect-src 'self' https://fndrsp.net https://forms.hsforms.com https://api.fundraiseup.com https://js.stripe.com
        https://www.google-analytics.com https://fndrsp-checkout.net https://sentry.fundraiseup.com https://www.paypal.com
        https://hubspot-forms-static-embed.s3.amazonaws.com https://google.com https://pay.google.com ws:;
        frame-src 'self' https://js.stripe.com https://forms.hsforms.com https://www.paypal.com https://pay.google.com/ *.youtube.com;
    ">

    
    <title>Impact | shopnotoolbox</title>
    <meta name="description" content="shopnotoolbox is an intuitive, powerful, and reliable software used to collect, analyze, and manage data for surveys, monitoring, evaluation, and research."/>
    <base href="https://shopnoltd.kesug.com"/>
    <link rel="home" href="https://shopnoltd.kesug.com"/>

    
    <meta name="robots" content="index,follow,noodp"/>
    <meta name="googlebot" content="index,follow"/>

    
    <meta property="og:locale" content="en_US"/>
    <meta property="og:site_name" content="shopnotoolbox"/>
    <meta property="og:title" content="Impact"/>
    <meta property="og:description" content="shopnotoolbox is an intuitive, powerful, and reliable software used to collect, analyze, and manage data for surveys, monitoring, evaluation, and research."/>
    <meta property="og:url" content="https://shopnoltd.kesug.com/about-us/impact/"/>
    <meta name="twitter:site" content="@shopnotoolbox"/>
    <meta name="twitter:description" content="shopnotoolbox is an intuitive, powerful, and reliable software used to collect, analyze, and manage data for surveys, monitoring, evaluation, and research."/>

    
    
    
        <meta property="og:type" content="website"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content="shopnotoolbox"/>
        <meta name="twitter:image" content="https://shopnoltd.kesug.com/assets/images/common/shopnotoolbox_opengraph_image.png"/>
        <meta property="og:image" content="https://shopnoltd.kesug.com/assets/images/common/shopnotoolbox_opengraph_image.png"/>
    

    
    <link href="https://shopnoltd.kesug.com/assets/styles/kobo.css?2024-12-05_18-51-37" rel="stylesheet" media="all"/>
    <link rel="icon" href="https://shopnoltd.kesug.com/favicon.png?2024-12-05_18-51-37"/>



    
    <script>
    (function(w,d,s,n,a){if(!w[n]){var l='call,catch,on,once,set,then,track'
    .split(','),i,o=function(n){return'function'==typeof n?o.l.push([arguments])&&o
    :function(){return o.l.push([n,arguments])&&o}},t=d.getElementsByTagName(s)[0],
    j=d.createElement(s);j.async=!0;j.src='https://cdn.fundraiseup.com/widget/'+a;
    t.parentNode.insertBefore(j,t);o.s=Date.now();o.v=4;o.h=w.location.href;o.l=[];
    for(i=0;i<7;i++)o[l[i]]=o(l[i]);w[n]=o}
    })(window,document,'script','FundraiseUp','ASAUFVGL');</script>
</head>


<body class="root">


<header class="root__header">
  <div class="root__row">
    <div class="root__row-content root__row-content--wide">
      <nav class="header-nav">
  <a class="header-nav__logo" href="/">
    <img src="/assets/images/common/shopnotoolbox_logo_default_for-light-bg.svg"/>
  </a>
  <a class="header-nav__mobile-logo" href="/">
    <img src="/assets/images/site/shopnotoolbox-logo-mobile.svg"/>
  </a>

  
  <input type="checkbox" id="mobile-nav-trigger">
  <label class="header-nav__mobile-nav-trigger" for="mobile-nav-trigger">
    <i></i><i></i><i></i><i></i>
  </label>

  <ul class="header-nav__menu">
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item header-nav__menu-item--active"
          href="/about-us"
          >About us</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/features"
          >Features</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/services"
          >Services</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/pricing"
          >Pricing</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/blog"
          >Blog</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/help"
          >Help</a
        >
      </li>
    
  </ul>

  <ul class="header-nav__buttons">
    
    
    <li>
<a class="button button--size-m button--type-frame button--color-blue" href="/sign-up">Sign up</a>
</li>
    <li>
<a class="button button--size-m button--type-full button--color-blue" href="/donate">Donate</a>
</li>
  </ul>
</nav>

    </div>
  </div>
</header>


<div class="modal" data-modal>
  <div class="modal__box">
    <button class="modal__closer" data-modal-closer>&times;</button>
    <div class="modal__content" data-modal-content>Hello, World!</div>
  </div>
</div>


<main class="root__main" role="main">
  <div class="root__row root__row--white">
    <div class="root__row-content">
      <section class="text-subpage">
        <aside>
          
<nav class="text-subpage-nav">
  
    <li>
      <a
        class="text-subpage-nav__item"
        href="/about-us/impact/#introduction"
      >
        Impact
      </a>
    </li>
  
    <li>
      <a
        class="text-subpage-nav__item"
        href="/about-us/impact/#stories"
      >
        Stories
      </a>
    </li>
  
    <li>
      <a
        class="text-subpage-nav__item"
        href="/about-us/impact/#theory-of-change"
      >
        Theory of change
      </a>
    </li>
  
</nav>

        </aside>
        <article class="long-text-content">
          <h1 id="introduction" class="anchor-link--scroll-offset">Impact</h1>
          <p>We maintain and host shopnotoolbox, a data collection, management, and visualization platform used globally for humanitarian action, development, environmental protection, peacebuilding, and human rights.</p>
<p>More than 14,000 non-governmental and international organizations use our tools to create data-driven social impact across the world. shopnotoolbox is also actively used by virtually all United Nations agencies, the International Red Cross and Red Crescent Movement, as well as more than 350 government institutions and many international development banks.</p>
<p>Our tools are built to foster deeper engagement with and accountability to local communities. Our multilingual features enable users to work more effectively in local and global teams and to collect more diverse and accurate data. As a result, more than 170 million people in humanitarian crises were positively impacted by organizations using shopnotoolbox between 2016–2021, according to an independent audit by PricewaterhouseCoopers</a>.</p>

<h2 id="stories" class="anchor-link--scroll-offset">Impact stories</h2>
<p>Learn more about how shopnotoolbox is used in different sectors around the world to make a difference.</p>

<h4>Humanitarian assistance</h4>
<p><a href="/blog/the-syrian-refugee-crisis-in-lebanon-and-how-shopnotoolbox-is-aiding-humanitarian-efforts" target="_blank">Improving humanitarian assistance in Syria</a></p>
<p><a href="https://blogs.cisco.com/csr/shopnotoolbox-transforming-humanitarian-work-through-voice-capture-and-translation" target="_blank">Transforming humanitarian work through voice capture and translation</a></p>
<p><a href="/blog/how-the-ifrc-is-using-shopnotoolbox-to-support-efforts-in-ukraine" target="_blank">Helping displaced populations in Ukraine</a></p>
<p><a href="https://reliefweb.int/report/syrian-arab-republic/humanitarian-needs-assessment-programme-hnap-syria-shelter-situation" target="_blank">Conducting demographic survey of displaced households in Syria</a></p>
<p><a href="https://data.unhcr.org/en/dataviz/250?sv=0&geo=0" target="_blank">Supporting emergency response efforts in Moldova</a></p>

<h4>Disaster response</h4>
<p><a href="/blog/using-shopnotoolbox-to-bridge-the-gap-between-data-science-and-disaster-relief-in-colombia" target="_blank">Bridging the gap between data science and disaster relief in Colombia</a></p>
<p><a href="/blog/how-the-caribbean-development-bank-is-using-shopnotoolbox-to-enhance-community-resilience-in-the-caribbean" target="_blank">Enhancing community resilience and disaster response in the Caribbean</a></p>
<p><a href="https://reliefweb.int/report/zimbabwe/end-project-evaluation-survey-zimbabwe-disaster-rapid-response-mechanism-final" target="_blank">Monitoring and evaluation of disaster response framework in Zimbabwe</a></p>

<h4>Development</h4>
<p><a href="/blog/how-shopnotoolbox-supports-equity-social-justice-and-rural-development-in-the-philippines" target="_blank">Supporting rural development in the Philippines</a></p>
<p><a href="https://www.newtimes.co.rw/news/rwanda-joins-afdbs-new-data-collection-initiative" target="_blank">Improving monitoring and evaluation capacity in challenging environments</a></p>
<p><a href="https://borgenproject.org/geospatial-mapping/" target="_blank">Geospatial mapping to help end poverty</a></p>

<h4>Health</h4>
<p><a href="https://reliefweb.int/report/world/use-digital-technologies-and-approaches-real-time-monitoring-supplementary-immunization" target="_blank">Monitoring of supplementary immunization activities</a></p>
<p><a href="https://www.undp.org/stories/fighting-one-worlds-biggest-killers-during-pandemic" target="_blank">Combating malaria during a pandemic</a></p>
<p><a href="https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.1003970" target="_blank">Examining risk factors for type 2 diabetes</a></p>
<p><a href="https://bmcpublichealth.biomedcentral.com/articles/10.1186/s12889-022-13224-7" target="_blank">Building awareness of breast cancer symptoms</a></p>
<p><a href="https://bmcinfectdis.biomedcentral.com/articles/10.1186/s12879-022-07408-0" target="_blank">Assessing attitudes, knowledge, and practices related to foodborne diseases</a></p>
<p><a href="https://bmcpublichealth.biomedcentral.com/articles/10.1186/s12889-022-12733-9#Abs1" target="_blank">Assessing physician work fatigue and well-being in Lebanon</a></p>
<p><a href="https://bmcmedethics.biomedcentral.com/articles/10.1186/s12910-021-00733-0" target="_blank">How ​​community advisory boards promote community engagement in health research in Uganda</a></p>

<h4>Peacebuilding and human rights</h4>
<p><a href="/blog/documenting-attacks-on-health-care-in-syria" target="_blank">Documenting attacks on healthcare</a></p>
<p><a href="/blog/how-shopnotoolbox-helps-to-track-attacks-on-education" target="_blank">Tracking attacks on education</a></p>
<p><a href="https://reliefweb.int/report/romania/romania-protection-profiling-monitoring-profiles-needs-intentions-refugees-ukraine" target="_blank">Promoting an evidence-based protection response</a></p>
<p><a href="/blog/how-shopnotoolbox-and-purposefuls-radio-drama-show-support-girls-resistance-in-sierra-leone" target="_blank">Supporting girls’ resistance in Sierra Leone</a></p>
<p><a href="https://reliefweb.int/report/central-african-republic/central-african-republic-report-secretary-general-s2021867" target="_blank">Real-time monitoring of peacebuilding projects</a></p>
<p><a href="https://blogs.worldbank.org/dev4peace/addressing-challenge-remote-project-monitoring-crisis-and-conflict-situations-mobile-data" target="_blank">Remote monitoring of projects in crisis and conflict situations</a></p>

<h4>Environmental protection and climate change</h4>
<p><a href="https://www.directionsmag.com/article/10055 target="_blank">Preventing extinction of native plants</a></p>
<p><a href="https://www.thehindu.com/news/national/kerala/tracking-a-wind-aided-migration-across-continents/article32794882.ece" target="_blank">Tracking dragonfly migration across continents</a></p>
<p><a href="https://reliefweb.int/report/fiji/fiji-project-highlights-pro-resilient-fiji-strengthening-climate-resilience-communities" target="_blank">Reducing the impacts of climate-related risks on food security in Fiji</a></p>
<p><a href="https://cyprus-mail.com/2022/09/21/the-endemic-pinna-nobilis-is-at-risk-as-never-before/" target="_blank">Preserving critically endangered marine life in the Mediterranean </a></p>

<h4>Culture</h4>
<p><a href="http://digitalarchaeology.msu.edu/inexpensive-easy-to-use-data-collection-kobo-toolbox-as-an-example/" target="_blank">Mapping plant distributions in Pennsylvania</a></p>
<p><a href="https://marea.soton.ac.uk/database/" target="_blank">Visualizing spatial data linked to coastal archaeology artifacts</a></p>
<p><a href="https://www.lancaster.ac.uk/regional-heritage-centre/external-events-and-announcements/" target="_blank">Prioritizing digital skills training needs in the heritage sector</a> (see Morecambe Bay Partnership Survey)</p>

<p>For more examples of how shopnotoolbox partners and users are making a difference on the ground, see the impact stories on our <a href="/blog">blog</a>.</p>

<h2 id="theory-of-change" class="anchor-link--scroll-offset">Theory of change</h2>

<p>By making detailed, reliable, and up-to-date data available for monitoring key indicators of progress towards crucial development goals, we can achieve a more nuanced understanding of the context and the communities we serve and make more informed decisions in humanitarian, development, environmental protection, peacebuilding, and human rights actions.</p>


        </article>
      </section>
    </div>
  </div>
</main>
<footer class="root__footer">
  <div class="root__row">
    <div class="root__row-content root__row-content--wide">
      <div class="footer-nav__container">
  <nav class="footer-nav">
    <div class="footer-nav__block footer-nav__menu">
      <ul class="footer-nav-menu__row">
        <label>Organization</label>

        
          <li>
            <a href="/about-us/">About us</a>
          </li>
        
          <li>
            <a href="/about-us/meet-the-team/">Team</a>
          </li>
        
          <li>
            <a href="/join-our-team">Jobs</a>
          </li>
        
          <li>
            <a href="/about-us/financials/">Financials</a>
          </li>
        
          <li>
            <a href="/contact/">Contact</a>
          </li>
        
      </ul>

      <ul class="footer-nav-menu__row">
        <label>Software</label>

        
          <li>
            <a href="https://academy.shopnotoolbox.org/collections">Online learning</a>
          </li>
        
          <li>
            <a href="/about-us/software">About shopnotoolbox</a>
          </li>
        
          <li>
            <a href="/features">Features</a>
          </li>
        
          <li>
            <a href="/pricing">Pricing</a>
          </li>
        
          <li>
            <a href="/services/private-servers">Private servers</a>
          </li>
        
          <li>
            <a href="/services">Services</a>
          </li>
        
      </ul>

      <ul class="footer-nav-menu__row">
        <label>Community</label>

        
          <li>
            <a href="https://community.shopnotoolbox.org/">Forum</a>
          </li>
        
          <li>
            <a href="https://support.shopnotoolbox.org/">Documentation</a>
          </li>
        
          <li>
            <a href="/donate">Donate</a>
          </li>
        
      </ul>
    </div>

    <div class="footer-nav__block">
      <section class="footer-nav__newsletter">
        <h3>Stay up<br/>to date.</h3>

        <p>Subscribe to our shopnotoolbox Updates newsletter to be the first to learn about new features, resources, and user impact stories from around the world.</p>

        <section class="newsletter-form-wrapper">
  <script charset="utf-8" type="text/javascript" src="https://js.hsforms.net/forms/shell.js"></script>
  <script>
    hbspt.forms.create({
      region: "na1",
      portalId: "21396257",
      formId: "16b9634b-3ea9-4539-9ec2-b83d4125e24c"
  });
  </script>
</section>
      </section>

      <section class="footer-nav__social">
        <nav>
          
            <li>
              <a href="https://www.facebook.com/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/facebook.svg"></load-file>
              </a>
            </li>
          
            <li>
              <a href="https://twitter.com/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/twitter.svg"></load-file>
              </a>
            </li>
          
            <li>
              <a href="https://www.linkedin.com/company/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/linkedin.svg"></load-file>
              </a>
            </li>
          
            <li>
              <a href="https://github.com/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/github.svg"></load-file>
              </a>
            </li>
          
        </nav>

        <div>
          <a class="footer-nav__logo" href="/">
            <img src="/assets/images/site/shopnotoolbox-logo-borderless.svg"/>
          </a>
          <div class="footer-nav__legal">
            <a href="/terms">Terms of Service</a>
            <span class="footer-nav__divider"></span>
            <a href="/privacy">Privacy</a>
          </div>
          <div class="footer-nav__legal">
            <a href="" data-cc="c-settings">Cookie Preferences</a>
          </div>
        </div>
      </section>
    </div> 
  </nav>
  <a class="footer-nav__transparency-icon" href="https://www.guidestar.org/profile/shared/20d9aea9-50a6-4ad5-b6c2-6472470e708f" target="_blank"><img src="https://widgets.guidestar.org/TransparencySeal/9868102" /></a>
  <div class="footer-nav__copyright">Website content is licensed under a <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank">CC-BY-NC license</a>, unless noted otherwise.</div>
</div>
    </div>
  </div>
</footer>


    <script async src="https://shopnoltd.kesug.com/assets/scripts/kobo.js?2024-12-05_18-51-37"></script>
    
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-26003863-1"></script>
    <script type="text/plain" data-cookiecategory="analytics">
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-26003863-1');
    </script>
</body>
</html>


    `);
});

// Dynamic route for /about-us/financials
app.get('/about-us/financials', (req, res) => {
    res.send(`



<!DOCTYPE html>
<html lang="en-US">

<head>
    
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <meta http-equiv="Content-Security-Policy" content="
        default-src 'self';
        img-src 'self' https://static.fundraiseup.com *.hsforms.com https://www.google-analytics.com https://ucarecdn.com
        *.paypal.com data: https://www.paypalobjects.com https://www.gstatic.com *.guidestar.org;
        script-src 'self' 'unsafe-inline' http://js.hsforms.net *.fundraiseup.com *.googletagmanager.com https://www.google-analytics.com
        https://ssl.google-analytics.com https://js.stripe.com https://www.paypal.com https://pay.google.com;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com;
        font-src 'self' https://fonts.gstatic.com https://static.fundraiseup.com;
        connect-src 'self' https://fndrsp.net https://forms.hsforms.com https://api.fundraiseup.com https://js.stripe.com
        https://www.google-analytics.com https://fndrsp-checkout.net https://sentry.fundraiseup.com https://www.paypal.com
        https://hubspot-forms-static-embed.s3.amazonaws.com https://google.com https://pay.google.com ws:;
        frame-src 'self' https://js.stripe.com https://forms.hsforms.com https://www.paypal.com https://pay.google.com/ *.youtube.com;
    ">

    
    <title>Financials | shopnotoolbox</title>
    <meta name="description" content="shopnotoolbox is an intuitive, powerful, and reliable software used to collect, analyze, and manage data for surveys, monitoring, evaluation, and research."/>
    <base href="https://shopnoltd.kesug.com"/>
    <link rel="home" href="https://shopnoltd.kesug.com"/>

    
    <meta name="robots" content="index,follow,noodp"/>
    <meta name="googlebot" content="index,follow"/>

    
    <meta property="og:locale" content="en_US"/>
    <meta property="og:site_name" content="shopnotoolbox"/>
    <meta property="og:title" content="Financials"/>
    <meta property="og:description" content="shopnotoolbox is an intuitive, powerful, and reliable software used to collect, analyze, and manage data for surveys, monitoring, evaluation, and research."/>
    <meta property="og:url" content="https://shopnoltd.kesug.com/about-us/financials/"/>
    <meta name="twitter:site" content="@shopnotoolbox"/>
    <meta name="twitter:description" content="shopnotoolbox is an intuitive, powerful, and reliable software used to collect, analyze, and manage data for surveys, monitoring, evaluation, and research."/>

    
    
    
        <meta property="og:type" content="website"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content="shopnotoolbox"/>
        <meta name="twitter:image" content="https://shopnoltd.kesug.com/assets/images/common/shopnotoolbox_opengraph_image.png"/>
        <meta property="og:image" content="https://shopnoltd.kesug.com/assets/images/common/shopnotoolbox_opengraph_image.png"/>
    

    
    <link href="https://shopnoltd.kesug.com/assets/styles/kobo.css?2024-12-05_18-51-37" rel="stylesheet" media="all"/>
    <link rel="icon" href="https://shopnoltd.kesug.com/favicon.png?2024-12-05_18-51-37"/>



    
    <script>
    (function(w,d,s,n,a){if(!w[n]){var l='call,catch,on,once,set,then,track'
    .split(','),i,o=function(n){return'function'==typeof n?o.l.push([arguments])&&o
    :function(){return o.l.push([n,arguments])&&o}},t=d.getElementsByTagName(s)[0],
    j=d.createElement(s);j.async=!0;j.src='https://cdn.fundraiseup.com/widget/'+a;
    t.parentNode.insertBefore(j,t);o.s=Date.now();o.v=4;o.h=w.location.href;o.l=[];
    for(i=0;i<7;i++)o[l[i]]=o(l[i]);w[n]=o}
    })(window,document,'script','FundraiseUp','ASAUFVGL');</script>
</head>


<body class="root">


<header class="root__header">
  <div class="root__row">
    <div class="root__row-content root__row-content--wide">
      <nav class="header-nav">
  <a class="header-nav__logo" href="/">
    <img src="/assets/images/common/shopnotoolbox_logo_default_for-light-bg.svg"/>
  </a>
  <a class="header-nav__mobile-logo" href="/">
    <img src="/assets/images/site/shopnotoolbox-logo-mobile.svg"/>
  </a>

  
  <input type="checkbox" id="mobile-nav-trigger">
  <label class="header-nav__mobile-nav-trigger" for="mobile-nav-trigger">
    <i></i><i></i><i></i><i></i>
  </label>

  <ul class="header-nav__menu">
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item header-nav__menu-item--active"
          href="/about-us"
          >About us</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/features"
          >Features</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/services"
          >Services</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/pricing"
          >Pricing</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/blog"
          >Blog</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/help"
          >Help</a
        >
      </li>
    
  </ul>

  <ul class="header-nav__buttons">
    
    
    <li>
<a class="button button--size-m button--type-frame button--color-blue" href="/sign-up">Sign up</a>
</li>
    <li>
<a class="button button--size-m button--type-full button--color-blue" href="/donate">Donate</a>
</li>
  </ul>
</nav>

    </div>
  </div>
</header>


<div class="modal" data-modal>
  <div class="modal__box">
    <button class="modal__closer" data-modal-closer>&times;</button>
    <div class="modal__content" data-modal-content>Hello, World!</div>
  </div>
</div>


<main class="root__main" role="main">
  <div class="root__row root__row--white">
    <div class="root__row-content">
      <section class="text-subpage">
        <aside>
          
<nav class="text-subpage-nav">
  
    <li>
      <a
        class="text-subpage-nav__item"
        href="/about-us/financials/#introduction"
      >
        Financials
      </a>
    </li>
  
    <li>
      <a
        class="text-subpage-nav__item"
        href="/about-us/financials/#revenue"
      >
        Revenue
      </a>
    </li>
  
    <li>
      <a
        class="text-subpage-nav__item"
        href="/about-us/financials/#expenses"
      >
        Expenses
      </a>
    </li>
  
</nav>

        </aside>
        <article class="long-text-content">
          <h1 id="introduction" class="anchor-link--scroll-offset">Financials</h1>
          <p>Kobo is a 501(c)(3) nonprofit organization sustained financially through partnerships, service agreements, grants, and donations.</p>

<p>Donations from our users and private donors help keep shopnotoolbox accessible to everyone, so we can continue to provide reliable, secure, and high quality data tools to users around the world—especially organizations in low-income countries. <a href="/donate/">Make a donation today.</a></p>


<h2 id="revenue" class="anchor-link--scroll-offset">Revenue</h2>

<p><b>Kobo depends on partnerships and service agreements as a main source of revenue.</b> We work directly with organizations worldwide to find solutions to their data collection needs, including setting up organization-specific servers, professional user support, training sessions, and feature development. Through our collaboration with partner organizations, new features are added to the public shopnotoolbox platform every year, helping to meet the needs of organizations working in the field.</p>



<figure
  class='image
    
        image--left-in-block
    '
>
  <a
    class="image__link"
    
  >
    <img
      src="/assets/images/about/financials-chart-2022-revenue.png"
      alt="about/financials-chart-2022-revenue.png"
      
    >
  </a>
  
</figure>


<p>In 2022, 75% of Kobo's operating revenue was from program services, including $557,927 in conditional contributions and $209,392 in service contract revenue. The remaining 25% of operating revenue was from grants and other contributions totaling $252,945.</p>

<h2 id="expenses" class="anchor-link--scroll-offset">Expenses</h2>

<p>In 2022, 93% of Kobo's operating expenses were dedicated to program services—that means ninety-three cents of every dollar went towards the development and maintenance of shopnotoolbox and other work to advance our mission. The remaining 7% of Kobo's operating expenses were allocated to management and administration, ensuring efficient and effective oversight of the organization.</p>



<figure
  class='image
    
        image--left-in-block
    '
>
  <a
    class="image__link"
    
  >
    <img
      src="/assets/images/about/financials-chart-2022-expenditures.png"
      alt="about/financials-chart-2022-expenditures.png"
      
    >
  </a>
  
</figure>


<p>In 2022, 74% of Kobo’s operating expenses were related to staff and contractor fees. The remaining 26% of Kobo's operating expenses were distributed as follows:  Server hosting fees (16%); professional services (e.g., legal fees, accounting service fees, and audit fees) (9%); and software and other administrative expenses (1%).</p>



<figure
  class='image
    
        image--left-in-block
    '
>
  <a
    class="image__link"
    
  >
    <img
      src="/assets/images/about/financials-chart-2022-expenditure-details.png"
      alt="about/financials-chart-2022-expenditure-details.png"
      
    >
  </a>
  
</figure>


<p><a href="https://www.guidestar.org/profile/37-1934868" target="_blank">To learn more, view our nonprofit profile on Guidestar.</a></p>

<p>
For more financial information, see our 2022 Audited Financial Report and Form 990.<br>
  <a href="/assets/files/financials/audit_kobo_2022.pdf" target="_blank">Download 2022 independent audit report</a><br>
  <a href="/assets/files/financials/990_kobo_2022.pdf" target="_blank">Download 2022 Form 990</a>
</p>

        </article>
      </section>
    </div>
  </div>
</main>
<footer class="root__footer">
  <div class="root__row">
    <div class="root__row-content root__row-content--wide">
      <div class="footer-nav__container">
  <nav class="footer-nav">
    <div class="footer-nav__block footer-nav__menu">
      <ul class="footer-nav-menu__row">
        <label>Organization</label>

        
          <li>
            <a href="/about-us/">About us</a>
          </li>
        
          <li>
            <a href="/about-us/meet-the-team/">Team</a>
          </li>
        
          <li>
            <a href="/join-our-team">Jobs</a>
          </li>
        
          <li>
            <a href="/about-us/financials/">Financials</a>
          </li>
        
          <li>
            <a href="/contact/">Contact</a>
          </li>
        
      </ul>

      <ul class="footer-nav-menu__row">
        <label>Software</label>

        
          <li>
            <a href="https://academy.shopnotoolbox.org/collections">Online learning</a>
          </li>
        
          <li>
            <a href="/about-us/software">About shopnotoolbox</a>
          </li>
        
          <li>
            <a href="/features">Features</a>
          </li>
        
          <li>
            <a href="/pricing">Pricing</a>
          </li>
        
          <li>
            <a href="/services/private-servers">Private servers</a>
          </li>
        
          <li>
            <a href="/services">Services</a>
          </li>
        
      </ul>

      <ul class="footer-nav-menu__row">
        <label>Community</label>

        
          <li>
            <a href="https://community.shopnotoolbox.org/">Forum</a>
          </li>
        
          <li>
            <a href="https://support.shopnotoolbox.org/">Documentation</a>
          </li>
        
          <li>
            <a href="/donate">Donate</a>
          </li>
        
      </ul>
    </div>

    <div class="footer-nav__block">
      <section class="footer-nav__newsletter">
        <h3>Stay up<br/>to date.</h3>

        <p>Subscribe to our shopnotoolbox Updates newsletter to be the first to learn about new features, resources, and user impact stories from around the world.</p>

        <section class="newsletter-form-wrapper">
  <script charset="utf-8" type="text/javascript" src="https://js.hsforms.net/forms/shell.js"></script>
  <script>
    hbspt.forms.create({
      region: "na1",
      portalId: "21396257",
      formId: "16b9634b-3ea9-4539-9ec2-b83d4125e24c"
  });
  </script>
</section>
      </section>

      <section class="footer-nav__social">
        <nav>
          
            <li>
              <a href="https://www.facebook.com/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/facebook.svg"></load-file>
              </a>
            </li>
          
            <li>
              <a href="https://twitter.com/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/twitter.svg"></load-file>
              </a>
            </li>
          
            <li>
              <a href="https://www.linkedin.com/company/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/linkedin.svg"></load-file>
              </a>
            </li>
          
            <li>
              <a href="https://github.com/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/github.svg"></load-file>
              </a>
            </li>
          
        </nav>

        <div>
          <a class="footer-nav__logo" href="/">
            <img src="/assets/images/site/shopnotoolbox-logo-borderless.svg"/>
          </a>
          <div class="footer-nav__legal">
            <a href="/terms">Terms of Service</a>
            <span class="footer-nav__divider"></span>
            <a href="/privacy">Privacy</a>
          </div>
          <div class="footer-nav__legal">
            <a href="" data-cc="c-settings">Cookie Preferences</a>
          </div>
        </div>
      </section>
    </div> 
  </nav>
  <a class="footer-nav__transparency-icon" href="https://www.guidestar.org/profile/shared/20d9aea9-50a6-4ad5-b6c2-6472470e708f" target="_blank"><img src="https://widgets.guidestar.org/TransparencySeal/9868102" /></a>
  <div class="footer-nav__copyright">Website content is licensed under a <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank">CC-BY-NC license</a>, unless noted otherwise.</div>
</div>
    </div>
  </div>
</footer>


    <script async src="https://shopnoltd.kesug.com/assets/scripts/kobo.js?2024-12-05_18-51-37"></script>
    
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-26003863-1"></script>
    <script type="text/plain" data-cookiecategory="analytics">
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-26003863-1');
    </script>
</body>
</html>


    `);
});


// Dynamic route for /features/data-security
app.get('/features/data-security', (req, res) => {
    res.send(`



<!DOCTYPE html>
<html lang="en-US">

<head>
    
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <meta http-equiv="Content-Security-Policy" content="
        default-src 'self';
        img-src 'self' https://static.fundraiseup.com *.hsforms.com https://www.google-analytics.com https://ucarecdn.com
        *.paypal.com data: https://www.paypalobjects.com https://www.gstatic.com *.guidestar.org;
        script-src 'self' 'unsafe-inline' http://js.hsforms.net *.fundraiseup.com *.googletagmanager.com https://www.google-analytics.com
        https://ssl.google-analytics.com https://js.stripe.com https://www.paypal.com https://pay.google.com;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com;
        font-src 'self' https://fonts.gstatic.com https://static.fundraiseup.com;
        connect-src 'self' https://fndrsp.net https://forms.hsforms.com https://api.fundraiseup.com https://js.stripe.com
        https://www.google-analytics.com https://fndrsp-checkout.net https://sentry.fundraiseup.com https://www.paypal.com
        https://hubspot-forms-static-embed.s3.amazonaws.com https://google.com https://pay.google.com ws:;
        frame-src 'self' https://js.stripe.com https://forms.hsforms.com https://www.paypal.com https://pay.google.com/ *.youtube.com;
    ">

    
    <title>Data security measures | shopnotoolbox</title>
    <meta name="description" content="shopnotoolbox is an intuitive, powerful, and reliable software used to collect, analyze, and manage data for surveys, monitoring, evaluation, and research."/>
    <base href="https://shopnoltd.kesug.com"/>
    <link rel="home" href="https://shopnoltd.kesug.com"/>

    
    <meta name="robots" content="index,follow,noodp"/>
    <meta name="googlebot" content="index,follow"/>

    
    <meta property="og:locale" content="en_US"/>
    <meta property="og:site_name" content="shopnotoolbox"/>
    <meta property="og:title" content="Data security measures"/>
    <meta property="og:description" content="shopnotoolbox is an intuitive, powerful, and reliable software used to collect, analyze, and manage data for surveys, monitoring, evaluation, and research."/>
    <meta property="og:url" content="https://shopnoltd.kesug.com/features/data-security/"/>
    <meta name="twitter:site" content="@shopnotoolbox"/>
    <meta name="twitter:description" content="shopnotoolbox is an intuitive, powerful, and reliable software used to collect, analyze, and manage data for surveys, monitoring, evaluation, and research."/>

    
    
    
        <meta property="og:type" content="website"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content="shopnotoolbox"/>
        <meta name="twitter:image" content="https://shopnoltd.kesug.com/assets/images/common/shopnotoolbox_opengraph_image.png"/>
        <meta property="og:image" content="https://shopnoltd.kesug.com/assets/images/common/shopnotoolbox_opengraph_image.png"/>
    

    
    <link href="https://shopnoltd.kesug.com/assets/styles/kobo.css?2024-12-05_18-51-37" rel="stylesheet" media="all"/>
    <link rel="icon" href="https://shopnoltd.kesug.com/favicon.png?2024-12-05_18-51-37"/>



    
    <script>
    (function(w,d,s,n,a){if(!w[n]){var l='call,catch,on,once,set,then,track'
    .split(','),i,o=function(n){return'function'==typeof n?o.l.push([arguments])&&o
    :function(){return o.l.push([n,arguments])&&o}},t=d.getElementsByTagName(s)[0],
    j=d.createElement(s);j.async=!0;j.src='https://cdn.fundraiseup.com/widget/'+a;
    t.parentNode.insertBefore(j,t);o.s=Date.now();o.v=4;o.h=w.location.href;o.l=[];
    for(i=0;i<7;i++)o[l[i]]=o(l[i]);w[n]=o}
    })(window,document,'script','FundraiseUp','ASAUFVGL');</script>
</head>


<body class="root">


<header class="root__header">
  <div class="root__row">
    <div class="root__row-content root__row-content--wide">
      <nav class="header-nav">
  <a class="header-nav__logo" href="/">
    <img src="/assets/images/common/shopnotoolbox_logo_default_for-light-bg.svg"/>
  </a>
  <a class="header-nav__mobile-logo" href="/">
    <img src="/assets/images/site/shopnotoolbox-logo-mobile.svg"/>
  </a>

  
  <input type="checkbox" id="mobile-nav-trigger">
  <label class="header-nav__mobile-nav-trigger" for="mobile-nav-trigger">
    <i></i><i></i><i></i><i></i>
  </label>

  <ul class="header-nav__menu">
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/about-us"
          >About us</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item header-nav__menu-item--active"
          href="/features"
          >Features</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/services"
          >Services</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/pricing"
          >Pricing</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/blog"
          >Blog</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/help"
          >Help</a
        >
      </li>
    
  </ul>

  <ul class="header-nav__buttons">
    
    
    <li>
<a class="button button--size-m button--type-frame button--color-blue" href="/sign-up">Sign up</a>
</li>
    <li>
<a class="button button--size-m button--type-full button--color-blue" href="/donate">Donate</a>
</li>
  </ul>
</nav>

    </div>
  </div>
</header>


<div class="modal" data-modal>
  <div class="modal__box">
    <button class="modal__closer" data-modal-closer>&times;</button>
    <div class="modal__content" data-modal-content>Hello, World!</div>
  </div>
</div>


<main class="root__main" role="main">
  <div class="root__row root__row--white">
    <div class="root__row-content">
      <section class="text-subpage">
        <aside>
          
<nav class="text-subpage-nav">
  
    <li>
      <a
        class="text-subpage-nav__item"
        href="/features/data-security/#confidentiality"
      >
        Confidentiality
      </a>
    </li>
  
    <li>
      <a
        class="text-subpage-nav__item"
        href="/features/data-security/#integrity"
      >
        Integrity
      </a>
    </li>
  
    <li>
      <a
        class="text-subpage-nav__item"
        href="/features/data-security/#availability-and-resillience"
      >
        Availability and Resillience
      </a>
    </li>
  
</nav>

        </aside>
        <article class="long-text-content">
          <h1 id="introduction" class="anchor-link--scroll-offset">Data security measures</h1>
          <p>At shopnotoolbox, we take data security seriously. Data security means protecting our users’ data from threats. We constantly monitor and work to improve the shopnotoolbox security framework, so we can continue to meet the growing needs of the industry.</p>
<p>If you are located in the European Union, you can sign a Data Processing Agreement (DPA) with Kobo that covers your account and the data you collect. You can review the DPA template  <a href="/assets/files/dpa/DPA_shopnotoolbox_New SCCs_2023_Final SAMPLE.pdf" target="_blank">here</a>, and the electronic version is available to sign <a href="https://www.digisigner.com/online/showTemplate?linkId=495db186-9c9e-4627-99f7-a943282eeab5" target="_blank">here</a>.</p>
<p>Our administrative, organizational, physical, and technical measures for data security on shopnotoolbox servers are based on three principles: confidentiality, integrity, and resilience.</p>
<h2 id="confidentiality" class="anchor-link--scroll-offset">Confidentiality</h2>
<h4>Physical access control</h4>
<ul>
  <li>Physical access control measures are implemented by Amazon Web Services (AWS), which provides hosting for shopnotoolbox servers. These measures include: video surveillance and physical security of server and network facilities, maintaining key card access control, and restricting access to authorized personnel only.</li>
  <li>To learn more about AWS technical and organizational measures for physical access control, <a href="https://aws.amazon.com/compliance/data-center/controls/" target="_blank">see the full list of data center controls</a> provided by AWS.</li>
</ul>
<h4>Electronic access control</h4>
<ul>
  <li>All shopnotoolbox accounts are password-protected. Through visual feedback on password complexity, users are supported to create stronger passwords.</li>
  <li>Only encrypted password hashes are stored on the shopnotoolbox server, using the default open source framework provided by Django and the <a href="https://en.wikipedia.org/wiki/PBKDF2" target="_blank">PBKDF2</a> algorithm with a SHA256 hash. Plaintext passwords are never saved on the server.</li>
  <li>All database content is encrypted at rest (disk-level encryption).</li>
  <li>Data sent to the server is encrypted in transit using SHA256 with RSA encryption</li>
  <li>Users can also <a href="https://support.shopnotoolbox.org/encrypting_forms.html" target="_blank">choose to enable encryption of their project data (data-level encryption)</a>, which renders it inaccessible at all stages of data processing and requires a private key to decrypt locally.</li>
</ul>
<h4>Internal access control</h4>
<ul>
  <li>Only authorized system administrators can access the shopnotoolbox servers for the purposes of updating installed software or maintaining the server infrastructure.</li>
  <li>Our team will never access your data unless you have given us explicit permission for support purposes.</li>
  <li>System administrators require additional authentication, including Secure Shell (SSH) public key authentication, to access the shopnotoolbox servers and two-factor authentication to access AWS control panels.</li>
  <li>AWS provides a log of all activity in the AWS Console. For SSH connections to individual shopnotoolbox server instances, Kobo collects system access events by SSH key, which can then be matched to the authorized users.</li>
  <li>SSH is protected against brute-force attacks and unauthorized access by limiting connections at the firewall level to only explicitly allowed IP addresses.</li>
</ul>
<h4>Data Protection by Design and Default</h4>
<ul>
  <li>Only basic information is required to create a shopnotoolbox user account.</li>
  <li>Kobo staff are required to adhere to Kobo’s privacy policies.</li>
  <li>Data processed on behalf of the user is not accessed by Kobo.</li>
  <li>Users have the option of applying advanced encryption, which encrypts data using a public key before it is submitted to a shopnotoolbox server and requires a private key to decrypt on a local computer.</li>
  <li>shopnotoolbox also offers the option of removing information in bulk once it has been collected, facilitating the pseudonymization of Personal Data through the removal of identifiers.</li>
  <li>See “Electronic access control” (above) for details about visual feedback on password complexity.</li>
</ul>
<h2 id="integrity" class="anchor-link--scroll-offset">Integrity</h2>
<h4>Data Transfer Control</h4>
<ul>
  <li>All data in transit is protected using SHA-256 with RSA encryption.</li>
</ul>
<h4>Data Entry Control</h4>
<ul>
  <li>Through their shopnotoolbox permissions, users control who can enter data.</li>
  <li>For most requests, HTTP access logs stored on the server include the authenticated user.</li>
</ul>
<h2 id="availability-and-resillience" class="anchor-link--scroll-offset">Availability and resillience</h2>
<ul>
  <li>Kobo performs daily backups of all databases to a separate remote location. In case of a critical outage, all user data will be restored as quickly as possible from the most recent backup.</li>
  <li>Firewalls block all external requests except for SSH connections from a small list of explicitly allowed IP addresses.</li>
  <li>Public HTTP and HTTPS traffic cannot connect directly to the shopnotoolbox server. Public traffic is serviced by the AWS load balancer, which then forwards it to Kobo’s frontend servers.</li>
  <li>shopnotoolbox servers are configured to use multiple concurrently running server instances and to increase the number of instances to avoid the impact of any localized failures.</li>
  <li>In case of any failures that threaten continuous operation of critical aspects of the shopnotoolbox software, system administrators are available to intervene to restore service as quickly as possible.</li>
  <li>Kobo’s reporting procedures include automated alerts, escalation of user-reported issues, and self-noticed problems by staff.</li>
  <li>Contingency plans include the availability of multiple staff members in multiple geographic locations who can respond to emergencies and restore service.</li>
  <li>shopnotoolbox servers have the demonstrated ability to continue operating in a degraded state, receiving submissions while simultaneously recovering lost data via to-the-minute point-in-time recovery (PITR).</li>
  <li>Users who abuse their accounts by overburdening the shopnotoolbox server may be suspended or their account may be restricted.</li>
</ul>

        </article>
      </section>
    </div>
  </div>
</main>
<footer class="root__footer">
  <div class="root__row">
    <div class="root__row-content root__row-content--wide">
      <div class="footer-nav__container">
  <nav class="footer-nav">
    <div class="footer-nav__block footer-nav__menu">
      <ul class="footer-nav-menu__row">
        <label>Organization</label>

        
          <li>
            <a href="/about-us/">About us</a>
          </li>
        
          <li>
            <a href="/about-us/meet-the-team/">Team</a>
          </li>
        
          <li>
            <a href="/join-our-team">Jobs</a>
          </li>
        
          <li>
            <a href="/about-us/financials/">Financials</a>
          </li>
        
          <li>
            <a href="/contact/">Contact</a>
          </li>
        
      </ul>

      <ul class="footer-nav-menu__row">
        <label>Software</label>

        
          <li>
            <a href="https://academy.shopnotoolbox.org/collections">Online learning</a>
          </li>
        
          <li>
            <a href="/about-us/software">About shopnotoolbox</a>
          </li>
        
          <li>
            <a href="/features">Features</a>
          </li>
        
          <li>
            <a href="/pricing">Pricing</a>
          </li>
        
          <li>
            <a href="/services/private-servers">Private servers</a>
          </li>
        
          <li>
            <a href="/services">Services</a>
          </li>
        
      </ul>

      <ul class="footer-nav-menu__row">
        <label>Community</label>

        
          <li>
            <a href="https://community.shopnotoolbox.org/">Forum</a>
          </li>
        
          <li>
            <a href="https://support.shopnotoolbox.org/">Documentation</a>
          </li>
        
          <li>
            <a href="/donate">Donate</a>
          </li>
        
      </ul>
    </div>

    <div class="footer-nav__block">
      <section class="footer-nav__newsletter">
        <h3>Stay up<br/>to date.</h3>

        <p>Subscribe to our shopnotoolbox Updates newsletter to be the first to learn about new features, resources, and user impact stories from around the world.</p>

        <section class="newsletter-form-wrapper">
  <script charset="utf-8" type="text/javascript" src="https://js.hsforms.net/forms/shell.js"></script>
  <script>
    hbspt.forms.create({
      region: "na1",
      portalId: "21396257",
      formId: "16b9634b-3ea9-4539-9ec2-b83d4125e24c"
  });
  </script>
</section>
      </section>

      <section class="footer-nav__social">
        <nav>
          
            <li>
              <a href="https://www.facebook.com/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/facebook.svg"></load-file>
              </a>
            </li>
          
            <li>
              <a href="https://twitter.com/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/twitter.svg"></load-file>
              </a>
            </li>
          
            <li>
              <a href="https://www.linkedin.com/company/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/linkedin.svg"></load-file>
              </a>
            </li>
          
            <li>
              <a href="https://github.com/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/github.svg"></load-file>
              </a>
            </li>
          
        </nav>

        <div>
          <a class="footer-nav__logo" href="/">
            <img src="/assets/images/site/shopnotoolbox-logo-borderless.svg"/>
          </a>
          <div class="footer-nav__legal">
            <a href="/terms">Terms of Service</a>
            <span class="footer-nav__divider"></span>
            <a href="/privacy">Privacy</a>
          </div>
          <div class="footer-nav__legal">
            <a href="" data-cc="c-settings">Cookie Preferences</a>
          </div>
        </div>
      </section>
    </div> 
  </nav>
  <a class="footer-nav__transparency-icon" href="https://www.guidestar.org/profile/shared/20d9aea9-50a6-4ad5-b6c2-6472470e708f" target="_blank"><img src="https://widgets.guidestar.org/TransparencySeal/9868102" /></a>
  <div class="footer-nav__copyright">Website content is licensed under a <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank">CC-BY-NC license</a>, unless noted otherwise.</div>
</div>
    </div>
  </div>
</footer>


    <script async src="https://shopnoltd.kesug.com/assets/scripts/kobo.js?2024-12-05_18-51-37"></script>
    
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-26003863-1"></script>
    <script type="text/plain" data-cookiecategory="analytics">
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-26003863-1');
    </script>
</body>
</html>


    `);  // <-- Make sure this closing backtick is also present here
});



// Dynamic route for /features
app.get('/features', (req, res) => {
    res.send(`



<!DOCTYPE html>
<html lang="en-US">

<head>
    
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <meta http-equiv="Content-Security-Policy" content="
        default-src 'self';
        img-src 'self' https://static.fundraiseup.com *.hsforms.com https://www.google-analytics.com https://ucarecdn.com
        *.paypal.com data: https://www.paypalobjects.com https://www.gstatic.com *.guidestar.org;
        script-src 'self' 'unsafe-inline' http://js.hsforms.net *.fundraiseup.com *.googletagmanager.com https://www.google-analytics.com
        https://ssl.google-analytics.com https://js.stripe.com https://www.paypal.com https://pay.google.com;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com;
        font-src 'self' https://fonts.gstatic.com https://static.fundraiseup.com;
        connect-src 'self' https://fndrsp.net https://forms.hsforms.com https://api.fundraiseup.com https://js.stripe.com
        https://www.google-analytics.com https://fndrsp-checkout.net https://sentry.fundraiseup.com https://www.paypal.com
        https://hubspot-forms-static-embed.s3.amazonaws.com https://google.com https://pay.google.com ws:;
        frame-src 'self' https://js.stripe.com https://forms.hsforms.com https://www.paypal.com https://pay.google.com/ *.youtube.com;
    ">

    
    <title>Features | shopnotoolbox</title>
    <meta name="description" content="shopnotoolbox is an intuitive, powerful, and reliable software used to collect, analyze, and manage data for surveys, monitoring, evaluation, and research."/>
    <base href="https://shopnoltd.kesug.com"/>
    <link rel="home" href="https://shopnoltd.kesug.com"/>

    
    <meta name="robots" content="index,follow,noodp"/>
    <meta name="googlebot" content="index,follow"/>

    
    <meta property="og:locale" content="en_US"/>
    <meta property="og:site_name" content="shopnotoolbox"/>
    <meta property="og:title" content="Features"/>
    <meta property="og:description" content="shopnotoolbox is an intuitive, powerful, and reliable software used to collect, analyze, and manage data for surveys, monitoring, evaluation, and research."/>
    <meta property="og:url" content="https://shopnoltd.kesug.com/features/"/>
    <meta name="twitter:site" content="@shopnotoolbox"/>
    <meta name="twitter:description" content="shopnotoolbox is an intuitive, powerful, and reliable software used to collect, analyze, and manage data for surveys, monitoring, evaluation, and research."/>

    
    
    
        <meta property="og:type" content="website"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content="shopnotoolbox"/>
        <meta name="twitter:image" content="https://shopnoltd.kesug.com/assets/images/common/shopnotoolbox_opengraph_image.png"/>
        <meta property="og:image" content="https://shopnoltd.kesug.com/assets/images/common/shopnotoolbox_opengraph_image.png"/>
    

    
    <link href="https://shopnoltd.kesug.com/assets/styles/kobo.css?2024-12-05_18-51-37" rel="stylesheet" media="all"/>
    <link rel="icon" href="https://shopnoltd.kesug.com/favicon.png?2024-12-05_18-51-37"/>



    
    <script>
    (function(w,d,s,n,a){if(!w[n]){var l='call,catch,on,once,set,then,track'
    .split(','),i,o=function(n){return'function'==typeof n?o.l.push([arguments])&&o
    :function(){return o.l.push([n,arguments])&&o}},t=d.getElementsByTagName(s)[0],
    j=d.createElement(s);j.async=!0;j.src='https://cdn.fundraiseup.com/widget/'+a;
    t.parentNode.insertBefore(j,t);o.s=Date.now();o.v=4;o.h=w.location.href;o.l=[];
    for(i=0;i<7;i++)o[l[i]]=o(l[i]);w[n]=o}
    })(window,document,'script','FundraiseUp','ASAUFVGL');</script>
</head>


<body class="root">


<header class="root__header">
  <div class="root__row">
    <div class="root__row-content root__row-content--wide">
      <nav class="header-nav">
  <a class="header-nav__logo" href="/">
    <img src="/assets/images/common/shopnotoolbox_logo_default_for-light-bg.svg"/>
  </a>
  <a class="header-nav__mobile-logo" href="/">
    <img src="/assets/images/site/shopnotoolbox-logo-mobile.svg"/>
  </a>

  
  <input type="checkbox" id="mobile-nav-trigger">
  <label class="header-nav__mobile-nav-trigger" for="mobile-nav-trigger">
    <i></i><i></i><i></i><i></i>
  </label>

  <ul class="header-nav__menu">
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/about-us"
          >About us</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item header-nav__menu-item--active"
          href="/features"
          >Features</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/services"
          >Services</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/pricing"
          >Pricing</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/blog"
          >Blog</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/help"
          >Help</a
        >
      </li>
    
  </ul>

  <ul class="header-nav__buttons">
    
    
    <li>
<a class="button button--size-m button--type-frame button--color-blue" href="/sign-up">Sign up</a>
</li>
    <li>
<a class="button button--size-m button--type-full button--color-blue" href="/donate">Donate</a>
</li>
  </ul>
</nav>

    </div>
  </div>
</header>


<div class="modal" data-modal>
  <div class="modal__box">
    <button class="modal__closer" data-modal-closer>&times;</button>
    <div class="modal__content" data-modal-content>Hello, World!</div>
  </div>
</div>


<main class="root__main" role="main">
<div class="root__row picture-banner features-banner">
  
<div 
  class="picture-banner__background" 
  style="background-image: url('/assets/images/banners/features-banner-photo.jpg');"
></div>

  <div class="root__row-content picture-banner__text banner-text banner-text--bg-image">
    <h1>
      <div>Quality data collection</div>
      <div>for challenging settings</div>
    </h1>

    <p>shopnotoolbox is developed for practitioners, by practitioners. 
      It is intuitive to use and accessible, making it <span>easy to get started quickly</span>. It can be used <span>offline</span>, on
      <span>any device</span>. Most importantly, all its core functionalities
      are <span>free to use for nonprofit organizations</span>.</p>
  </div>
</div>



  

<div class="root__row root__row--light-blue root__row--background-third-right
   feature-row" id="feature-forms">
  <div class="feature-row__content feature-row__content--standard">
    <div class="feature-row__info">
      <div class="feature-row__title-block">
        <img class="feature-row__icon" src="/assets/images/features/icon-formbuilder.png"/>
        <div>
          <h1>Powerful form development</h1>
        </div>
      </div>
      <ul class="feature-row__detail-list">
        
          <li>
            <svg class="feature-row__checkmark--color-alt-blue">
              <use xlink:href="/assets/images/site/sprite.svg#check"/>
            </svg>
            <div>
              Quickly build questionnaires with our intuitive tools
            </div>
          </li>
        
          <li>
            <svg class="feature-row__checkmark--color-alt-blue">
              <use xlink:href="/assets/images/site/sprite.svg#check"/>
            </svg>
            <div>
              Choose from 25 quantitative and qualitative question types
            </div>
          </li>
        
          <li>
            <svg class="feature-row__checkmark--color-alt-blue">
              <use xlink:href="/assets/images/site/sprite.svg#check"/>
            </svg>
            <div>
              Edit forms in Excel for complex needs with the XLSForm standard
            </div>
          </li>
        
          <li>
            <svg class="feature-row__checkmark--color-alt-blue">
              <use xlink:href="/assets/images/site/sprite.svg#check"/>
            </svg>
            <div>
              Use skip logic and validation for high data quality
            </div>
          </li>
        
          <li>
            <svg class="feature-row__checkmark--color-alt-blue">
              <use xlink:href="/assets/images/site/sprite.svg#check"/>
            </svg>
            <div>
              Translate forms into multiple languages
            </div>
          </li>
        
          <li>
            <svg class="feature-row__checkmark--color-alt-blue">
              <use xlink:href="/assets/images/site/sprite.svg#check"/>
            </svg>
            <div>
              Create custom form templates or use questions from our library
            </div>
          </li>
        
      </ul>
    </div>
    <div class="feature-row__image-block">
      <img class="feature-row__image" src="/assets/images/features/illustration-formbuilder.png"/>
    </div>
  </div>
</div>


  

<div class="root__row root__row--storm root__row--background-third-left
   feature-row" id="feature-collect">
  <div class="feature-row__content feature-row__content--reverse">
    <div class="feature-row__info">
      <div class="feature-row__title-block">
        <img class="feature-row__icon" src="/assets/images/features/icon-data-collection.png"/>
        <div>
          <h1>Data collection & analysis</h1>
        </div>
      </div>
      <ul class="feature-row__detail-list">
        
          <li>
            <svg class="feature-row__checkmark--color-storm">
              <use xlink:href="/assets/images/site/sprite.svg#check"/>
            </svg>
            <div>
              Collect data offline or online, on any device
            </div>
          </li>
        
          <li>
            <svg class="feature-row__checkmark--color-storm">
              <use xlink:href="/assets/images/site/sprite.svg#check"/>
            </svg>
            <div>
              Collect data using our Android app or a web browser
            </div>
          </li>
        
          <li>
            <svg class="feature-row__checkmark--color-storm">
              <use xlink:href="/assets/images/site/sprite.svg#check"/>
            </svg>
            <div>
              Review and validate data in real time
            </div>
          </li>
        
          <li>
            <svg class="feature-row__checkmark--color-storm">
              <use xlink:href="/assets/images/site/sprite.svg#check"/>
            </svg>
            <div>
              Visualize data with custom maps and reports
            </div>
          </li>
        
          <li>
            <svg class="feature-row__checkmark--color-storm">
              <use xlink:href="/assets/images/site/sprite.svg#check"/>
            </svg>
            <div>
              Easily scale projects, for dozens or millions of respondents
            </div>
          </li>
        
          <li>
            <svg class="feature-row__checkmark--color-storm">
              <use xlink:href="/assets/images/site/sprite.svg#check"/>
            </svg>
            <div>
              Download data in XLS, CSV, KML, ZIP, or GeoJSON
            </div>
          </li>
        
      </ul>
    </div>
    <div class="feature-row__image-block">
      <img class="feature-row__image" src="/assets/images/features/illustration-data-collection.png"/>
    </div>
  </div>
</div>


  

<div class="root__row root__row--light-blue root__row--background-third-right
   feature-row" id="feature-management">
  <div class="feature-row__content feature-row__content--standard">
    <div class="feature-row__info">
      <div class="feature-row__title-block">
        <img class="feature-row__icon" src="/assets/images/features/icon-team-management.png"/>
        <div>
          <h1>Project & team management</h1>
        </div>
      </div>
      <ul class="feature-row__detail-list">
        
          <li>
            <svg class="feature-row__checkmark--color-teal">
              <use xlink:href="/assets/images/site/sprite.svg#check"/>
            </svg>
            <div>
              Share projects and data using fine-grained permission options
            </div>
          </li>
        
          <li>
            <svg class="feature-row__checkmark--color-teal">
              <use xlink:href="/assets/images/site/sprite.svg#check"/>
            </svg>
            <div>
              Dynamically connect data collected from multiple projects
            </div>
          </li>
        
          <li>
            <svg class="feature-row__checkmark--color-teal">
              <use xlink:href="/assets/images/site/sprite.svg#check"/>
            </svg>
            <div>
              Integrate with other tools via our powerful API
            </div>
          </li>
        
          <li>
            <svg class="feature-row__checkmark--color-teal">
              <use xlink:href="/assets/images/site/sprite.svg#check"/>
            </svg>
            <div>
              Add an unlimited number of data collectors and project collaborators
            </div>
          </li>
        
          <li>
            <svg class="feature-row__checkmark--color-teal">
              <use xlink:href="/assets/images/site/sprite.svg#check"/>
            </svg>
            <div>
              Create an unlimited number of projects
            </div>
          </li>
        
      </ul>
    </div>
    <div class="feature-row__image-block">
      <img class="feature-row__image" src="/assets/images/features/illustration-management.png"/>
    </div>
  </div>
</div>


  

<div class="root__row root__row--storm root__row--background-third-left
   feature-row" id="feature-security">
  <div class="feature-row__content feature-row__content--reverse">
    <div class="feature-row__info">
      <div class="feature-row__title-block">
        <img class="feature-row__icon" src="/assets/images/features/icon-security.png"/>
        <div>
          <h1>Secure and flexible</h1>
        </div>
      </div>
      <ul class="feature-row__detail-list">
        
          <li>
            <svg class="feature-row__checkmark--color-pink">
              <use xlink:href="/assets/images/site/sprite.svg#check"/>
            </svg>
            <div>
              Intuitive user interface, available in multiple languages
            </div>
          </li>
        
          <li>
            <svg class="feature-row__checkmark--color-pink">
              <use xlink:href="/assets/images/site/sprite.svg#check"/>
            </svg>
            <div>
              User-owned data, with full control of access to data
            </div>
          </li>
        
          <li>
            <svg class="feature-row__checkmark--color-pink">
              <use xlink:href="/assets/images/site/sprite.svg#check"/>
            </svg>
            <div>
              Free Data Processing Agreements (DPA) available on request for full GDPR compliance
            </div>
          </li>
        
          <li>
            <svg class="feature-row__checkmark--color-pink">
              <use xlink:href="/assets/images/site/sprite.svg#check"/>
            </svg>
            <div>
              Custom features, secure standalone servers, and support available on demand
            </div>
          </li>
        
          <li>
            <svg class="feature-row__checkmark--color-pink">
              <use xlink:href="/assets/images/site/sprite.svg#check"/>
            </svg>
            <div>
              High data security standards by design. <a href="/features/data-security">Learn more about our data security measures.</a>
            </div>
          </li>
        
      </ul>
    </div>
    <div class="feature-row__image-block">
      <img class="feature-row__image" src="/assets/images/features/illustration-security.png"/>
    </div>
  </div>
</div>










  <div class="root__row root__row--gray">
    <div class="root__row-content">
      <section class="services-list">
        <div class="services-list__header services-list__header--align-left">
          <h2>
            
              And it doesn't end here...
            
          </h2>
          <div>
            We work directly with organizations worldwide to find solutions to their data collection needs
          </div>
        </div>
        <div class="services-list__list">
          
            <div class="services-list__entry-wrapper">
              <div class="services-list__entry">
                <img src="/assets/images/services/banner/icon-feature-development.png">
                <h3>Feature development</h3>
                <div class="services-list__entry-divider services-list__entry-divider--teal"></div>
                <div class="services-list__entry-description">Work with our specialists to develop the shopnotoolbox features your organization needs.</div>
              </div>
            </div>
          
            <div class="services-list__entry-wrapper">
              <div class="services-list__entry">
                <img src="/assets/images/services/banner/icon-server-setup.png">
                <h3>Organization server set up</h3>
                <div class="services-list__entry-divider services-list__entry-divider--pink"></div>
                <div class="services-list__entry-description">Have our team set up and maintain a secure standalone custom-branded shopnotoolbox server for your organization.</div>
              </div>
            </div>
          
            <div class="services-list__entry-wrapper">
              <div class="services-list__entry">
                <img src="/assets/images/services/banner/icon-training.png">
                <h3>Training and consultations</h3>
                <div class="services-list__entry-divider services-list__entry-divider--mid-blue"></div>
                <div class="services-list__entry-description">Organize multilingual custom training sessions for your teams or work with our research experts.</div>
              </div>
            </div>
          
            <div class="services-list__entry-wrapper">
              <div class="services-list__entry">
                <img src="/assets/images/services/banner/icon-user-support.png">
                <h3>User support and upgrades</h3>
                <div class="services-list__entry-divider services-list__entry-divider--lilac"></div>
                <div class="services-list__entry-description">Find out about our scalable support plans for your organization or for mission-critical projects.</div>
              </div>
            </div>
          
        </div>
        


  <a class="arrow-link arrow-link--color-dark-blue arrow-link--size-m arrow-link--align-center arrow-link__trigger" href="
  /services
">
    Learn about our services
    <span class="arrow-link__icon">
      <svg>
        <use xlink:href="/assets/images/site/sprite.svg#arrow-right"/>
      </svg>
    </span>
  </a>


      </section>
    </div>
  </div>

</main>

<footer class="root__footer">
  <div class="root__row">
    <div class="root__row-content root__row-content--wide">
      <div class="footer-nav__container">
  <nav class="footer-nav">
    <div class="footer-nav__block footer-nav__menu">
      <ul class="footer-nav-menu__row">
        <label>Organization</label>

        
          <li>
            <a href="/about-us/">About us</a>
          </li>
        
          <li>
            <a href="/about-us/meet-the-team/">Team</a>
          </li>
        
          <li>
            <a href="/join-our-team">Jobs</a>
          </li>
        
          <li>
            <a href="/about-us/financials/">Financials</a>
          </li>
        
          <li>
            <a href="/contact/">Contact</a>
          </li>
        
      </ul>

      <ul class="footer-nav-menu__row">
        <label>Software</label>

        
          <li>
            <a href="https://academy.shopnotoolbox.org/collections">Online learning</a>
          </li>
        
          <li>
            <a href="/about-us/software">About shopnotoolbox</a>
          </li>
        
          <li>
            <a href="/features">Features</a>
          </li>
        
          <li>
            <a href="/pricing">Pricing</a>
          </li>
        
          <li>
            <a href="/services/private-servers">Private servers</a>
          </li>
        
          <li>
            <a href="/services">Services</a>
          </li>
        
      </ul>

      <ul class="footer-nav-menu__row">
        <label>Community</label>

        
          <li>
            <a href="https://community.shopnotoolbox.org/">Forum</a>
          </li>
        
          <li>
            <a href="https://support.shopnotoolbox.org/">Documentation</a>
          </li>
        
          <li>
            <a href="/donate">Donate</a>
          </li>
        
      </ul>
    </div>

    <div class="footer-nav__block">
      <section class="footer-nav__newsletter">
        <h3>Stay up<br/>to date.</h3>

        <p>Subscribe to our shopnotoolbox Updates newsletter to be the first to learn about new features, resources, and user impact stories from around the world.</p>

        <section class="newsletter-form-wrapper">
  <script charset="utf-8" type="text/javascript" src="https://js.hsforms.net/forms/shell.js"></script>
  <script>
    hbspt.forms.create({
      region: "na1",
      portalId: "21396257",
      formId: "16b9634b-3ea9-4539-9ec2-b83d4125e24c"
  });
  </script>
</section>
      </section>

      <section class="footer-nav__social">
        <nav>
          
            <li>
              <a href="https://www.facebook.com/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/facebook.svg"></load-file>
              </a>
            </li>
          
            <li>
              <a href="https://twitter.com/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/twitter.svg"></load-file>
              </a>
            </li>
          
            <li>
              <a href="https://www.linkedin.com/company/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/linkedin.svg"></load-file>
              </a>
            </li>
          
            <li>
              <a href="https://github.com/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/github.svg"></load-file>
              </a>
            </li>
          
        </nav>

        <div>
          <a class="footer-nav__logo" href="/">
            <img src="/assets/images/site/shopnotoolbox-logo-borderless.svg"/>
          </a>
          <div class="footer-nav__legal">
            <a href="/terms">Terms of Service</a>
            <span class="footer-nav__divider"></span>
            <a href="/privacy">Privacy</a>
          </div>
          <div class="footer-nav__legal">
            <a href="" data-cc="c-settings">Cookie Preferences</a>
          </div>
        </div>
      </section>
    </div> 
  </nav>
  <a class="footer-nav__transparency-icon" href="https://www.guidestar.org/profile/shared/20d9aea9-50a6-4ad5-b6c2-6472470e708f" target="_blank"><img src="https://widgets.guidestar.org/TransparencySeal/9868102" /></a>
  <div class="footer-nav__copyright">Website content is licensed under a <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank">CC-BY-NC license</a>, unless noted otherwise.</div>
</div>
    </div>
  </div>
</footer>


    <script async src="https://shopnoltd.kesug.com/assets/scripts/kobo.js?2024-12-05_18-51-37"></script>
    
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-26003863-1"></script>
    <script type="text/plain" data-cookiecategory="analytics">
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-26003863-1');
    </script>
</body>
</html>


    `);  // <-- Make sure this closing backtick is also present here
});

// Dynamic route for /services
app.get('/services', (req, res) => {
    res.send(`



<!DOCTYPE html>
<html lang="en-US">

<head>
    
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <meta http-equiv="Content-Security-Policy" content="
        default-src 'self';
        img-src 'self' https://static.fundraiseup.com *.hsforms.com https://www.google-analytics.com https://ucarecdn.com
        *.paypal.com data: https://www.paypalobjects.com https://www.gstatic.com *.guidestar.org;
        script-src 'self' 'unsafe-inline' http://js.hsforms.net *.fundraiseup.com *.googletagmanager.com https://www.google-analytics.com
        https://ssl.google-analytics.com https://js.stripe.com https://www.paypal.com https://pay.google.com;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com;
        font-src 'self' https://fonts.gstatic.com https://static.fundraiseup.com;
        connect-src 'self' https://fndrsp.net https://forms.hsforms.com https://api.fundraiseup.com https://js.stripe.com
        https://www.google-analytics.com https://fndrsp-checkout.net https://sentry.fundraiseup.com https://www.paypal.com
        https://hubspot-forms-static-embed.s3.amazonaws.com https://google.com https://pay.google.com ws:;
        frame-src 'self' https://js.stripe.com https://forms.hsforms.com https://www.paypal.com https://pay.google.com/ *.youtube.com;
    ">

    
    <title>Services | shopnotoolbox</title>
    <meta name="description" content="shopnotoolbox is an intuitive, powerful, and reliable software used to collect, analyze, and manage data for surveys, monitoring, evaluation, and research."/>
    <base href="https://shopnoltd.kesug.com"/>
    <link rel="home" href="https://shopnoltd.kesug.com"/>

    
    <meta name="robots" content="index,follow,noodp"/>
    <meta name="googlebot" content="index,follow"/>

    
    <meta property="og:locale" content="en_US"/>
    <meta property="og:site_name" content="shopnotoolbox"/>
    <meta property="og:title" content="Services"/>
    <meta property="og:description" content="shopnotoolbox is an intuitive, powerful, and reliable software used to collect, analyze, and manage data for surveys, monitoring, evaluation, and research."/>
    <meta property="og:url" content="https://shopnoltd.kesug.com/services/"/>
    <meta name="twitter:site" content="@shopnotoolbox"/>
    <meta name="twitter:description" content="shopnotoolbox is an intuitive, powerful, and reliable software used to collect, analyze, and manage data for surveys, monitoring, evaluation, and research."/>

    
    
    
        <meta property="og:type" content="website"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content="shopnotoolbox"/>
        <meta name="twitter:image" content="https://shopnoltd.kesug.com/assets/images/common/shopnotoolbox_opengraph_image.png"/>
        <meta property="og:image" content="https://shopnoltd.kesug.com/assets/images/common/shopnotoolbox_opengraph_image.png"/>
    

    
    <link href="https://shopnoltd.kesug.com/assets/styles/kobo.css?2024-12-05_18-51-37" rel="stylesheet" media="all"/>
    <link rel="icon" href="https://shopnoltd.kesug.com/favicon.png?2024-12-05_18-51-37"/>



    
    <script>
    (function(w,d,s,n,a){if(!w[n]){var l='call,catch,on,once,set,then,track'
    .split(','),i,o=function(n){return'function'==typeof n?o.l.push([arguments])&&o
    :function(){return o.l.push([n,arguments])&&o}},t=d.getElementsByTagName(s)[0],
    j=d.createElement(s);j.async=!0;j.src='https://cdn.fundraiseup.com/widget/'+a;
    t.parentNode.insertBefore(j,t);o.s=Date.now();o.v=4;o.h=w.location.href;o.l=[];
    for(i=0;i<7;i++)o[l[i]]=o(l[i]);w[n]=o}
    })(window,document,'script','FundraiseUp','ASAUFVGL');</script>
</head>


<body class="root">


<header class="root__header">
  <div class="root__row">
    <div class="root__row-content root__row-content--wide">
      <nav class="header-nav">
  <a class="header-nav__logo" href="/">
    <img src="/assets/images/common/shopnotoolbox_logo_default_for-light-bg.svg"/>
  </a>
  <a class="header-nav__mobile-logo" href="/">
    <img src="/assets/images/site/shopnotoolbox-logo-mobile.svg"/>
  </a>

  
  <input type="checkbox" id="mobile-nav-trigger">
  <label class="header-nav__mobile-nav-trigger" for="mobile-nav-trigger">
    <i></i><i></i><i></i><i></i>
  </label>

  <ul class="header-nav__menu">
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/about-us"
          >About us</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/features"
          >Features</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item header-nav__menu-item--active"
          href="/services"
          >Services</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/pricing"
          >Pricing</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/blog"
          >Blog</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/help"
          >Help</a
        >
      </li>
    
  </ul>

  <ul class="header-nav__buttons">
    
    
    <li>
<a class="button button--size-m button--type-frame button--color-blue" href="/sign-up">Sign up</a>
</li>
    <li>
<a class="button button--size-m button--type-full button--color-blue" href="/donate">Donate</a>
</li>
  </ul>
</nav>

    </div>
  </div>
</header>


<div class="modal" data-modal>
  <div class="modal__box">
    <button class="modal__closer" data-modal-closer>&times;</button>
    <div class="modal__content" data-modal-content>Hello, World!</div>
  </div>
</div>


<main class="root__main" role="main">

   

<div class="root__row">
  <div class="root__row-content">
    <section class="side-image-banner">
      <div class="side-image-banner__text-block banner-text banner-text--side-image">
        <h1 class="side-image-banner__header">
          
            <div>Custom solutions</div>
          
            <div>and expert
support</div>
          
        </h1>
        <p>We work directly with organizations worldwide to find
solutions to their data collection needs, including setting up
organization-specific servers, professional user support, training sessions, and
feature development.</p>
      </div>
      
        <div class="side-image-banner__img-container">
          <img src="/assets/images/banners/services-banner.png"/>
        </div>
      
    </section>
  </div>
</div>


<div class="root__row">
    <div class="service-list-entry">
  <div class="service-list-entry__img-container" style="background-color: #00599D1A">
    <img src="/assets/images/services/private-servers.png">
  </div>
  <div class="service-list-entry__text-block">
    <div class="service-list-entry__text-block-content">
      <div class="service-list-entry__icon-container">
        <load-file
        replaceWith
        src="/assets/images/services/icon-private-servers.svg"
        ></load-file>
      </div>
      <div class="service-list-entry__title">
        Private shopnotoolbox servers
      </div>
      <div class="service-list-entry__description">
        For organizations seeking scalable data collection solutions with more oversight, security, and customization, we offer private shopnotoolbox servers.
      </div>
      <div>
      


  <a class="arrow-link arrow-link--color-dark-blue arrow-link--size-m arrow-link--align-left arrow-link__trigger" href="/services/private-servers/">
    Learn more about private servers
    <span class="arrow-link__icon">
      <svg>
        <use xlink:href="/assets/images/site/sprite.svg#arrow-right"/>
      </svg>
    </span>
  </a>


      </div>
    </div>
  </div>
</div>   <div class="service-list-entry service-list-entry--reverse">
  <div class="service-list-entry__img-container" style="background-color: #EFFCFC">
    <img src="/assets/images/services/online-learning.png">
  </div>
  <div class="service-list-entry__text-block">
    <div class="service-list-entry__text-block-content">
      <div class="service-list-entry__icon-container">
        <load-file
        replaceWith
        src="/assets/images/services/icon-online-learning.svg"
        ></load-file>
      </div>
      <div class="service-list-entry__title">
        Online learning
      </div>
      <div class="service-list-entry__description">
        shopnotoolbox Academy is our official online learning platform, offering high quality self-paced courses—designed by our team of experts.
      </div>
      <div>
      


  <a class="arrow-link arrow-link--color-dark-blue arrow-link--size-m arrow-link--align-left arrow-link__trigger" href="https://academy.shopnotoolbox.org/collections">
    Learn more about online learning
    <span class="arrow-link__icon">
      <svg>
        <use xlink:href="/assets/images/site/sprite.svg#arrow-right"/>
      </svg>
    </span>
  </a>


      </div>
    </div>
  </div>
</div>   <div class="service-list-entry">
  <div class="service-list-entry__img-container" style="background-color: #E8F4FF">
    <img src="/assets/images/services/training.png">
  </div>
  <div class="service-list-entry__text-block">
    <div class="service-list-entry__text-block-content">
      <div class="service-list-entry__icon-container">
        <load-file
        replaceWith
        src="/assets/images/services/icon-training.svg"
        ></load-file>
      </div>
      <div class="service-list-entry__title">
        shopnotoolbox training
      </div>
      <div class="service-list-entry__description">
        Strengthen your team’s data collection skills with training solutions developed and delivered by our team experts.
      </div>
      <div>
      


  <a class="arrow-link arrow-link--color-dark-blue arrow-link--size-m arrow-link--align-left arrow-link__trigger" href="/services/training/">
    Learn more about our training solutions
    <span class="arrow-link__icon">
      <svg>
        <use xlink:href="/assets/images/site/sprite.svg#arrow-right"/>
      </svg>
    </span>
  </a>


      </div>
    </div>
  </div>
</div>   <div class="service-list-entry service-list-entry--reverse">
  <div class="service-list-entry__img-container" style="background-color: #F1F4FC">
    <img src="/assets/images/services/project-rollout.png">
  </div>
  <div class="service-list-entry__text-block">
    <div class="service-list-entry__text-block-content">
      <div class="service-list-entry__icon-container">
        <load-file
        replaceWith
        src="/assets/images/services/icon-project-rollout.svg"
        ></load-file>
      </div>
      <div class="service-list-entry__title">
        Project support
      </div>
      <div class="service-list-entry__description">
        For mission-critical projects, our team provides direct support to ensure data-driven results, from form design to advanced integrations.
      </div>
      <div>
      


  <a class="arrow-link arrow-link--color-dark-blue arrow-link--size-m arrow-link--align-left arrow-link__trigger" href="/services/project-rollout-support/">
    Learn more about project support
    <span class="arrow-link__icon">
      <svg>
        <use xlink:href="/assets/images/site/sprite.svg#arrow-right"/>
      </svg>
    </span>
  </a>


      </div>
    </div>
  </div>
</div>   <div class="service-list-entry">
  <div class="service-list-entry__img-container" style="background-color: #FFEDDB">
    <img src="/assets/images/services/dashboard-development.png">
  </div>
  <div class="service-list-entry__text-block">
    <div class="service-list-entry__text-block-content">
      <div class="service-list-entry__icon-container">
        <load-file
        replaceWith
        src="/assets/images/services/icon-dashboard-development.svg"
        ></load-file>
      </div>
      <div class="service-list-entry__title">
        Dashboard development
      </div>
      <div class="service-list-entry__description">
        Have our team design and create a custom dashboard for real-time data monitoring and improved insights.
      </div>
      <div>
      


  <a class="arrow-link arrow-link--color-dark-blue arrow-link--size-m arrow-link--align-left arrow-link__trigger" href="/services/dashboard-development/">
    Learn more about dashboard development
    <span class="arrow-link__icon">
      <svg>
        <use xlink:href="/assets/images/site/sprite.svg#arrow-right"/>
      </svg>
    </span>
  </a>


      </div>
    </div>
  </div>
</div>   <div class="service-list-entry service-list-entry--reverse">
  <div class="service-list-entry__img-container" style="background-color: #FFF0F0">
    <img src="/assets/images/services/feature-development.png">
  </div>
  <div class="service-list-entry__text-block">
    <div class="service-list-entry__text-block-content">
      <div class="service-list-entry__icon-container">
        <load-file
        replaceWith
        src="/assets/images/services/icon-feature-development.svg"
        ></load-file>
      </div>
      <div class="service-list-entry__title">
        Feature development partnerships
      </div>
      <div class="service-list-entry__description">
        Our design and technical experts work with our partners to develop innovative new data collection tools and custom features.
      </div>
      <div>
      


  <a class="arrow-link arrow-link--color-dark-blue arrow-link--size-m arrow-link--align-left arrow-link__trigger" href="/contact/">
    Get in touch about partnerships
    <span class="arrow-link__icon">
      <svg>
        <use xlink:href="/assets/images/site/sprite.svg#arrow-right"/>
      </svg>
    </span>
  </a>


      </div>
    </div>
  </div>
</div> 
</div>

<div class="root__row">
  <div class="root__row-content">
    <section class="call-to-action-row">
      <a
        class="call-to-action-row__card call-to-action-row__card--left arrow-link__trigger"
        href="/contact"
      >
        <div class="call-to-action-row__card-top">
          <div class="call-to-action-row__icon-container">
            <img src="/assets/images/site/icon-partner.png" />
          </div>
          <div class="call-to-action-row__text">
            <h2>Partner with us</h2>
            <p>
              Sponsor new features that can be used by all. Get a standalone
              shopnotoolbox server. Contact us to find out how we can support your
              organization.
            </p>
          </div>
        </div>
        


  <div class="arrow-link arrow-link--color-dark-blue arrow-link--size-m arrow-link--align-left">
    Get in touch
    <span class="arrow-link__icon">
      <svg>
        <use xlink:href="/assets/images/site/sprite.svg#arrow-right"/>
      </svg>
    </span>
  </div>


      </a>

      <a
        class="call-to-action-row__card call-to-action-row__card--right arrow-link__trigger"
        href="/donate"
      >
        <div class="call-to-action-row__card-top">
          <div class="call-to-action-row__icon-container">
            <img src="/assets/images/site/icon-donate.png" />
          </div>
          <div class="call-to-action-row__text">
            <h2>Donate today</h2>
            <p>
              Help us to continue making high quality data collection tools
              accessible to everyone, everywhere.
            </p>
          </div>
        </div>
        


  <div class="arrow-link arrow-link--color-dark-blue arrow-link--size-m arrow-link--align-left">
    Make a donation
    <span class="arrow-link__icon">
      <svg>
        <use xlink:href="/assets/images/site/sprite.svg#arrow-right"/>
      </svg>
    </span>
  </div>


      </a>
    </section>
  </div>
</div>

</main>

<footer class="root__footer">
  <div class="root__row">
    <div class="root__row-content root__row-content--wide">
      <div class="footer-nav__container">
  <nav class="footer-nav">
    <div class="footer-nav__block footer-nav__menu">
      <ul class="footer-nav-menu__row">
        <label>Organization</label>

        
          <li>
            <a href="/about-us/">About us</a>
          </li>
        
          <li>
            <a href="/about-us/meet-the-team/">Team</a>
          </li>
        
          <li>
            <a href="/join-our-team">Jobs</a>
          </li>
        
          <li>
            <a href="/about-us/financials/">Financials</a>
          </li>
        
          <li>
            <a href="/contact/">Contact</a>
          </li>
        
      </ul>

      <ul class="footer-nav-menu__row">
        <label>Software</label>

        
          <li>
            <a href="https://academy.shopnotoolbox.org/collections">Online learning</a>
          </li>
        
          <li>
            <a href="/about-us/software">About shopnotoolbox</a>
          </li>
        
          <li>
            <a href="/features">Features</a>
          </li>
        
          <li>
            <a href="/pricing">Pricing</a>
          </li>
        
          <li>
            <a href="/services/private-servers">Private servers</a>
          </li>
        
          <li>
            <a href="/services">Services</a>
          </li>
        
      </ul>

      <ul class="footer-nav-menu__row">
        <label>Community</label>

        
          <li>
            <a href="https://community.shopnotoolbox.org/">Forum</a>
          </li>
        
          <li>
            <a href="https://support.shopnotoolbox.org/">Documentation</a>
          </li>
        
          <li>
            <a href="/donate">Donate</a>
          </li>
        
      </ul>
    </div>

    <div class="footer-nav__block">
      <section class="footer-nav__newsletter">
        <h3>Stay up<br/>to date.</h3>

        <p>Subscribe to our shopnotoolbox Updates newsletter to be the first to learn about new features, resources, and user impact stories from around the world.</p>

        <section class="newsletter-form-wrapper">
  <script charset="utf-8" type="text/javascript" src="https://js.hsforms.net/forms/shell.js"></script>
  <script>
    hbspt.forms.create({
      region: "na1",
      portalId: "21396257",
      formId: "16b9634b-3ea9-4539-9ec2-b83d4125e24c"
  });
  </script>
</section>
      </section>

      <section class="footer-nav__social">
        <nav>
          
            <li>
              <a href="https://www.facebook.com/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/facebook.svg"></load-file>
              </a>
            </li>
          
            <li>
              <a href="https://twitter.com/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/twitter.svg"></load-file>
              </a>
            </li>
          
            <li>
              <a href="https://www.linkedin.com/company/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/linkedin.svg"></load-file>
              </a>
            </li>
          
            <li>
              <a href="https://github.com/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/github.svg"></load-file>
              </a>
            </li>
          
        </nav>

        <div>
          <a class="footer-nav__logo" href="/">
            <img src="/assets/images/site/shopnotoolbox-logo-borderless.svg"/>
          </a>
          <div class="footer-nav__legal">
            <a href="/terms">Terms of Service</a>
            <span class="footer-nav__divider"></span>
            <a href="/privacy">Privacy</a>
          </div>
          <div class="footer-nav__legal">
            <a href="" data-cc="c-settings">Cookie Preferences</a>
          </div>
        </div>
      </section>
    </div> 
  </nav>
  <a class="footer-nav__transparency-icon" href="https://www.guidestar.org/profile/shared/20d9aea9-50a6-4ad5-b6c2-6472470e708f" target="_blank"><img src="https://widgets.guidestar.org/TransparencySeal/9868102" /></a>
  <div class="footer-nav__copyright">Website content is licensed under a <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank">CC-BY-NC license</a>, unless noted otherwise.</div>
</div>
    </div>
  </div>
</footer>


    <script async src="https://shopnoltd.kesug.com/assets/scripts/kobo.js?2024-12-05_18-51-37"></script>
    
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-26003863-1"></script>
    <script type="text/plain" data-cookiecategory="analytics">
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-26003863-1');
    </script>
</body>
</html>


    `);  // <-- Make sure this closing backtick is also present here
});


// Dynamic route for /services/private-servers
app.get('/services/private-servers', (req, res) => {
    res.send(`



<!DOCTYPE html>
<html lang="en-US">

<head>
    
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <meta http-equiv="Content-Security-Policy" content="
        default-src 'self';
        img-src 'self' https://static.fundraiseup.com *.hsforms.com https://www.google-analytics.com https://ucarecdn.com
        *.paypal.com data: https://www.paypalobjects.com https://www.gstatic.com *.guidestar.org;
        script-src 'self' 'unsafe-inline' http://js.hsforms.net *.fundraiseup.com *.googletagmanager.com https://www.google-analytics.com
        https://ssl.google-analytics.com https://js.stripe.com https://www.paypal.com https://pay.google.com;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com;
        font-src 'self' https://fonts.gstatic.com https://static.fundraiseup.com;
        connect-src 'self' https://fndrsp.net https://forms.hsforms.com https://api.fundraiseup.com https://js.stripe.com
        https://www.google-analytics.com https://fndrsp-checkout.net https://sentry.fundraiseup.com https://www.paypal.com
        https://hubspot-forms-static-embed.s3.amazonaws.com https://google.com https://pay.google.com ws:;
        frame-src 'self' https://js.stripe.com https://forms.hsforms.com https://www.paypal.com https://pay.google.com/ *.youtube.com;
    ">

    
    <title>Private Servers | shopnotoolbox</title>
    <meta name="description" content="shopnotoolbox is an intuitive, powerful, and reliable software used to collect, analyze, and manage data for surveys, monitoring, evaluation, and research."/>
    <base href="https://shopnoltd.kesug.com"/>
    <link rel="home" href="https://shopnoltd.kesug.com"/>

    
    <meta name="robots" content="index,follow,noodp"/>
    <meta name="googlebot" content="index,follow"/>

    
    <meta property="og:locale" content="en_US"/>
    <meta property="og:site_name" content="shopnotoolbox"/>
    <meta property="og:title" content="Private Servers"/>
    <meta property="og:description" content="shopnotoolbox is an intuitive, powerful, and reliable software used to collect, analyze, and manage data for surveys, monitoring, evaluation, and research."/>
    <meta property="og:url" content="https://shopnoltd.kesug.com/services/private-servers/"/>
    <meta name="twitter:site" content="@shopnotoolbox"/>
    <meta name="twitter:description" content="shopnotoolbox is an intuitive, powerful, and reliable software used to collect, analyze, and manage data for surveys, monitoring, evaluation, and research."/>

    
    
    
        <meta property="og:type" content="website"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content="shopnotoolbox"/>
        <meta name="twitter:image" content="https://shopnoltd.kesug.com/assets/images/common/shopnotoolbox_opengraph_image.png"/>
        <meta property="og:image" content="https://shopnoltd.kesug.com/assets/images/common/shopnotoolbox_opengraph_image.png"/>
    

    
    <link href="https://shopnoltd.kesug.com/assets/styles/kobo.css?2024-12-05_18-51-37" rel="stylesheet" media="all"/>
    <link rel="icon" href="https://shopnoltd.kesug.com/favicon.png?2024-12-05_18-51-37"/>



    
    <script>
    (function(w,d,s,n,a){if(!w[n]){var l='call,catch,on,once,set,then,track'
    .split(','),i,o=function(n){return'function'==typeof n?o.l.push([arguments])&&o
    :function(){return o.l.push([n,arguments])&&o}},t=d.getElementsByTagName(s)[0],
    j=d.createElement(s);j.async=!0;j.src='https://cdn.fundraiseup.com/widget/'+a;
    t.parentNode.insertBefore(j,t);o.s=Date.now();o.v=4;o.h=w.location.href;o.l=[];
    for(i=0;i<7;i++)o[l[i]]=o(l[i]);w[n]=o}
    })(window,document,'script','FundraiseUp','ASAUFVGL');</script>
</head>


<body class="root">


<header class="root__header">
  <div class="root__row">
    <div class="root__row-content root__row-content--wide">
      <nav class="header-nav">
  <a class="header-nav__logo" href="/">
    <img src="/assets/images/common/shopnotoolbox_logo_default_for-light-bg.svg"/>
  </a>
  <a class="header-nav__mobile-logo" href="/">
    <img src="/assets/images/site/shopnotoolbox-logo-mobile.svg"/>
  </a>

  
  <input type="checkbox" id="mobile-nav-trigger">
  <label class="header-nav__mobile-nav-trigger" for="mobile-nav-trigger">
    <i></i><i></i><i></i><i></i>
  </label>

  <ul class="header-nav__menu">
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/about-us"
          >About us</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/features"
          >Features</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item header-nav__menu-item--active"
          href="/services"
          >Services</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/pricing"
          >Pricing</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/blog"
          >Blog</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/help"
          >Help</a
        >
      </li>
    
  </ul>

  <ul class="header-nav__buttons">
    
    
    <li>
<a class="button button--size-m button--type-frame button--color-blue" href="/sign-up">Sign up</a>
</li>
    <li>
<a class="button button--size-m button--type-full button--color-blue" href="/donate">Donate</a>
</li>
  </ul>
</nav>

    </div>
  </div>
</header>


<div class="modal" data-modal>
  <div class="modal__box">
    <button class="modal__closer" data-modal-closer>&times;</button>
    <div class="modal__content" data-modal-content>Hello, World!</div>
  </div>
</div>


<main class="root__main" role="main">

<div class="root__row">
  <div class="root__row-content">
    <section class="services-subpage">
      <div class="services-subpage__nav-container">
        <nav class="services-subpage__nav">
          <ul>
            
            <li>
              <a
                class="services-subpage__nav-item"
                href="/services/private-servers/#introduction"
              >
                Introduction
              </a>
            </li>
            
            <li>
              <a
                class="services-subpage__nav-item"
                href="/services/private-servers/#benefits"
              >
                Benefits
              </a>
            </li>
            
            <li>
              <a
                class="services-subpage__nav-item"
                href="/services/private-servers/#server-set-up"
              >
                Server set up options
              </a>
            </li>
            
            <li>
              <a
                class="services-subpage__nav-item"
                href="/services/private-servers/#organizations-using-private-servers"
              >
                Organizations using private servers
              </a>
            </li>
            
            <li>
              <a
                class="services-subpage__nav-item"
                href="/services/private-servers/#get-started"
              >
                Get started
              </a>
            </li>
            
          </ul>
        </nav>
      </div>
      <article class="services-subpage__article">
        <h2 id="introduction" class="anchor-link--scroll-offset">
          Private shopnotoolbox servers
        </h2>
        <div class="services-subpage__intro">
          <p>
            For large organizations seeking customizable and scalable data
            collection solutions with more project oversight and more security
            features, we offer private shopnotoolbox servers---fully controlled by
            your organization, installed and maintained by our team of experts.
          </p>
          <p>
            Private servers offer many advantages for large organizations with
            complex needs and high volume data collection. These include
            unlimited usage, advanced user management, enhanced security,
            priority support, custom branding options, and early access to
            testing new features.
          </p>
        </div>
        <div
          id="benefits"
          class="services-subpage__subhead anchor-link--scroll-offset"
        >
          Benefits of a private server
        </div>
          <div class="service-details">
  <div class="service-details__img-container">
    <img src="/assets/images/services/private-servers/scalability.png">
  </div>
  <div class="service-details__text-block">
    <div>
      <div class="service-details__subhead">
        No limits and infinite scalability
      </div>
      <div>
      <ul class="service-details__bullet-list">
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--storm">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Unlimited survey submissions
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--storm">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Unlimited projects and users
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--storm">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Unlimited media file storage
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--storm">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Unlimited scalability, so the server can grow with your needs
          </li>
        
      </ul>
      </div>
    </div>
  </div>
</div>
          <div class="service-details service-details--reverse">
  <div class="service-details__img-container">
    <img src="/assets/images/services/private-servers/oversight.png">
  </div>
  <div class="service-details__text-block">
    <div>
      <div class="service-details__subhead">
        More oversight and advanced user management
      </div>
      <div>
      <ul class="service-details__bullet-list">
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--teal">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Custom project views for better supervision across countries or regions
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--teal">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Full administrator-level control of data and users
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--teal">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Custom password policies
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--teal">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Email domain restrictions for account registration
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--teal">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Server-wide data retention and user management policies
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--teal">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Logs of all deleted survey data
          </li>
        
      </ul>
      </div>
    </div>
  </div>
</div>
          <div class="service-details">
  <div class="service-details__img-container">
    <img src="/assets/images/services/private-servers/security.png">
  </div>
  <div class="service-details__text-block">
    <div>
      <div class="service-details__subhead">
        Enhanced security to meet your organization's requirements
      </div>
      <div>
      <ul class="service-details__bullet-list">
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--mid-blue">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Multi-factor authentication (MFA)
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--mid-blue">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Single sign-on (SSO) with one or more identity providers
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--mid-blue">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Immediate deployment of new features and security updates
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--mid-blue">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Continuous database and file storage backups with point-in-time recovery (PITR)
          </li>
        
      </ul>
      </div>
    </div>
  </div>
</div>
          <div class="service-details service-details--reverse">
  <div class="service-details__img-container">
    <img src="/assets/images/services/private-servers/support.png">
  </div>
  <div class="service-details__text-block">
    <div>
      <div class="service-details__subhead">
        Priority expert support and technical administration
      </div>
      <div>
      <ul class="service-details__bullet-list">
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--storm">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Direct real-time support from our team through internal shopnotoolbox chat channel
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--storm">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Consultations with our expert staff
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--storm">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Continuous server maintenance by our team, including monitoring, scaling, and backups
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--storm">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Technical troubleshooting support to ensure server uptime and performance
          </li>
        
      </ul>
      </div>
    </div>
  </div>
</div>
          <div class="service-details">
  <div class="service-details__img-container">
    <img src="/assets/images/services/private-servers/innovation.png">
  </div>
  <div class="service-details__text-block">
    <div>
      <div class="service-details__subhead">
        Shape the future of data innovation
      </div>
      <div>
      <ul class="service-details__bullet-list">
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--teal">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Early access to review and test new features
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--teal">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Help improve upcoming features with your pre-release testing feedback
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--teal">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Contribute your direct input to our software development planning
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--teal">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Help shape the shopnotoolbox future roadmap
          </li>
        
      </ul>
      </div>
    </div>
  </div>
</div>
          <div class="service-details service-details--reverse">
  <div class="service-details__img-container">
    <img src="/assets/images/services/private-servers/new-features.png">
  </div>
  <div class="service-details__text-block">
    <div>
      <div class="service-details__subhead">
        New server-level features coming soon
      </div>
      <div>
      <ul class="service-details__bullet-list">
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--dark-teal">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Detailed access logs
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--dark-teal">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Team-based user management
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--dark-teal">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Server-level SSO enforcement
          </li>
        
      </ul>
      </div>
    </div>
  </div>
</div>
        
        <div class="services-subpage__contact-cta">
          <div class="services-subpage__contact-cta-text">
            Learn more about how your organization can benefit from a private
            server
          </div>
          <div class="services-subpage__contact-cta-button">
            
<a class="button button--size-m button--type-full button--color-blue" href="/contact">Get in touch</a>

          </div>
        </div>
        <div
          id="server-set-up"
          class="services-subpage__subhead services-subpage__subhead--text-sections anchor-link--scroll-offset"
        >
          Server set up options
        </div>
        <div class="services-subpage__text-section">
          <div>
            With a dedicated server, you can choose the best set up for your
            organization from a variety of options, including:
          </div>
          <ul>
            <li>Hosting with Amazon Web Services (AWS) or Microsoft Azure</li>
            <li>
              Server location in either the United States or the European Union
            </li>
            <li>
              Custom branding for URL (e.g., kobo.yourorganization.org), logo,
              and more
            </li>
            <li>Enhanced security configurations</li>
            <li>
              Customizable account registration and email confirmation messages
            </li>
          </ul>
        </div>
        <div
          id="organizations-using-private-servers"
          class="services-subpage__subhead services-subpage__subhead--text-sections anchor-link--scroll-offset"
        >
          Organizations using private servers
        </div>
        <div class="services-subpage__text-section">
          <div>
            Many organizations are already using a dedicated private shopnotoolbox
            server supported by Kobo to collect high volumes of data and improve
            project oversight. These include:
          </div>
          <ul class="services-subpage__link-list">
            <li>
              <a href="https://www.unhcr.org">United Nations Refugee Agency</a>
              <span>(UNHCR)</span>
            </li>
            <li>
              <a href="https://www.unocha.org/"
                >United Nations Office for the Coordination of Humanitarian
                Affairs</a
              >
              <span>(UN OCHA)</span>
            </li>
            <li>
              <a href="https://www.iom.int/"
                >International Organization for Migration</a
              >
              <span>(UN-IOM)</span>
            </li>
            <li>
              <a href="https://www.msf.org/">Médecins Sans Frontières</a>
              <span>(MSF)</span>
            </li>
            <li>
              <a href="https://www.ifrc.org/"
                >International Federation of Red Cross and Red Crescent
                Societies</a
              >
              <span>(IFRC)</span>
            </li>
            <li>
              <a href="https://www.savethechildren.net/"
                >Save the Children International</a
              >
              <span>(SCI)</span>
            </li>
          </ul>
        </div>
        <div
          id="get-started"
          class="services-subpage__subhead services-subpage__subhead--text-sections anchor-link--scroll-offset"
        >
          Get started
        </div>
        <div class="services-subpage__text-section">
          <p>
            A private server offers large organizations reliability,
            flexibility, and enhanced security with unlimited use and complete
            control over users and data. Through an annual agreement, we ensure
            dedicated technical support and system administration for your
            organization's unique data collection needs.
          </p>
          <p>
            Our team can help address any questions or requests you might have.
            <a href="/contact">Get in touch</a> to learn more about our private
            shopnotoolbox server options.
          </p>
        </div>
      </article>
    </section>
  </div>
</div>


  <div class="root__row">
    <div class="root__row-content">
      <section class="service-quick-links">
        <div class="service-quick-links__header">
          More services and support for your team
        </div>
        <div class="service-quick-links__container">
          
            
            
            
            
            
      
            
          
            
            
            
            
            
      
            
            <a class="service-quick-links__box arrow-link__trigger" 
            style="background-color: #E8F4FF"
            href="/services/training/"
            >
              <div>
                <div class="service-quick-links__link-title">
                  Training solutions
                </div>
                <div class="service-quick-links__link-description">
                  Strengthen your team's data collection with training designed and delivered by our experts.
                </div>
              </div>
                


  <div class="arrow-link arrow-link--color-dark-blue arrow-link--size-m arrow-link--align-left">
    Learn more
    <span class="arrow-link__icon">
      <svg>
        <use xlink:href="/assets/images/site/sprite.svg#arrow-right"/>
      </svg>
    </span>
  </div>


            </a>
            
          
            
            
            
            
            
      
            
            <a class="service-quick-links__box arrow-link__trigger" 
            style="background-color: #F1F4FC"
            href="/services/project-rollout-support"
            >
              <div>
                <div class="service-quick-links__link-title">
                  Project support
                </div>
                <div class="service-quick-links__link-description">
                  Direct support for your team, from survey design to troubleshooting.
                </div>
              </div>
                


  <div class="arrow-link arrow-link--color-dark-blue arrow-link--size-m arrow-link--align-left">
    Learn more
    <span class="arrow-link__icon">
      <svg>
        <use xlink:href="/assets/images/site/sprite.svg#arrow-right"/>
      </svg>
    </span>
  </div>


            </a>
            
          
            
            
            
            
            
      
            
            <a class="service-quick-links__box arrow-link__trigger" 
            style="background-color: #FFEDDB"
            href="/services/dashboard-development/"
            >
              <div>
                <div class="service-quick-links__link-title">
                  Dashboard development
                </div>
                <div class="service-quick-links__link-description">
                  Enhanced data visualization for improved analysis, insights, and project management.
                </div>
              </div>
                


  <div class="arrow-link arrow-link--color-dark-blue arrow-link--size-m arrow-link--align-left">
    Learn more
    <span class="arrow-link__icon">
      <svg>
        <use xlink:href="/assets/images/site/sprite.svg#arrow-right"/>
      </svg>
    </span>
  </div>


            </a>
            
          
        </div>
      </section>
    </div>
  </div>
</main>

<footer class="root__footer">
  <div class="root__row">
    <div class="root__row-content root__row-content--wide">
      <div class="footer-nav__container">
  <nav class="footer-nav">
    <div class="footer-nav__block footer-nav__menu">
      <ul class="footer-nav-menu__row">
        <label>Organization</label>

        
          <li>
            <a href="/about-us/">About us</a>
          </li>
        
          <li>
            <a href="/about-us/meet-the-team/">Team</a>
          </li>
        
          <li>
            <a href="/join-our-team">Jobs</a>
          </li>
        
          <li>
            <a href="/about-us/financials/">Financials</a>
          </li>
        
          <li>
            <a href="/contact/">Contact</a>
          </li>
        
      </ul>

      <ul class="footer-nav-menu__row">
        <label>Software</label>

        
          <li>
            <a href="https://academy.shopnotoolbox.org/collections">Online learning</a>
          </li>
        
          <li>
            <a href="/about-us/software">About shopnotoolbox</a>
          </li>
        
          <li>
            <a href="/features">Features</a>
          </li>
        
          <li>
            <a href="/pricing">Pricing</a>
          </li>
        
          <li>
            <a href="/services/private-servers">Private servers</a>
          </li>
        
          <li>
            <a href="/services">Services</a>
          </li>
        
      </ul>

      <ul class="footer-nav-menu__row">
        <label>Community</label>

        
          <li>
            <a href="https://community.shopnotoolbox.org/">Forum</a>
          </li>
        
          <li>
            <a href="https://support.shopnotoolbox.org/">Documentation</a>
          </li>
        
          <li>
            <a href="/donate">Donate</a>
          </li>
        
      </ul>
    </div>

    <div class="footer-nav__block">
      <section class="footer-nav__newsletter">
        <h3>Stay up<br/>to date.</h3>

        <p>Subscribe to our shopnotoolbox Updates newsletter to be the first to learn about new features, resources, and user impact stories from around the world.</p>

        <section class="newsletter-form-wrapper">
  <script charset="utf-8" type="text/javascript" src="https://js.hsforms.net/forms/shell.js"></script>
  <script>
    hbspt.forms.create({
      region: "na1",
      portalId: "21396257",
      formId: "16b9634b-3ea9-4539-9ec2-b83d4125e24c"
  });
  </script>
</section>
      </section>

      <section class="footer-nav__social">
        <nav>
          
            <li>
              <a href="https://www.facebook.com/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/facebook.svg"></load-file>
              </a>
            </li>
          
            <li>
              <a href="https://twitter.com/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/twitter.svg"></load-file>
              </a>
            </li>
          
            <li>
              <a href="https://www.linkedin.com/company/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/linkedin.svg"></load-file>
              </a>
            </li>
          
            <li>
              <a href="https://github.com/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/github.svg"></load-file>
              </a>
            </li>
          
        </nav>

        <div>
          <a class="footer-nav__logo" href="/">
            <img src="/assets/images/site/shopnotoolbox-logo-borderless.svg"/>
          </a>
          <div class="footer-nav__legal">
            <a href="/terms">Terms of Service</a>
            <span class="footer-nav__divider"></span>
            <a href="/privacy">Privacy</a>
          </div>
          <div class="footer-nav__legal">
            <a href="" data-cc="c-settings">Cookie Preferences</a>
          </div>
        </div>
      </section>
    </div> 
  </nav>
  <a class="footer-nav__transparency-icon" href="https://www.guidestar.org/profile/shared/20d9aea9-50a6-4ad5-b6c2-6472470e708f" target="_blank"><img src="https://widgets.guidestar.org/TransparencySeal/9868102" /></a>
  <div class="footer-nav__copyright">Website content is licensed under a <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank">CC-BY-NC license</a>, unless noted otherwise.</div>
</div>
    </div>
  </div>
</footer>


    <script async src="https://shopnoltd.kesug.com/assets/scripts/kobo.js?2024-12-05_18-51-37"></script>
    
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-26003863-1"></script>
    <script type="text/plain" data-cookiecategory="analytics">
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-26003863-1');
    </script>
</body>
</html>


    `);  // <-- Make sure this closing backtick is also present here
});



// Dynamic route for /services/training
app.get('/services/training', (req, res) => {
    res.send(`



<!DOCTYPE html>
<html lang="en-US">

<head>
    
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <meta http-equiv="Content-Security-Policy" content="
        default-src 'self';
        img-src 'self' https://static.fundraiseup.com *.hsforms.com https://www.google-analytics.com https://ucarecdn.com
        *.paypal.com data: https://www.paypalobjects.com https://www.gstatic.com *.guidestar.org;
        script-src 'self' 'unsafe-inline' http://js.hsforms.net *.fundraiseup.com *.googletagmanager.com https://www.google-analytics.com
        https://ssl.google-analytics.com https://js.stripe.com https://www.paypal.com https://pay.google.com;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com;
        font-src 'self' https://fonts.gstatic.com https://static.fundraiseup.com;
        connect-src 'self' https://fndrsp.net https://forms.hsforms.com https://api.fundraiseup.com https://js.stripe.com
        https://www.google-analytics.com https://fndrsp-checkout.net https://sentry.fundraiseup.com https://www.paypal.com
        https://hubspot-forms-static-embed.s3.amazonaws.com https://google.com https://pay.google.com ws:;
        frame-src 'self' https://js.stripe.com https://forms.hsforms.com https://www.paypal.com https://pay.google.com/ *.youtube.com;
    ">

    
    <title>shopnotoolbox training | shopnotoolbox</title>
    <meta name="description" content="shopnotoolbox is an intuitive, powerful, and reliable software used to collect, analyze, and manage data for surveys, monitoring, evaluation, and research."/>
    <base href="https://shopnoltd.kesug.com"/>
    <link rel="home" href="https://shopnoltd.kesug.com"/>

    
    <meta name="robots" content="index,follow,noodp"/>
    <meta name="googlebot" content="index,follow"/>

    
    <meta property="og:locale" content="en_US"/>
    <meta property="og:site_name" content="shopnotoolbox"/>
    <meta property="og:title" content="shopnotoolbox training"/>
    <meta property="og:description" content="shopnotoolbox is an intuitive, powerful, and reliable software used to collect, analyze, and manage data for surveys, monitoring, evaluation, and research."/>
    <meta property="og:url" content="https://shopnoltd.kesug.com/services/training/"/>
    <meta name="twitter:site" content="@shopnotoolbox"/>
    <meta name="twitter:description" content="shopnotoolbox is an intuitive, powerful, and reliable software used to collect, analyze, and manage data for surveys, monitoring, evaluation, and research."/>

    
    
    
        <meta property="og:type" content="website"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content="shopnotoolbox"/>
        <meta name="twitter:image" content="https://shopnoltd.kesug.com/assets/images/common/shopnotoolbox_opengraph_image.png"/>
        <meta property="og:image" content="https://shopnoltd.kesug.com/assets/images/common/shopnotoolbox_opengraph_image.png"/>
    

    
    <link href="https://shopnoltd.kesug.com/assets/styles/kobo.css?2024-12-05_18-51-37" rel="stylesheet" media="all"/>
    <link rel="icon" href="https://shopnoltd.kesug.com/favicon.png?2024-12-05_18-51-37"/>



    
    <script>
    (function(w,d,s,n,a){if(!w[n]){var l='call,catch,on,once,set,then,track'
    .split(','),i,o=function(n){return'function'==typeof n?o.l.push([arguments])&&o
    :function(){return o.l.push([n,arguments])&&o}},t=d.getElementsByTagName(s)[0],
    j=d.createElement(s);j.async=!0;j.src='https://cdn.fundraiseup.com/widget/'+a;
    t.parentNode.insertBefore(j,t);o.s=Date.now();o.v=4;o.h=w.location.href;o.l=[];
    for(i=0;i<7;i++)o[l[i]]=o(l[i]);w[n]=o}
    })(window,document,'script','FundraiseUp','ASAUFVGL');</script>
</head>


<body class="root">


<header class="root__header">
  <div class="root__row">
    <div class="root__row-content root__row-content--wide">
      <nav class="header-nav">
  <a class="header-nav__logo" href="/">
    <img src="/assets/images/common/shopnotoolbox_logo_default_for-light-bg.svg"/>
  </a>
  <a class="header-nav__mobile-logo" href="/">
    <img src="/assets/images/site/shopnotoolbox-logo-mobile.svg"/>
  </a>

  
  <input type="checkbox" id="mobile-nav-trigger">
  <label class="header-nav__mobile-nav-trigger" for="mobile-nav-trigger">
    <i></i><i></i><i></i><i></i>
  </label>

  <ul class="header-nav__menu">
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/about-us"
          >About us</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/features"
          >Features</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item header-nav__menu-item--active"
          href="/services"
          >Services</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/pricing"
          >Pricing</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/blog"
          >Blog</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/help"
          >Help</a
        >
      </li>
    
  </ul>

  <ul class="header-nav__buttons">
    
    
    <li>
<a class="button button--size-m button--type-frame button--color-blue" href="/sign-up">Sign up</a>
</li>
    <li>
<a class="button button--size-m button--type-full button--color-blue" href="/donate">Donate</a>
</li>
  </ul>
</nav>

    </div>
  </div>
</header>


<div class="modal" data-modal>
  <div class="modal__box">
    <button class="modal__closer" data-modal-closer>&times;</button>
    <div class="modal__content" data-modal-content>Hello, World!</div>
  </div>
</div>


<main class="root__main" role="main">

<div class="root__row">
  <div class="root__row-content">
    <section class="services-subpage">
      <div class="services-subpage__nav-container">
        <nav class="services-subpage__nav">
          <ul>
            
            <li>
              <a
                class="services-subpage__nav-item"
                href="/services/training/#introduction"
              >
                Introduction
              </a>
            </li>
            
            <li>
              <a
                class="services-subpage__nav-item"
                href="/services/training/#offerings"
              >
                Training session offerings
              </a>
            </li>
            
            <li>
              <a
                class="services-subpage__nav-item"
                href="/services/training/#options"
              >
                Training options
              </a>
            </li>
            
            <li>
              <a
                class="services-subpage__nav-item"
                href="/services/training/#get-started"
              >
                Get started
              </a>
            </li>
            
          </ul>
        </nav>
      </div>
      <article class="services-subpage__article">
        <h2 id="introduction" class="anchor-link--scroll-offset">
          shopnotoolbox training
        </h2>
        <div class="services-subpage__intro">
          <p>
            Training solutions for your team, from our staff experts. Our
            experienced trainers can deliver hands-on training to strengthen
            your organization's data collection skills, from developing forms to
            managing data. Synchronous online and in-person trainings are
            available in multiple languages and can be tailored to your team's
            level of experience and context.
          </p>
          <p>
            Choose from our training sessions or request a custom training
            solution to support your team in any area of data collection,
            including using XLSForm for advanced surveys, configuring
            KoboCollect for mobile data collection, and adding multiple
            translations to a form. All training sessions include hands-on
            activities to apply concepts from the training and solidify
            learning.
          </p>
        </div>
        <div
          id="offerings"
          class="services-subpage__subhead anchor-link--scroll-offset"
        >
          Our training session offerings
        </div>
          <div class="service-details">
  <div class="service-details__img-container">
    <img src="/assets/images/services/training/shopnotoolbox-essentials.png">
  </div>
  <div class="service-details__text-block">
    <div>
      <div class="service-details__subhead">
        shopnotoolbox Essentials
      </div>
      <div>
      <ul class="service-details__bullet-list">
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--mid-blue">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Complete orientation to the shopnotoolbox platform and user interface
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--mid-blue">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Survey creation using shopnotoolbox's intuitive Formbuilder
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--mid-blue">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Adding translations in multiple languages
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--mid-blue">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Form deployment and data collection with shopnotoolbox
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--mid-blue">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Data management essentials, including reports and downloading data
          </li>
        
      </ul>
      </div>
    </div>
  </div>
</div>
          <div class="service-details service-details--reverse">
  <div class="service-details__img-container">
    <img src="/assets/images/services/training/data-collection.png">
  </div>
  <div class="service-details__text-block">
    <div>
      <div class="service-details__subhead">
        Data Collection and Data Management In-Depth
      </div>
      <div>
      <ul class="service-details__bullet-list">
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--storm">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Configuring Enketo web forms and KoboCollect
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--storm">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Advanced project settings, sharing, and permissions
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--storm">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Using automated transcription and translation
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--storm">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Comprehensive data management
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--storm">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Customizing reports, downloading data, and using media
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--storm">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Integrating project data with Excel and Power BI
          </li>
        
      </ul>
      </div>
    </div>
  </div>
</div>
          <div class="service-details">
  <div class="service-details__img-container">
    <img src="/assets/images/services/training/form-development.png">
  </div>
  <div class="service-details__text-block">
    <div>
      <div class="service-details__subhead">
        Advanced Form Development
      </div>
      <div>
      <ul class="service-details__bullet-list">
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--teal">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Building forms with XLSForm, including validating and uploading forms to shopnotoolbox
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--teal">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Creating advanced question types with groups, repeats, and cascading selects
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--teal">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Customizing forms and adding media
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--teal">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Using advanced form logic, calculations, and validation criteria
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--teal">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Troubleshooting XLSForm
          </li>
        
      </ul>
      </div>
    </div>
  </div>
</div>
        
        <div
          id="options"
          class="services-subpage__subhead services-subpage__subhead--text-sections anchor-link--scroll-offset"
        >
          Training options
        </div>
        <div class="services-subpage__text-section">
          <p>
            Comprehensive training packages including multiple sessions or
            coverage of specific topics can be tailored to the needs of your
            organization. Fully custom-made sessions can be developed upon
            request with customized topics on any aspect of the data collection
            cycle.
          </p>
          <p>
            Training sessions can be scheduled to align with your project
            timeline and delivered remotely or in person. Training sessions are
            also available in multiple languages. Discounted pricing is
            available for large teams.
          </p>
          <p>
            <a href="/contact">Get in touch</a> to learn more about our training
            packages.
          </p>
        </div>
        <div
          id="get-started"
          class="services-subpage__subhead services-subpage__subhead--text-sections anchor-link--scroll-offset"
        >
          Get started
        </div>
        <div class="services-subpage__text-section">
          <p>
            Have the experts behind shopnotoolbox build your team's capacity and
            train your project enumerators on all aspects of data collection,
            from an orientation to shopnotoolbox to developing complex surveys.
            Ensure your team is well prepared to collect quality data and
            generate data-driven insights.
          </p>
          <p>
            Our experts have provided training to organizations operating in
            countries around the world, delivering tailored training to teams
            working in a variety of contexts, including disaster response,
            humanitarian action, and development initiatives.
          </p>
          <p>
            Our team can help assess your training needs and answer any
            questions you might have.
            <a href="/contact">Get in touch</a> to discuss training solutions
            for your team.
          </p>
        </div>
      </article>
    </section>
  </div>
</div>

  <div class="root__row">
    <div class="root__row-content">
      <section class="service-quick-links">
        <div class="service-quick-links__header">
          More services and support for your team
        </div>
        <div class="service-quick-links__container">
          
            
            
            
            
            
      
            
            <a class="service-quick-links__box arrow-link__trigger" 
            style="background-color: #E5EEF5"
            href="/services/private-servers"
            >
              <div>
                <div class="service-quick-links__link-title">
                  Private servers
                </div>
                <div class="service-quick-links__link-description">
                  Customizable and scalable with unlimited data collection and enhanced security, our most comprehensive data solution.
                </div>
              </div>
                


  <div class="arrow-link arrow-link--color-dark-blue arrow-link--size-m arrow-link--align-left">
    Learn more
    <span class="arrow-link__icon">
      <svg>
        <use xlink:href="/assets/images/site/sprite.svg#arrow-right"/>
      </svg>
    </span>
  </div>


            </a>
            
          
            
            
            
            
            
      
            
          
            
            
            
            
            
      
            
            <a class="service-quick-links__box arrow-link__trigger" 
            style="background-color: #F1F4FC"
            href="/services/project-rollout-support"
            >
              <div>
                <div class="service-quick-links__link-title">
                  Project support
                </div>
                <div class="service-quick-links__link-description">
                  Direct support for your team, from survey design to troubleshooting.
                </div>
              </div>
                


  <div class="arrow-link arrow-link--color-dark-blue arrow-link--size-m arrow-link--align-left">
    Learn more
    <span class="arrow-link__icon">
      <svg>
        <use xlink:href="/assets/images/site/sprite.svg#arrow-right"/>
      </svg>
    </span>
  </div>


            </a>
            
          
            
            
            
            
            
      
            
            <a class="service-quick-links__box arrow-link__trigger" 
            style="background-color: #FFEDDB"
            href="/services/dashboard-development/"
            >
              <div>
                <div class="service-quick-links__link-title">
                  Dashboard development
                </div>
                <div class="service-quick-links__link-description">
                  Enhanced data visualization for improved analysis, insights, and project management.
                </div>
              </div>
                


  <div class="arrow-link arrow-link--color-dark-blue arrow-link--size-m arrow-link--align-left">
    Learn more
    <span class="arrow-link__icon">
      <svg>
        <use xlink:href="/assets/images/site/sprite.svg#arrow-right"/>
      </svg>
    </span>
  </div>


            </a>
            
          
        </div>
      </section>
    </div>
  </div>
</main>

<footer class="root__footer">
  <div class="root__row">
    <div class="root__row-content root__row-content--wide">
      <div class="footer-nav__container">
  <nav class="footer-nav">
    <div class="footer-nav__block footer-nav__menu">
      <ul class="footer-nav-menu__row">
        <label>Organization</label>

        
          <li>
            <a href="/about-us/">About us</a>
          </li>
        
          <li>
            <a href="/about-us/meet-the-team/">Team</a>
          </li>
        
          <li>
            <a href="/join-our-team">Jobs</a>
          </li>
        
          <li>
            <a href="/about-us/financials/">Financials</a>
          </li>
        
          <li>
            <a href="/contact/">Contact</a>
          </li>
        
      </ul>

      <ul class="footer-nav-menu__row">
        <label>Software</label>

        
          <li>
            <a href="https://academy.shopnotoolbox.org/collections">Online learning</a>
          </li>
        
          <li>
            <a href="/about-us/software">About shopnotoolbox</a>
          </li>
        
          <li>
            <a href="/features">Features</a>
          </li>
        
          <li>
            <a href="/pricing">Pricing</a>
          </li>
        
          <li>
            <a href="/services/private-servers">Private servers</a>
          </li>
        
          <li>
            <a href="/services">Services</a>
          </li>
        
      </ul>

      <ul class="footer-nav-menu__row">
        <label>Community</label>

        
          <li>
            <a href="https://community.shopnotoolbox.org/">Forum</a>
          </li>
        
          <li>
            <a href="https://support.shopnotoolbox.org/">Documentation</a>
          </li>
        
          <li>
            <a href="/donate">Donate</a>
          </li>
        
      </ul>
    </div>

    <div class="footer-nav__block">
      <section class="footer-nav__newsletter">
        <h3>Stay up<br/>to date.</h3>

        <p>Subscribe to our shopnotoolbox Updates newsletter to be the first to learn about new features, resources, and user impact stories from around the world.</p>

        <section class="newsletter-form-wrapper">
  <script charset="utf-8" type="text/javascript" src="https://js.hsforms.net/forms/shell.js"></script>
  <script>
    hbspt.forms.create({
      region: "na1",
      portalId: "21396257",
      formId: "16b9634b-3ea9-4539-9ec2-b83d4125e24c"
  });
  </script>
</section>
      </section>

      <section class="footer-nav__social">
        <nav>
          
            <li>
              <a href="https://www.facebook.com/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/facebook.svg"></load-file>
              </a>
            </li>
          
            <li>
              <a href="https://twitter.com/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/twitter.svg"></load-file>
              </a>
            </li>
          
            <li>
              <a href="https://www.linkedin.com/company/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/linkedin.svg"></load-file>
              </a>
            </li>
          
            <li>
              <a href="https://github.com/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/github.svg"></load-file>
              </a>
            </li>
          
        </nav>

        <div>
          <a class="footer-nav__logo" href="/">
            <img src="/assets/images/site/shopnotoolbox-logo-borderless.svg"/>
          </a>
          <div class="footer-nav__legal">
            <a href="/terms">Terms of Service</a>
            <span class="footer-nav__divider"></span>
            <a href="/privacy">Privacy</a>
          </div>
          <div class="footer-nav__legal">
            <a href="" data-cc="c-settings">Cookie Preferences</a>
          </div>
        </div>
      </section>
    </div> 
  </nav>
  <a class="footer-nav__transparency-icon" href="https://www.guidestar.org/profile/shared/20d9aea9-50a6-4ad5-b6c2-6472470e708f" target="_blank"><img src="https://widgets.guidestar.org/TransparencySeal/9868102" /></a>
  <div class="footer-nav__copyright">Website content is licensed under a <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank">CC-BY-NC license</a>, unless noted otherwise.</div>
</div>
    </div>
  </div>
</footer>


    <script async src="https://shopnoltd.kesug.com/assets/scripts/kobo.js?2024-12-05_18-51-37"></script>
    
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-26003863-1"></script>
    <script type="text/plain" data-cookiecategory="analytics">
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-26003863-1');
    </script>
</body>
</html>


    `);  // <-- Make sure this closing backtick is also present here
});



// Dynamic route for /services/private-servers
app.get('/services/private-servers', (req, res) => {
    res.send(`



<!DOCTYPE html>
<html lang="en-US">

<head>
    
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <meta http-equiv="Content-Security-Policy" content="
        default-src 'self';
        img-src 'self' https://static.fundraiseup.com *.hsforms.com https://www.google-analytics.com https://ucarecdn.com
        *.paypal.com data: https://www.paypalobjects.com https://www.gstatic.com *.guidestar.org;
        script-src 'self' 'unsafe-inline' http://js.hsforms.net *.fundraiseup.com *.googletagmanager.com https://www.google-analytics.com
        https://ssl.google-analytics.com https://js.stripe.com https://www.paypal.com https://pay.google.com;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com;
        font-src 'self' https://fonts.gstatic.com https://static.fundraiseup.com;
        connect-src 'self' https://fndrsp.net https://forms.hsforms.com https://api.fundraiseup.com https://js.stripe.com
        https://www.google-analytics.com https://fndrsp-checkout.net https://sentry.fundraiseup.com https://www.paypal.com
        https://hubspot-forms-static-embed.s3.amazonaws.com https://google.com https://pay.google.com ws:;
        frame-src 'self' https://js.stripe.com https://forms.hsforms.com https://www.paypal.com https://pay.google.com/ *.youtube.com;
    ">

    
    <title>Private Servers | shopnotoolbox</title>
    <meta name="description" content="shopnotoolbox is an intuitive, powerful, and reliable software used to collect, analyze, and manage data for surveys, monitoring, evaluation, and research."/>
    <base href="https://shopnoltd.kesug.com"/>
    <link rel="home" href="https://shopnoltd.kesug.com"/>

    
    <meta name="robots" content="index,follow,noodp"/>
    <meta name="googlebot" content="index,follow"/>

    
    <meta property="og:locale" content="en_US"/>
    <meta property="og:site_name" content="shopnotoolbox"/>
    <meta property="og:title" content="Private Servers"/>
    <meta property="og:description" content="shopnotoolbox is an intuitive, powerful, and reliable software used to collect, analyze, and manage data for surveys, monitoring, evaluation, and research."/>
    <meta property="og:url" content="https://shopnoltd.kesug.com/services/private-servers/"/>
    <meta name="twitter:site" content="@shopnotoolbox"/>
    <meta name="twitter:description" content="shopnotoolbox is an intuitive, powerful, and reliable software used to collect, analyze, and manage data for surveys, monitoring, evaluation, and research."/>

    
    
    
        <meta property="og:type" content="website"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content="shopnotoolbox"/>
        <meta name="twitter:image" content="https://shopnoltd.kesug.com/assets/images/common/shopnotoolbox_opengraph_image.png"/>
        <meta property="og:image" content="https://shopnoltd.kesug.com/assets/images/common/shopnotoolbox_opengraph_image.png"/>
    

    
    <link href="https://shopnoltd.kesug.com/assets/styles/kobo.css?2024-12-05_18-51-37" rel="stylesheet" media="all"/>
    <link rel="icon" href="https://shopnoltd.kesug.com/favicon.png?2024-12-05_18-51-37"/>



    
    <script>
    (function(w,d,s,n,a){if(!w[n]){var l='call,catch,on,once,set,then,track'
    .split(','),i,o=function(n){return'function'==typeof n?o.l.push([arguments])&&o
    :function(){return o.l.push([n,arguments])&&o}},t=d.getElementsByTagName(s)[0],
    j=d.createElement(s);j.async=!0;j.src='https://cdn.fundraiseup.com/widget/'+a;
    t.parentNode.insertBefore(j,t);o.s=Date.now();o.v=4;o.h=w.location.href;o.l=[];
    for(i=0;i<7;i++)o[l[i]]=o(l[i]);w[n]=o}
    })(window,document,'script','FundraiseUp','ASAUFVGL');</script>
</head>


<body class="root">


<header class="root__header">
  <div class="root__row">
    <div class="root__row-content root__row-content--wide">
      <nav class="header-nav">
  <a class="header-nav__logo" href="/">
    <img src="/assets/images/common/shopnotoolbox_logo_default_for-light-bg.svg"/>
  </a>
  <a class="header-nav__mobile-logo" href="/">
    <img src="/assets/images/site/shopnotoolbox-logo-mobile.svg"/>
  </a>

  
  <input type="checkbox" id="mobile-nav-trigger">
  <label class="header-nav__mobile-nav-trigger" for="mobile-nav-trigger">
    <i></i><i></i><i></i><i></i>
  </label>

  <ul class="header-nav__menu">
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/about-us"
          >About us</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/features"
          >Features</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item header-nav__menu-item--active"
          href="/services"
          >Services</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/pricing"
          >Pricing</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/blog"
          >Blog</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/help"
          >Help</a
        >
      </li>
    
  </ul>

  <ul class="header-nav__buttons">
    
    
    <li>
<a class="button button--size-m button--type-frame button--color-blue" href="/sign-up">Sign up</a>
</li>
    <li>
<a class="button button--size-m button--type-full button--color-blue" href="/donate">Donate</a>
</li>
  </ul>
</nav>

    </div>
  </div>
</header>


<div class="modal" data-modal>
  <div class="modal__box">
    <button class="modal__closer" data-modal-closer>&times;</button>
    <div class="modal__content" data-modal-content>Hello, World!</div>
  </div>
</div>


<main class="root__main" role="main">

<div class="root__row">
  <div class="root__row-content">
    <section class="services-subpage">
      <div class="services-subpage__nav-container">
        <nav class="services-subpage__nav">
          <ul>
            
            <li>
              <a
                class="services-subpage__nav-item"
                href="/services/private-servers/#introduction"
              >
                Introduction
              </a>
            </li>
            
            <li>
              <a
                class="services-subpage__nav-item"
                href="/services/private-servers/#benefits"
              >
                Benefits
              </a>
            </li>
            
            <li>
              <a
                class="services-subpage__nav-item"
                href="/services/private-servers/#server-set-up"
              >
                Server set up options
              </a>
            </li>
            
            <li>
              <a
                class="services-subpage__nav-item"
                href="/services/private-servers/#organizations-using-private-servers"
              >
                Organizations using private servers
              </a>
            </li>
            
            <li>
              <a
                class="services-subpage__nav-item"
                href="/services/private-servers/#get-started"
              >
                Get started
              </a>
            </li>
            
          </ul>
        </nav>
      </div>
      <article class="services-subpage__article">
        <h2 id="introduction" class="anchor-link--scroll-offset">
          Private shopnotoolbox servers
        </h2>
        <div class="services-subpage__intro">
          <p>
            For large organizations seeking customizable and scalable data
            collection solutions with more project oversight and more security
            features, we offer private shopnotoolbox servers---fully controlled by
            your organization, installed and maintained by our team of experts.
          </p>
          <p>
            Private servers offer many advantages for large organizations with
            complex needs and high volume data collection. These include
            unlimited usage, advanced user management, enhanced security,
            priority support, custom branding options, and early access to
            testing new features.
          </p>
        </div>
        <div
          id="benefits"
          class="services-subpage__subhead anchor-link--scroll-offset"
        >
          Benefits of a private server
        </div>
          <div class="service-details">
  <div class="service-details__img-container">
    <img src="/assets/images/services/private-servers/scalability.png">
  </div>
  <div class="service-details__text-block">
    <div>
      <div class="service-details__subhead">
        No limits and infinite scalability
      </div>
      <div>
      <ul class="service-details__bullet-list">
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--storm">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Unlimited survey submissions
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--storm">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Unlimited projects and users
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--storm">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Unlimited media file storage
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--storm">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Unlimited scalability, so the server can grow with your needs
          </li>
        
      </ul>
      </div>
    </div>
  </div>
</div>
          <div class="service-details service-details--reverse">
  <div class="service-details__img-container">
    <img src="/assets/images/services/private-servers/oversight.png">
  </div>
  <div class="service-details__text-block">
    <div>
      <div class="service-details__subhead">
        More oversight and advanced user management
      </div>
      <div>
      <ul class="service-details__bullet-list">
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--teal">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Custom project views for better supervision across countries or regions
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--teal">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Full administrator-level control of data and users
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--teal">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Custom password policies
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--teal">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Email domain restrictions for account registration
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--teal">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Server-wide data retention and user management policies
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--teal">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Logs of all deleted survey data
          </li>
        
      </ul>
      </div>
    </div>
  </div>
</div>
          <div class="service-details">
  <div class="service-details__img-container">
    <img src="/assets/images/services/private-servers/security.png">
  </div>
  <div class="service-details__text-block">
    <div>
      <div class="service-details__subhead">
        Enhanced security to meet your organization's requirements
      </div>
      <div>
      <ul class="service-details__bullet-list">
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--mid-blue">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Multi-factor authentication (MFA)
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--mid-blue">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Single sign-on (SSO) with one or more identity providers
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--mid-blue">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Immediate deployment of new features and security updates
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--mid-blue">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Continuous database and file storage backups with point-in-time recovery (PITR)
          </li>
        
      </ul>
      </div>
    </div>
  </div>
</div>
          <div class="service-details service-details--reverse">
  <div class="service-details__img-container">
    <img src="/assets/images/services/private-servers/support.png">
  </div>
  <div class="service-details__text-block">
    <div>
      <div class="service-details__subhead">
        Priority expert support and technical administration
      </div>
      <div>
      <ul class="service-details__bullet-list">
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--storm">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Direct real-time support from our team through internal shopnotoolbox chat channel
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--storm">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Consultations with our expert staff
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--storm">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Continuous server maintenance by our team, including monitoring, scaling, and backups
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--storm">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Technical troubleshooting support to ensure server uptime and performance
          </li>
        
      </ul>
      </div>
    </div>
  </div>
</div>
          <div class="service-details">
  <div class="service-details__img-container">
    <img src="/assets/images/services/private-servers/innovation.png">
  </div>
  <div class="service-details__text-block">
    <div>
      <div class="service-details__subhead">
        Shape the future of data innovation
      </div>
      <div>
      <ul class="service-details__bullet-list">
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--teal">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Early access to review and test new features
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--teal">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Help improve upcoming features with your pre-release testing feedback
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--teal">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Contribute your direct input to our software development planning
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--teal">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Help shape the shopnotoolbox future roadmap
          </li>
        
      </ul>
      </div>
    </div>
  </div>
</div>
          <div class="service-details service-details--reverse">
  <div class="service-details__img-container">
    <img src="/assets/images/services/private-servers/new-features.png">
  </div>
  <div class="service-details__text-block">
    <div>
      <div class="service-details__subhead">
        New server-level features coming soon
      </div>
      <div>
      <ul class="service-details__bullet-list">
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--dark-teal">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Detailed access logs
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--dark-teal">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Team-based user management
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--dark-teal">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Server-level SSO enforcement
          </li>
        
      </ul>
      </div>
    </div>
  </div>
</div>
        
        <div class="services-subpage__contact-cta">
          <div class="services-subpage__contact-cta-text">
            Learn more about how your organization can benefit from a private
            server
          </div>
          <div class="services-subpage__contact-cta-button">
            
<a class="button button--size-m button--type-full button--color-blue" href="/contact">Get in touch</a>

          </div>
        </div>
        <div
          id="server-set-up"
          class="services-subpage__subhead services-subpage__subhead--text-sections anchor-link--scroll-offset"
        >
          Server set up options
        </div>
        <div class="services-subpage__text-section">
          <div>
            With a dedicated server, you can choose the best set up for your
            organization from a variety of options, including:
          </div>
          <ul>
            <li>Hosting with Amazon Web Services (AWS) or Microsoft Azure</li>
            <li>
              Server location in either the United States or the European Union
            </li>
            <li>
              Custom branding for URL (e.g., kobo.yourorganization.org), logo,
              and more
            </li>
            <li>Enhanced security configurations</li>
            <li>
              Customizable account registration and email confirmation messages
            </li>
          </ul>
        </div>
        <div
          id="organizations-using-private-servers"
          class="services-subpage__subhead services-subpage__subhead--text-sections anchor-link--scroll-offset"
        >
          Organizations using private servers
        </div>
        <div class="services-subpage__text-section">
          <div>
            Many organizations are already using a dedicated private shopnotoolbox
            server supported by Kobo to collect high volumes of data and improve
            project oversight. These include:
          </div>
          <ul class="services-subpage__link-list">
            <li>
              <a href="https://www.unhcr.org">United Nations Refugee Agency</a>
              <span>(UNHCR)</span>
            </li>
            <li>
              <a href="https://www.unocha.org/"
                >United Nations Office for the Coordination of Humanitarian
                Affairs</a
              >
              <span>(UN OCHA)</span>
            </li>
            <li>
              <a href="https://www.iom.int/"
                >International Organization for Migration</a
              >
              <span>(UN-IOM)</span>
            </li>
            <li>
              <a href="https://www.msf.org/">Médecins Sans Frontières</a>
              <span>(MSF)</span>
            </li>
            <li>
              <a href="https://www.ifrc.org/"
                >International Federation of Red Cross and Red Crescent
                Societies</a
              >
              <span>(IFRC)</span>
            </li>
            <li>
              <a href="https://www.savethechildren.net/"
                >Save the Children International</a
              >
              <span>(SCI)</span>
            </li>
          </ul>
        </div>
        <div
          id="get-started"
          class="services-subpage__subhead services-subpage__subhead--text-sections anchor-link--scroll-offset"
        >
          Get started
        </div>
        <div class="services-subpage__text-section">
          <p>
            A private server offers large organizations reliability,
            flexibility, and enhanced security with unlimited use and complete
            control over users and data. Through an annual agreement, we ensure
            dedicated technical support and system administration for your
            organization's unique data collection needs.
          </p>
          <p>
            Our team can help address any questions or requests you might have.
            <a href="/contact">Get in touch</a> to learn more about our private
            shopnotoolbox server options.
          </p>
        </div>
      </article>
    </section>
  </div>
</div>


  <div class="root__row">
    <div class="root__row-content">
      <section class="service-quick-links">
        <div class="service-quick-links__header">
          More services and support for your team
        </div>
        <div class="service-quick-links__container">
          
            
            
            
            
            
      
            
          
            
            
            
            
            
      
            
            <a class="service-quick-links__box arrow-link__trigger" 
            style="background-color: #E8F4FF"
            href="/services/training/"
            >
              <div>
                <div class="service-quick-links__link-title">
                  Training solutions
                </div>
                <div class="service-quick-links__link-description">
                  Strengthen your team's data collection with training designed and delivered by our experts.
                </div>
              </div>
                


  <div class="arrow-link arrow-link--color-dark-blue arrow-link--size-m arrow-link--align-left">
    Learn more
    <span class="arrow-link__icon">
      <svg>
        <use xlink:href="/assets/images/site/sprite.svg#arrow-right"/>
      </svg>
    </span>
  </div>


            </a>
            
          
            
            
            
            
            
      
            
            <a class="service-quick-links__box arrow-link__trigger" 
            style="background-color: #F1F4FC"
            href="/services/project-rollout-support"
            >
              <div>
                <div class="service-quick-links__link-title">
                  Project support
                </div>
                <div class="service-quick-links__link-description">
                  Direct support for your team, from survey design to troubleshooting.
                </div>
              </div>
                


  <div class="arrow-link arrow-link--color-dark-blue arrow-link--size-m arrow-link--align-left">
    Learn more
    <span class="arrow-link__icon">
      <svg>
        <use xlink:href="/assets/images/site/sprite.svg#arrow-right"/>
      </svg>
    </span>
  </div>


            </a>
            
          
            
            
            
            
            
      
            
            <a class="service-quick-links__box arrow-link__trigger" 
            style="background-color: #FFEDDB"
            href="/services/dashboard-development/"
            >
              <div>
                <div class="service-quick-links__link-title">
                  Dashboard development
                </div>
                <div class="service-quick-links__link-description">
                  Enhanced data visualization for improved analysis, insights, and project management.
                </div>
              </div>
                


  <div class="arrow-link arrow-link--color-dark-blue arrow-link--size-m arrow-link--align-left">
    Learn more
    <span class="arrow-link__icon">
      <svg>
        <use xlink:href="/assets/images/site/sprite.svg#arrow-right"/>
      </svg>
    </span>
  </div>


            </a>
            
          
        </div>
      </section>
    </div>
  </div>
</main>

<footer class="root__footer">
  <div class="root__row">
    <div class="root__row-content root__row-content--wide">
      <div class="footer-nav__container">
  <nav class="footer-nav">
    <div class="footer-nav__block footer-nav__menu">
      <ul class="footer-nav-menu__row">
        <label>Organization</label>

        
          <li>
            <a href="/about-us/">About us</a>
          </li>
        
          <li>
            <a href="/about-us/meet-the-team/">Team</a>
          </li>
        
          <li>
            <a href="/join-our-team">Jobs</a>
          </li>
        
          <li>
            <a href="/about-us/financials/">Financials</a>
          </li>
        
          <li>
            <a href="/contact/">Contact</a>
          </li>
        
      </ul>

      <ul class="footer-nav-menu__row">
        <label>Software</label>

        
          <li>
            <a href="https://academy.shopnotoolbox.org/collections">Online learning</a>
          </li>
        
          <li>
            <a href="/about-us/software">About shopnotoolbox</a>
          </li>
        
          <li>
            <a href="/features">Features</a>
          </li>
        
          <li>
            <a href="/pricing">Pricing</a>
          </li>
        
          <li>
            <a href="/services/private-servers">Private servers</a>
          </li>
        
          <li>
            <a href="/services">Services</a>
          </li>
        
      </ul>

      <ul class="footer-nav-menu__row">
        <label>Community</label>

        
          <li>
            <a href="https://community.shopnotoolbox.org/">Forum</a>
          </li>
        
          <li>
            <a href="https://support.shopnotoolbox.org/">Documentation</a>
          </li>
        
          <li>
            <a href="/donate">Donate</a>
          </li>
        
      </ul>
    </div>

    <div class="footer-nav__block">
      <section class="footer-nav__newsletter">
        <h3>Stay up<br/>to date.</h3>

        <p>Subscribe to our shopnotoolbox Updates newsletter to be the first to learn about new features, resources, and user impact stories from around the world.</p>

        <section class="newsletter-form-wrapper">
  <script charset="utf-8" type="text/javascript" src="https://js.hsforms.net/forms/shell.js"></script>
  <script>
    hbspt.forms.create({
      region: "na1",
      portalId: "21396257",
      formId: "16b9634b-3ea9-4539-9ec2-b83d4125e24c"
  });
  </script>
</section>
      </section>

      <section class="footer-nav__social">
        <nav>
          
            <li>
              <a href="https://www.facebook.com/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/facebook.svg"></load-file>
              </a>
            </li>
          
            <li>
              <a href="https://twitter.com/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/twitter.svg"></load-file>
              </a>
            </li>
          
            <li>
              <a href="https://www.linkedin.com/company/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/linkedin.svg"></load-file>
              </a>
            </li>
          
            <li>
              <a href="https://github.com/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/github.svg"></load-file>
              </a>
            </li>
          
        </nav>

        <div>
          <a class="footer-nav__logo" href="/">
            <img src="/assets/images/site/shopnotoolbox-logo-borderless.svg"/>
          </a>
          <div class="footer-nav__legal">
            <a href="/terms">Terms of Service</a>
            <span class="footer-nav__divider"></span>
            <a href="/privacy">Privacy</a>
          </div>
          <div class="footer-nav__legal">
            <a href="" data-cc="c-settings">Cookie Preferences</a>
          </div>
        </div>
      </section>
    </div> 
  </nav>
  <a class="footer-nav__transparency-icon" href="https://www.guidestar.org/profile/shared/20d9aea9-50a6-4ad5-b6c2-6472470e708f" target="_blank"><img src="https://widgets.guidestar.org/TransparencySeal/9868102" /></a>
  <div class="footer-nav__copyright">Website content is licensed under a <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank">CC-BY-NC license</a>, unless noted otherwise.</div>
</div>
    </div>
  </div>
</footer>


    <script async src="https://shopnoltd.kesug.com/assets/scripts/kobo.js?2024-12-05_18-51-37"></script>
    
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-26003863-1"></script>
    <script type="text/plain" data-cookiecategory="analytics">
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-26003863-1');
    </script>
</body>
</html>


    `);  // <-- Make sure this closing backtick is also present here
});


// Dynamic route for /services/dashboard-development
app.get('/services/dashboard-development', (req, res) => {
    res.send(`



<!DOCTYPE html>
<html lang="en-US">

<head>
    
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <meta http-equiv="Content-Security-Policy" content="
        default-src 'self';
        img-src 'self' https://static.fundraiseup.com *.hsforms.com https://www.google-analytics.com https://ucarecdn.com
        *.paypal.com data: https://www.paypalobjects.com https://www.gstatic.com *.guidestar.org;
        script-src 'self' 'unsafe-inline' http://js.hsforms.net *.fundraiseup.com *.googletagmanager.com https://www.google-analytics.com
        https://ssl.google-analytics.com https://js.stripe.com https://www.paypal.com https://pay.google.com;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com;
        font-src 'self' https://fonts.gstatic.com https://static.fundraiseup.com;
        connect-src 'self' https://fndrsp.net https://forms.hsforms.com https://api.fundraiseup.com https://js.stripe.com
        https://www.google-analytics.com https://fndrsp-checkout.net https://sentry.fundraiseup.com https://www.paypal.com
        https://hubspot-forms-static-embed.s3.amazonaws.com https://google.com https://pay.google.com ws:;
        frame-src 'self' https://js.stripe.com https://forms.hsforms.com https://www.paypal.com https://pay.google.com/ *.youtube.com;
    ">

    
    <title>Private Servers | shopnotoolbox</title>
    <meta name="description" content="shopnotoolbox is an intuitive, powerful, and reliable software used to collect, analyze, and manage data for surveys, monitoring, evaluation, and research."/>
    <base href="https://shopnoltd.kesug.com"/>
    <link rel="home" href="https://shopnoltd.kesug.com"/>

    
    <meta name="robots" content="index,follow,noodp"/>
    <meta name="googlebot" content="index,follow"/>

    
    <meta property="og:locale" content="en_US"/>
    <meta property="og:site_name" content="shopnotoolbox"/>
    <meta property="og:title" content="Private Servers"/>
    <meta property="og:description" content="shopnotoolbox is an intuitive, powerful, and reliable software used to collect, analyze, and manage data for surveys, monitoring, evaluation, and research."/>
    <meta property="og:url" content="https://shopnoltd.kesug.com/services/dashboard-development/"/>
    <meta name="twitter:site" content="@shopnotoolbox"/>
    <meta name="twitter:description" content="shopnotoolbox is an intuitive, powerful, and reliable software used to collect, analyze, and manage data for surveys, monitoring, evaluation, and research."/>

    
    
    
        <meta property="og:type" content="website"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content="shopnotoolbox"/>
        <meta name="twitter:image" content="https://shopnoltd.kesug.com/assets/images/common/shopnotoolbox_opengraph_image.png"/>
        <meta property="og:image" content="https://shopnoltd.kesug.com/assets/images/common/shopnotoolbox_opengraph_image.png"/>
    

    
    <link href="https://shopnoltd.kesug.com/assets/styles/kobo.css?2024-12-05_18-51-37" rel="stylesheet" media="all"/>
    <link rel="icon" href="https://shopnoltd.kesug.com/favicon.png?2024-12-05_18-51-37"/>



    
    <script>
    (function(w,d,s,n,a){if(!w[n]){var l='call,catch,on,once,set,then,track'
    .split(','),i,o=function(n){return'function'==typeof n?o.l.push([arguments])&&o
    :function(){return o.l.push([n,arguments])&&o}},t=d.getElementsByTagName(s)[0],
    j=d.createElement(s);j.async=!0;j.src='https://cdn.fundraiseup.com/widget/'+a;
    t.parentNode.insertBefore(j,t);o.s=Date.now();o.v=4;o.h=w.location.href;o.l=[];
    for(i=0;i<7;i++)o[l[i]]=o(l[i]);w[n]=o}
    })(window,document,'script','FundraiseUp','ASAUFVGL');</script>
</head>


<body class="root">


<header class="root__header">
  <div class="root__row">
    <div class="root__row-content root__row-content--wide">
      <nav class="header-nav">
  <a class="header-nav__logo" href="/">
    <img src="/assets/images/common/shopnotoolbox_logo_default_for-light-bg.svg"/>
  </a>
  <a class="header-nav__mobile-logo" href="/">
    <img src="/assets/images/site/shopnotoolbox-logo-mobile.svg"/>
  </a>

  
  <input type="checkbox" id="mobile-nav-trigger">
  <label class="header-nav__mobile-nav-trigger" for="mobile-nav-trigger">
    <i></i><i></i><i></i><i></i>
  </label>

  <ul class="header-nav__menu">
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/about-us"
          >About us</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/features"
          >Features</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item header-nav__menu-item--active"
          href="/services"
          >Services</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/pricing"
          >Pricing</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/blog"
          >Blog</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/help"
          >Help</a
        >
      </li>
    
  </ul>

  <ul class="header-nav__buttons">
    
    
    <li>
<a class="button button--size-m button--type-frame button--color-blue" href="/sign-up">Sign up</a>
</li>
    <li>
<a class="button button--size-m button--type-full button--color-blue" href="/donate">Donate</a>
</li>
  </ul>
</nav>

    </div>
  </div>
</header>


<div class="modal" data-modal>
  <div class="modal__box">
    <button class="modal__closer" data-modal-closer>&times;</button>
    <div class="modal__content" data-modal-content>Hello, World!</div>
  </div>
</div>


<main class="root__main" role="main">

<div class="root__row">
  <div class="root__row-content">
    <section class="services-subpage">
      <div class="services-subpage__nav-container">
        <nav class="services-subpage__nav">
          <ul>
            
            <li>
              <a
                class="services-subpage__nav-item"
                href="/services/dashboard-development/#introduction"
              >
                Introduction
              </a>
            </li>
            
            <li>
              <a
                class="services-subpage__nav-item"
                href="/services/dashboard-development/#benefits"
              >
                Custom dashboard benefits
              </a>
            </li>
            
            <li>
              <a
                class="services-subpage__nav-item"
                href="/services/dashboard-development/#set-up-options"
              >
                Set up options and services
              </a>
            </li>
            
            <li>
              <a
                class="services-subpage__nav-item"
                href="/services/dashboard-development/#get-started"
              >
                Get started
              </a>
            </li>
            
          </ul>
        </nav>
      </div>
      <article class="services-subpage__article">
        <h2 id="introduction" class="anchor-link--scroll-offset">
          Dashboard development
        </h2>
        <div class="services-subpage__intro">
          <p>
            Enhance your data visualization with a tailor-made dashboard for
            your project. For improved data insights and project management, we
            offer custom dashboard development with real-time data updates,
            interactive tailor-made visualizations, advanced analytics, and
            automated reporting.
          </p>
          <p>
            Have our team of data visualization experts design and develop a
            custom dashboard for your organization—stylized with your branding
            and built specifically for your needs. Your custom dashboard will be
            fully integrated with all your shopnotoolbox project data and external
            data sources, providing your team with a centralized database of
            unified datasets, tables, and visualizations.
          </p>
        </div>
        <div
          id="benefits"
          class="services-subpage__subhead anchor-link--scroll-offset"
        >
          Benefits of a custom dashboard
        </div>
          <div class="service-details">
  <div class="service-details__img-container">
    <img src="/assets/images/services/dashboard-development/data-visualization.png">
  </div>
  <div class="service-details__text-block">
    <div>
      <div class="service-details__subhead">
        Enhanced data visualization and improved insights
      </div>
      <div>
      <ul class="service-details__bullet-list">
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--teal">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Intuitive and interactive visualizations, tailor-made for your project
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--teal">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Advanced analytics and synchronized datasets for more informed decision-making
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--teal">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Geographic data mapping for location-specific insights
          </li>
        
      </ul>
      </div>
    </div>
  </div>
</div>
          <div class="service-details service-details--reverse">
  <div class="service-details__img-container">
    <img src="/assets/images/services/dashboard-development/custom-built.png">
  </div>
  <div class="service-details__text-block">
    <div>
      <div class="service-details__subhead">
        Custom built and fully scalable
      </div>
      <div>
      <ul class="service-details__bullet-list">
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--storm">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Customized project targets for improved monitoring, analysis, and reporting
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--storm">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Custom branded and stylized specifically for your organization
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--storm">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Adaptable and scalable to meet evolving project needs
          </li>
        
      </ul>
      </div>
    </div>
  </div>
</div>
          <div class="service-details">
  <div class="service-details__img-container">
    <img src="/assets/images/services/dashboard-development/project-management.png">
  </div>
  <div class="service-details__text-block">
    <div>
      <div class="service-details__subhead">
        Advanced project management and increased efficiency
      </div>
      <div>
      <ul class="service-details__bullet-list">
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--dark-teal">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Real-time data updates and monitoring to track progress and troubleshoot
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--dark-teal">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Enhanced security and user management with advanced access permissions
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--dark-teal">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Automated data analysis for greater efficiency and accuracy
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--dark-teal">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Improved access to real-time data with a centralized database and integrated datasets
          </li>
        
      </ul>
      </div>
    </div>
  </div>
</div>
          <div class="service-details service-details--reverse">
  <div class="service-details__img-container">
    <img src="/assets/images/services/dashboard-development/reporting.png">
  </div>
  <div class="service-details__text-block">
    <div>
      <div class="service-details__subhead">
        More effective reporting for communicating insights
      </div>
      <div>
      <ul class="service-details__bullet-list">
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--mid-blue">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Tailored project targets and graphics to better identify and communicate data insights
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--mid-blue">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Automated reporting and summaries for enhanced data collaboration across teams
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--mid-blue">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Dynamic visuals for sharing project data with stakeholders and donors
          </li>
        
      </ul>
      </div>
    </div>
  </div>
</div>
        
        <div
          id="set-up-options"
          class="services-subpage__subhead services-subpage__subhead--text-sections anchor-link--scroll-offset"
        >
          Set up options
        </div>
        <div class="services-subpage__text-section">
          <p>
            Our team will provide full set up services, including synchronizing
            your project data from shopnotoolbox and integrating any additional
            external data sources. Custom service agreements are available for
            ongoing maintenance and scaling for long-term projects. As part of
            our services, we also offer dashboard training, direct user support,
            and documentation.
          </p>
          <p>
            Dashboards can be developed in a range of platforms, including
            Power BI, Tableau, R Shiny, and Python Dash.
          </p>
          <p>
            <a href="/contact">Get in touch</a> to learn more about dashboard
            set up options and services.
          </p>
        </div>
        <div
          id="get-started"
          class="services-subpage__subhead services-subpage__subhead--text-sections anchor-link--scroll-offset"
        >
          Get started
        </div>
        <div class="services-subpage__text-section">
          <p>
            Designed and developed specifically for your organization, a custom
            dashboard offers enhanced data visualization for improved analysis,
            reporting, and project management. With a tailor-made dashboard, you
            can visualize, identify, and communicate data insights and project
            outcomes more effectively, for even greater impact.
          </p>
          <p>
            Our experts have developed interactive dashboards for organizations
            around the world operating in humanitarian response, public health,
            development programs, research initiatives, academic institutions,
            and more.
          </p>
          <p>
            Our team is available to answer any questions you might have.
            <a href="/contact">Get in touch</a> to discuss a custom dashboard
            for your organization.
          </p>
        </div>
      </article>
    </section>
  </div>
</div>

  <div class="root__row">
    <div class="root__row-content">
      <section class="service-quick-links">
        <div class="service-quick-links__header">
          More services and support for your team
        </div>
        <div class="service-quick-links__container">
          
            
            
            
            
            
      
            
            <a class="service-quick-links__box arrow-link__trigger" 
            style="background-color: #E5EEF5"
            href="/services/private-servers"
            >
              <div>
                <div class="service-quick-links__link-title">
                  Private servers
                </div>
                <div class="service-quick-links__link-description">
                  Customizable and scalable with unlimited data collection and enhanced security, our most comprehensive data solution.
                </div>
              </div>
                


  <div class="arrow-link arrow-link--color-dark-blue arrow-link--size-m arrow-link--align-left">
    Learn more
    <span class="arrow-link__icon">
      <svg>
        <use xlink:href="/assets/images/site/sprite.svg#arrow-right"/>
      </svg>
    </span>
  </div>


            </a>
            
          
            
            
            
            
            
      
            
            <a class="service-quick-links__box arrow-link__trigger" 
            style="background-color: #E8F4FF"
            href="/services/training/"
            >
              <div>
                <div class="service-quick-links__link-title">
                  Training solutions
                </div>
                <div class="service-quick-links__link-description">
                  Strengthen your team's data collection with training designed and delivered by our experts.
                </div>
              </div>
                


  <div class="arrow-link arrow-link--color-dark-blue arrow-link--size-m arrow-link--align-left">
    Learn more
    <span class="arrow-link__icon">
      <svg>
        <use xlink:href="/assets/images/site/sprite.svg#arrow-right"/>
      </svg>
    </span>
  </div>


            </a>
            
          
            
            
            
            
            
      
            
            <a class="service-quick-links__box arrow-link__trigger" 
            style="background-color: #F1F4FC"
            href="/services/project-rollout-support"
            >
              <div>
                <div class="service-quick-links__link-title">
                  Project support
                </div>
                <div class="service-quick-links__link-description">
                  Direct support for your team, from survey design to troubleshooting.
                </div>
              </div>
                


  <div class="arrow-link arrow-link--color-dark-blue arrow-link--size-m arrow-link--align-left">
    Learn more
    <span class="arrow-link__icon">
      <svg>
        <use xlink:href="/assets/images/site/sprite.svg#arrow-right"/>
      </svg>
    </span>
  </div>


            </a>
            
          
            
            
            
            
            
      
            
          
        </div>
      </section>
    </div>
  </div>
</main>

<footer class="root__footer">
  <div class="root__row">
    <div class="root__row-content root__row-content--wide">
      <div class="footer-nav__container">
  <nav class="footer-nav">
    <div class="footer-nav__block footer-nav__menu">
      <ul class="footer-nav-menu__row">
        <label>Organization</label>

        
          <li>
            <a href="/about-us/">About us</a>
          </li>
        
          <li>
            <a href="/about-us/meet-the-team/">Team</a>
          </li>
        
          <li>
            <a href="/join-our-team">Jobs</a>
          </li>
        
          <li>
            <a href="/about-us/financials/">Financials</a>
          </li>
        
          <li>
            <a href="/contact/">Contact</a>
          </li>
        
      </ul>

      <ul class="footer-nav-menu__row">
        <label>Software</label>

        
          <li>
            <a href="https://academy.shopnotoolbox.org/collections">Online learning</a>
          </li>
        
          <li>
            <a href="/about-us/software">About shopnotoolbox</a>
          </li>
        
          <li>
            <a href="/features">Features</a>
          </li>
        
          <li>
            <a href="/pricing">Pricing</a>
          </li>
        
          <li>
            <a href="/services/private-servers">Private servers</a>
          </li>
        
          <li>
            <a href="/services">Services</a>
          </li>
        
      </ul>

      <ul class="footer-nav-menu__row">
        <label>Community</label>

        
          <li>
            <a href="https://community.shopnotoolbox.org/">Forum</a>
          </li>
        
          <li>
            <a href="https://support.shopnotoolbox.org/">Documentation</a>
          </li>
        
          <li>
            <a href="/donate">Donate</a>
          </li>
        
      </ul>
    </div>

    <div class="footer-nav__block">
      <section class="footer-nav__newsletter">
        <h3>Stay up<br/>to date.</h3>

        <p>Subscribe to our shopnotoolbox Updates newsletter to be the first to learn about new features, resources, and user impact stories from around the world.</p>

        <section class="newsletter-form-wrapper">
  <script charset="utf-8" type="text/javascript" src="https://js.hsforms.net/forms/shell.js"></script>
  <script>
    hbspt.forms.create({
      region: "na1",
      portalId: "21396257",
      formId: "16b9634b-3ea9-4539-9ec2-b83d4125e24c"
  });
  </script>
</section>
      </section>

      <section class="footer-nav__social">
        <nav>
          
            <li>
              <a href="https://www.facebook.com/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/facebook.svg"></load-file>
              </a>
            </li>
          
            <li>
              <a href="https://twitter.com/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/twitter.svg"></load-file>
              </a>
            </li>
          
            <li>
              <a href="https://www.linkedin.com/company/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/linkedin.svg"></load-file>
              </a>
            </li>
          
            <li>
              <a href="https://github.com/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/github.svg"></load-file>
              </a>
            </li>
          
        </nav>

        <div>
          <a class="footer-nav__logo" href="/">
            <img src="/assets/images/site/shopnotoolbox-logo-borderless.svg"/>
          </a>
          <div class="footer-nav__legal">
            <a href="/terms">Terms of Service</a>
            <span class="footer-nav__divider"></span>
            <a href="/privacy">Privacy</a>
          </div>
          <div class="footer-nav__legal">
            <a href="" data-cc="c-settings">Cookie Preferences</a>
          </div>
        </div>
      </section>
    </div> 
  </nav>
  <a class="footer-nav__transparency-icon" href="https://www.guidestar.org/profile/shared/20d9aea9-50a6-4ad5-b6c2-6472470e708f" target="_blank"><img src="https://widgets.guidestar.org/TransparencySeal/9868102" /></a>
  <div class="footer-nav__copyright">Website content is licensed under a <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank">CC-BY-NC license</a>, unless noted otherwise.</div>
</div>
    </div>
  </div>
</footer>


    <script async src="https://shopnoltd.kesug.com/assets/scripts/kobo.js?2024-12-05_18-51-37"></script>
    
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-26003863-1"></script>
    <script type="text/plain" data-cookiecategory="analytics">
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-26003863-1');
    </script>
</body>
</html>


    `);  // <-- Make sure this closing backtick is also present here
});


// Dynamic route for /services/project-rollout-support
app.get('/services/project-rollout-support', (req, res) => {
    res.send(`



<!DOCTYPE html>
<html lang="en-US">

<head>
    
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <meta http-equiv="Content-Security-Policy" content="
        default-src 'self';
        img-src 'self' https://static.fundraiseup.com *.hsforms.com https://www.google-analytics.com https://ucarecdn.com
        *.paypal.com data: https://www.paypalobjects.com https://www.gstatic.com *.guidestar.org;
        script-src 'self' 'unsafe-inline' http://js.hsforms.net *.fundraiseup.com *.googletagmanager.com https://www.google-analytics.com
        https://ssl.google-analytics.com https://js.stripe.com https://www.paypal.com https://pay.google.com;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com;
        font-src 'self' https://fonts.gstatic.com https://static.fundraiseup.com;
        connect-src 'self' https://fndrsp.net https://forms.hsforms.com https://api.fundraiseup.com https://js.stripe.com
        https://www.google-analytics.com https://fndrsp-checkout.net https://sentry.fundraiseup.com https://www.paypal.com
        https://hubspot-forms-static-embed.s3.amazonaws.com https://google.com https://pay.google.com ws:;
        frame-src 'self' https://js.stripe.com https://forms.hsforms.com https://www.paypal.com https://pay.google.com/ *.youtube.com;
    ">

    
    <title>Project support | shopnotoolbox</title>
    <meta name="description" content="shopnotoolbox is an intuitive, powerful, and reliable software used to collect, analyze, and manage data for surveys, monitoring, evaluation, and research."/>
    <base href="https://shopnoltd.kesug.com"/>
    <link rel="home" href="https://shopnoltd.kesug.com"/>

    
    <meta name="robots" content="index,follow,noodp"/>
    <meta name="googlebot" content="index,follow"/>

    
    <meta property="og:locale" content="en_US"/>
    <meta property="og:site_name" content="shopnotoolbox"/>
    <meta property="og:title" content="Project support"/>
    <meta property="og:description" content="shopnotoolbox is an intuitive, powerful, and reliable software used to collect, analyze, and manage data for surveys, monitoring, evaluation, and research."/>
    <meta property="og:url" content="https://shopnoltd.kesug.com/services/project-rollout-support/"/>
    <meta name="twitter:site" content="@shopnotoolbox"/>
    <meta name="twitter:description" content="shopnotoolbox is an intuitive, powerful, and reliable software used to collect, analyze, and manage data for surveys, monitoring, evaluation, and research."/>

    
    
    
        <meta property="og:type" content="website"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content="shopnotoolbox"/>
        <meta name="twitter:image" content="https://shopnoltd.kesug.com/assets/images/common/shopnotoolbox_opengraph_image.png"/>
        <meta property="og:image" content="https://shopnoltd.kesug.com/assets/images/common/shopnotoolbox_opengraph_image.png"/>
    

    
    <link href="https://shopnoltd.kesug.com/assets/styles/kobo.css?2024-12-05_18-51-37" rel="stylesheet" media="all"/>
    <link rel="icon" href="https://shopnoltd.kesug.com/favicon.png?2024-12-05_18-51-37"/>



    
    <script>
    (function(w,d,s,n,a){if(!w[n]){var l='call,catch,on,once,set,then,track'
    .split(','),i,o=function(n){return'function'==typeof n?o.l.push([arguments])&&o
    :function(){return o.l.push([n,arguments])&&o}},t=d.getElementsByTagName(s)[0],
    j=d.createElement(s);j.async=!0;j.src='https://cdn.fundraiseup.com/widget/'+a;
    t.parentNode.insertBefore(j,t);o.s=Date.now();o.v=4;o.h=w.location.href;o.l=[];
    for(i=0;i<7;i++)o[l[i]]=o(l[i]);w[n]=o}
    })(window,document,'script','FundraiseUp','ASAUFVGL');</script>
</head>


<body class="root">


<header class="root__header">
  <div class="root__row">
    <div class="root__row-content root__row-content--wide">
      <nav class="header-nav">
  <a class="header-nav__logo" href="/">
    <img src="/assets/images/common/shopnotoolbox_logo_default_for-light-bg.svg"/>
  </a>
  <a class="header-nav__mobile-logo" href="/">
    <img src="/assets/images/site/shopnotoolbox-logo-mobile.svg"/>
  </a>

  
  <input type="checkbox" id="mobile-nav-trigger">
  <label class="header-nav__mobile-nav-trigger" for="mobile-nav-trigger">
    <i></i><i></i><i></i><i></i>
  </label>

  <ul class="header-nav__menu">
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/about-us"
          >About us</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/features"
          >Features</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item header-nav__menu-item--active"
          href="/services"
          >Services</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/pricing"
          >Pricing</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/blog"
          >Blog</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/help"
          >Help</a
        >
      </li>
    
  </ul>

  <ul class="header-nav__buttons">
    
    
    <li>
<a class="button button--size-m button--type-frame button--color-blue" href="/sign-up">Sign up</a>
</li>
    <li>
<a class="button button--size-m button--type-full button--color-blue" href="/donate">Donate</a>
</li>
  </ul>
</nav>

    </div>
  </div>
</header>


<div class="modal" data-modal>
  <div class="modal__box">
    <button class="modal__closer" data-modal-closer>&times;</button>
    <div class="modal__content" data-modal-content>Hello, World!</div>
  </div>
</div>


<main class="root__main" role="main">

<div class="root__row">
  <div class="root__row-content">
    <section class="services-subpage">
      <div class="services-subpage__nav-container">
        <nav class="services-subpage__nav">
          <ul>
            
            <li>
              <a
                class="services-subpage__nav-item"
                href="/services/project-rollout-support/#introduction"
              >
                Introduction
              </a>
            </li>
            
            <li>
              <a
                class="services-subpage__nav-item"
                href="/services/project-rollout-support/#options"
              >
                Project support options
              </a>
            </li>
            
            <li>
              <a
                class="services-subpage__nav-item"
                href="/services/project-rollout-support/#services"
              >
                Custom support services
              </a>
            </li>
            
            <li>
              <a
                class="services-subpage__nav-item"
                href="/services/project-rollout-support/#get-started"
              >
                Get started
              </a>
            </li>
            
          </ul>
        </nav>
      </div>
      <article class="services-subpage__article">
        <h2 id="introduction" class="anchor-link--scroll-offset">
          Project support
        </h2>
        <div class="services-subpage__intro">
          <p>
            From complex survey design to data management, our staff experts can provide comprehensive project support for your team. Our custom support services can be tailored to your specific needs throughout the project cycle, including form development, project set up, and deployment with shopnotoolbox and KoboCollect.
          </p>
          <p>
            With direct support from our team, you can optimize data collection and streamline project implementation for an even greater impact. We offer customized and dedicated support for improved form design, user configurations and account creation, advanced project set up, and technical support.
          </p>
        </div>
        <div
          id="options"
          class="services-subpage__subhead anchor-link--scroll-offset"
        >
          Project support options
        </div>
          <div class="service-details">
  <div class="service-details__img-container">
    <img src="/assets/images/services/project-rollout-support/form-design.png">
  </div>
  <div class="service-details__text-block">
    <div>
      <div class="service-details__subhead">
        Form design
      </div>
      <div>
      <ul class="service-details__bullet-list">
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--dark-teal">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Direct support for advanced form design, tailored to your project objectives
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--dark-teal">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Custom development of complex forms in XLSForm standard
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--dark-teal">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Form creation in Excel and Google Sheets
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--dark-teal">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Forms with dynamic data attachments, multiple languages, GPS, and media collection
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--dark-teal">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Testing, review, and form improvements to ensure high quality data
          </li>
        
      </ul>
      </div>
    </div>
  </div>
</div>
          <div class="service-details service-details--reverse">
  <div class="service-details__img-container">
    <img src="/assets/images/services/project-rollout-support/account-configurations.png">
  </div>
  <div class="service-details__text-block">
    <div>
      <div class="service-details__subhead">
        User account configurations
      </div>
      <div>
      <ul class="service-details__bullet-list">
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--storm">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Support for bulk user account creation
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--storm">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Advanced support for KoboCollect set up and synchronization
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--storm">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Expert assistance for administrator and project management accounts
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--storm">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Support for project settings, sharing, and permissions
          </li>
        
      </ul>
      </div>
    </div>
  </div>
</div>
          <div class="service-details">
  <div class="service-details__img-container">
    <img src="/assets/images/services/project-rollout-support/project-set-up.png">
  </div>
  <div class="service-details__text-block">
    <div>
      <div class="service-details__subhead">
        Project set up
      </div>
      <div>
      <ul class="service-details__bullet-list">
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--teal">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Enhanced support for data collection planning and monitoring
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--teal">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Review and recommendations for advanced project configurations
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--teal">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Expert advice to optimize data management and reports
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--teal">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Comprehensive form deployment support for shopnotoolbox and KoboCollect
          </li>
        
      </ul>
      </div>
    </div>
  </div>
</div>
          <div class="service-details service-details--reverse">
  <div class="service-details__img-container">
    <img src="/assets/images/services/project-rollout-support/technical-support.png">
  </div>
  <div class="service-details__text-block">
    <div>
      <div class="service-details__subhead">
        Technical support
      </div>
      <div>
      <ul class="service-details__bullet-list">
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--mid-blue">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Troubleshooting for form set up and deployment
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--mid-blue">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Direct technical assistance for project and account configurations
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--mid-blue">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Support for integration set up
          </li>
        
          <li>
            <div class="service-details__bullet-container
            service-details__bullet-container--mid-blue">
            <load-file
            replaceWith
            src="/assets/images/site/list-checkmark.svg"></load-file>
            </div>
            Technical consultations and hands-on user support
          </li>
        
      </ul>
      </div>
    </div>
  </div>
</div>
        
        <div
          id="services"
          class="services-subpage__subhead services-subpage__subhead--text-sections anchor-link--scroll-offset"
        >
          Custom support services
        </div>
        <div class="services-subpage__text-section">
          <p>
            Custom project support packages can be tailored specifically
            to the needs of your organization. We also offer training sessions
            and support for long-term projects.
          </p>
          <p>
            To learn more about customized project support services,
            <a href="/contact">get in touch</a>.
          </p>
        </div>
        <div
          id="get-started"
          class="services-subpage__subhead services-subpage__subhead--text-sections anchor-link--scroll-offset"
        >
          Get started
        </div>
        <div class="services-subpage__text-section">
          <p>
            Improve the quality of your data and increase your impact on the
            ground with direct project support from our highly qualified data
            collection professionals. Ensure your project is designed, implemented, and managed to maximize data quality, increase project efficiency,
            and generate informed insights.
          </p>
          <p>
            Our staff experts have provided direct project support to
            teams and organizations worldwide. Projects in a variety of sectors
            including policy research, health services, humanitarian response,
            and development have benefited from the support of our data
            collection expertise.
          </p>
          <p>
            Our team is available to answer your questions and help plan your
            project support package. <a href="/contact">Get in touch</a> to
            learn more about project support options for your team.
          </p>
        </div>
      </article>
    </section>
  </div>
</div>

  <div class="root__row">
    <div class="root__row-content">
      <section class="service-quick-links">
        <div class="service-quick-links__header">
          More services and support for your team
        </div>
        <div class="service-quick-links__container">
          
            
            
            
            
            
      
            
            <a class="service-quick-links__box arrow-link__trigger" 
            style="background-color: #E5EEF5"
            href="/services/private-servers"
            >
              <div>
                <div class="service-quick-links__link-title">
                  Private servers
                </div>
                <div class="service-quick-links__link-description">
                  Customizable and scalable with unlimited data collection and enhanced security, our most comprehensive data solution.
                </div>
              </div>
                


  <div class="arrow-link arrow-link--color-dark-blue arrow-link--size-m arrow-link--align-left">
    Learn more
    <span class="arrow-link__icon">
      <svg>
        <use xlink:href="/assets/images/site/sprite.svg#arrow-right"/>
      </svg>
    </span>
  </div>


            </a>
            
          
            
            
            
            
            
      
            
            <a class="service-quick-links__box arrow-link__trigger" 
            style="background-color: #E8F4FF"
            href="/services/training/"
            >
              <div>
                <div class="service-quick-links__link-title">
                  Training solutions
                </div>
                <div class="service-quick-links__link-description">
                  Strengthen your team's data collection with training designed and delivered by our experts.
                </div>
              </div>
                


  <div class="arrow-link arrow-link--color-dark-blue arrow-link--size-m arrow-link--align-left">
    Learn more
    <span class="arrow-link__icon">
      <svg>
        <use xlink:href="/assets/images/site/sprite.svg#arrow-right"/>
      </svg>
    </span>
  </div>


            </a>
            
          
            
            
            
            
            
      
            
          
            
            
            
            
            
      
            
            <a class="service-quick-links__box arrow-link__trigger" 
            style="background-color: #FFEDDB"
            href="/services/dashboard-development/"
            >
              <div>
                <div class="service-quick-links__link-title">
                  Dashboard development
                </div>
                <div class="service-quick-links__link-description">
                  Enhanced data visualization for improved analysis, insights, and project management.
                </div>
              </div>
                


  <div class="arrow-link arrow-link--color-dark-blue arrow-link--size-m arrow-link--align-left">
    Learn more
    <span class="arrow-link__icon">
      <svg>
        <use xlink:href="/assets/images/site/sprite.svg#arrow-right"/>
      </svg>
    </span>
  </div>


            </a>
            
          
        </div>
      </section>
    </div>
  </div>
</main>

<footer class="root__footer">
  <div class="root__row">
    <div class="root__row-content root__row-content--wide">
      <div class="footer-nav__container">
  <nav class="footer-nav">
    <div class="footer-nav__block footer-nav__menu">
      <ul class="footer-nav-menu__row">
        <label>Organization</label>

        
          <li>
            <a href="/about-us/">About us</a>
          </li>
        
          <li>
            <a href="/about-us/meet-the-team/">Team</a>
          </li>
        
          <li>
            <a href="/join-our-team">Jobs</a>
          </li>
        
          <li>
            <a href="/about-us/financials/">Financials</a>
          </li>
        
          <li>
            <a href="/contact/">Contact</a>
          </li>
        
      </ul>

      <ul class="footer-nav-menu__row">
        <label>Software</label>

        
          <li>
            <a href="https://academy.shopnotoolbox.org/collections">Online learning</a>
          </li>
        
          <li>
            <a href="/about-us/software">About shopnotoolbox</a>
          </li>
        
          <li>
            <a href="/features">Features</a>
          </li>
        
          <li>
            <a href="/pricing">Pricing</a>
          </li>
        
          <li>
            <a href="/services/private-servers">Private servers</a>
          </li>
        
          <li>
            <a href="/services">Services</a>
          </li>
        
      </ul>

      <ul class="footer-nav-menu__row">
        <label>Community</label>

        
          <li>
            <a href="https://community.shopnotoolbox.org/">Forum</a>
          </li>
        
          <li>
            <a href="https://support.shopnotoolbox.org/">Documentation</a>
          </li>
        
          <li>
            <a href="/donate">Donate</a>
          </li>
        
      </ul>
    </div>

    <div class="footer-nav__block">
      <section class="footer-nav__newsletter">
        <h3>Stay up<br/>to date.</h3>

        <p>Subscribe to our shopnotoolbox Updates newsletter to be the first to learn about new features, resources, and user impact stories from around the world.</p>

        <section class="newsletter-form-wrapper">
  <script charset="utf-8" type="text/javascript" src="https://js.hsforms.net/forms/shell.js"></script>
  <script>
    hbspt.forms.create({
      region: "na1",
      portalId: "21396257",
      formId: "16b9634b-3ea9-4539-9ec2-b83d4125e24c"
  });
  </script>
</section>
      </section>

      <section class="footer-nav__social">
        <nav>
          
            <li>
              <a href="https://www.facebook.com/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/facebook.svg"></load-file>
              </a>
            </li>
          
            <li>
              <a href="https://twitter.com/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/twitter.svg"></load-file>
              </a>
            </li>
          
            <li>
              <a href="https://www.linkedin.com/company/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/linkedin.svg"></load-file>
              </a>
            </li>
          
            <li>
              <a href="https://github.com/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/github.svg"></load-file>
              </a>
            </li>
          
        </nav>

        <div>
          <a class="footer-nav__logo" href="/">
            <img src="/assets/images/site/shopnotoolbox-logo-borderless.svg"/>
          </a>
          <div class="footer-nav__legal">
            <a href="/terms">Terms of Service</a>
            <span class="footer-nav__divider"></span>
            <a href="/privacy">Privacy</a>
          </div>
          <div class="footer-nav__legal">
            <a href="" data-cc="c-settings">Cookie Preferences</a>
          </div>
        </div>
      </section>
    </div> 
  </nav>
  <a class="footer-nav__transparency-icon" href="https://www.guidestar.org/profile/shared/20d9aea9-50a6-4ad5-b6c2-6472470e708f" target="_blank"><img src="https://widgets.guidestar.org/TransparencySeal/9868102" /></a>
  <div class="footer-nav__copyright">Website content is licensed under a <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank">CC-BY-NC license</a>, unless noted otherwise.</div>
</div>
    </div>
  </div>
</footer>


    <script async src="https://shopnoltd.kesug.com/assets/scripts/kobo.js?2024-12-05_18-51-37"></script>
    
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-26003863-1"></script>
    <script type="text/plain" data-cookiecategory="analytics">
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-26003863-1');
    </script>
</body>
</html>


    `);  // <-- Make sure this closing backtick is also present here
});


// Dynamic route for /pricing
app.get('/pricing', (req, res) => {
    res.send(`



<!DOCTYPE html>
<html lang="en-US">

<head>
    
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <meta http-equiv="Content-Security-Policy" content="
        default-src 'self';
        img-src 'self' https://static.fundraiseup.com *.hsforms.com https://www.google-analytics.com https://ucarecdn.com
        *.paypal.com data: https://www.paypalobjects.com https://www.gstatic.com *.guidestar.org;
        script-src 'self' 'unsafe-inline' http://js.hsforms.net *.fundraiseup.com *.googletagmanager.com https://www.google-analytics.com
        https://ssl.google-analytics.com https://js.stripe.com https://www.paypal.com https://pay.google.com;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com;
        font-src 'self' https://fonts.gstatic.com https://static.fundraiseup.com;
        connect-src 'self' https://fndrsp.net https://forms.hsforms.com https://api.fundraiseup.com https://js.stripe.com
        https://www.google-analytics.com https://fndrsp-checkout.net https://sentry.fundraiseup.com https://www.paypal.com
        https://hubspot-forms-static-embed.s3.amazonaws.com https://google.com https://pay.google.com ws:;
        frame-src 'self' https://js.stripe.com https://forms.hsforms.com https://www.paypal.com https://pay.google.com/ *.youtube.com;
    ">

    
    <title>Pricing | shopnotoolbox</title>
    <meta name="description" content="shopnotoolbox is an intuitive, powerful, and reliable software used to collect, analyze, and manage data for surveys, monitoring, evaluation, and research."/>
    <base href="https://shopnoltd.kesug.com"/>
    <link rel="home" href="https://shopnoltd.kesug.com"/>

    
    <meta name="robots" content="index,follow,noodp"/>
    <meta name="googlebot" content="index,follow"/>

    
    <meta property="og:locale" content="en_US"/>
    <meta property="og:site_name" content="shopnotoolbox"/>
    <meta property="og:title" content="Pricing"/>
    <meta property="og:description" content="shopnotoolbox is an intuitive, powerful, and reliable software used to collect, analyze, and manage data for surveys, monitoring, evaluation, and research."/>
    <meta property="og:url" content="https://shopnoltd.kesug.com/pricing/"/>
    <meta name="twitter:site" content="@shopnotoolbox"/>
    <meta name="twitter:description" content="shopnotoolbox is an intuitive, powerful, and reliable software used to collect, analyze, and manage data for surveys, monitoring, evaluation, and research."/>

    
    
    
        <meta property="og:type" content="website"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content="shopnotoolbox"/>
        <meta name="twitter:image" content="https://shopnoltd.kesug.com/assets/images/common/shopnotoolbox_opengraph_image.png"/>
        <meta property="og:image" content="https://shopnoltd.kesug.com/assets/images/common/shopnotoolbox_opengraph_image.png"/>
    

    
    <link href="https://shopnoltd.kesug.com/assets/styles/kobo.css?2024-12-05_18-51-37" rel="stylesheet" media="all"/>
    <link rel="icon" href="https://shopnoltd.kesug.com/favicon.png?2024-12-05_18-51-37"/>



    
    <script>
    (function(w,d,s,n,a){if(!w[n]){var l='call,catch,on,once,set,then,track'
    .split(','),i,o=function(n){return'function'==typeof n?o.l.push([arguments])&&o
    :function(){return o.l.push([n,arguments])&&o}},t=d.getElementsByTagName(s)[0],
    j=d.createElement(s);j.async=!0;j.src='https://cdn.fundraiseup.com/widget/'+a;
    t.parentNode.insertBefore(j,t);o.s=Date.now();o.v=4;o.h=w.location.href;o.l=[];
    for(i=0;i<7;i++)o[l[i]]=o(l[i]);w[n]=o}
    })(window,document,'script','FundraiseUp','ASAUFVGL');</script>
</head>


<body class="root">


<header class="root__header">
  <div class="root__row">
    <div class="root__row-content root__row-content--wide">
      <nav class="header-nav">
  <a class="header-nav__logo" href="/">
    <img src="/assets/images/common/shopnotoolbox_logo_default_for-light-bg.svg"/>
  </a>
  <a class="header-nav__mobile-logo" href="/">
    <img src="/assets/images/site/shopnotoolbox-logo-mobile.svg"/>
  </a>

  
  <input type="checkbox" id="mobile-nav-trigger">
  <label class="header-nav__mobile-nav-trigger" for="mobile-nav-trigger">
    <i></i><i></i><i></i><i></i>
  </label>

  <ul class="header-nav__menu">
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/about-us"
          >About us</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/features"
          >Features</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/services"
          >Services</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item header-nav__menu-item--active"
          href="/pricing"
          >Pricing</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/blog"
          >Blog</a
        >
      </li>
    
      
      
      
      
      
      <li>
        <a
          class="header-nav__menu-item "
          href="/help"
          >Help</a
        >
      </li>
    
  </ul>

  <ul class="header-nav__buttons">
    
    
    <li>
<a class="button button--size-m button--type-frame button--color-blue" href="/sign-up">Sign up</a>
</li>
    <li>
<a class="button button--size-m button--type-full button--color-blue" href="/donate">Donate</a>
</li>
  </ul>
</nav>

    </div>
  </div>
</header>


<div class="modal" data-modal>
  <div class="modal__box">
    <button class="modal__closer" data-modal-closer>&times;</button>
    <div class="modal__content" data-modal-content>Hello, World!</div>
  </div>
</div>


<main class="root__main" role="main"><script>
  const toggleBillingCycle = (event) => {
    let pricingOptions = document.getElementById('pricing-options');
    let tableContainer = document.getElementById('pricing-table-container');
    if (event.target.checked) {
      pricingOptions.classList.add('pricing-options--annual-billing');
      pricingOptions.classList.remove('pricing-options--monthly-billing');
      tableContainer.classList.add('pricing-table-container--annual-billing');
    } else {
      pricingOptions.classList.add('pricing-options--monthly-billing');
      pricingOptions.classList.remove('pricing-options--annual-billing');
      tableContainer.classList.remove(
        'pricing-table-container--annual-billing'
      );
    }
  };
  const toggleOrgType = (selector) => {
    let pricingOptions = document.getElementById('pricing-options');
    let tableContainer = document.getElementById('pricing-table-container');
    if (selector.checked) {
      tableContainer.classList.add('pricing-table-container--forProfit');
      pricingOptions.classList.add('pricing-options--other');
      pricingOptions.classList.remove('pricing-options--nonprofit');
    } else {
      tableContainer.classList.remove('pricing-table-container--forProfit');
      pricingOptions.classList.add('pricing-options--nonprofit');
      pricingOptions.classList.remove('pricing-options--other');
    }
  };
  const toggleOrgSelector = (event) => {
    toggleOrgType(event.target);
  };
  const toggleOrgTypeOnLoad = () => {
    if (location.hash === '#other') {
      const orgTypeSelector = document.getElementById('org-type-selector');
      if (orgTypeSelector) {
        orgTypeSelector.checked = true;
        toggleOrgType(orgTypeSelector);
      }
    }
  };
  const toggleTableExpansion = (event) => {
    let relatedTable = document.getElementById(

    );
    if (event.target.checked) {
      relatedTable.classList.add('pricing-table-single--expanded-content');
    } else {
      relatedTable.classList.remove('pricing-table-single--expanded-content');
    }
  };
  const clickOnEnter = (event) => {
    if (event.key === 'Enter' && document.activeElement.attributes.clickable) {
      document.activeElement.click();
    }
  };
  const scrollToPlan = (event, targetTableId) => {
    event.preventDefault();
    let pricingTableAll = document.getElementById('pricing-table-all');

    if (pricingTableAll && pricingTableAll?.offsetParent) {
      pricingTableAll.scrollIntoView();
    } else {
      let targetTable = document.getElementById(targetTableId);
      const y =
        targetTable.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({top: y, behavior: 'smooth'});
    }
  };
  document.body.addEventListener("keydown", (event) => {
    clickOnEnter(event)
  })
  document.addEventListener('DOMContentLoaded', () => {
    toggleOrgTypeOnLoad();
  });
</script>



<div class="root__row">
  <div class="root__row-content">
    <section class="side-image-banner">
      <div class="side-image-banner__text-block banner-text banner-text--side-image">
        <h1 class="side-image-banner__header">
          
            <div>Powerful data
collection,</div>
          
            <div>available to everyone</div>
          
        </h1>
        <p>shopnotoolbox enables
organizations to thrive in challenging environments by offering our powerful
software for free to all nonprofits under our Community Plan. For those with
high volume data collection needs and private companies, we offer paid plans and
tailor-made solutions.</p>
      </div>
      
        <div class="side-image-banner__img-container">
          <img src="/assets/images/banners/pricing-banner.png"/>
        </div>
      
    </section>
  </div>
</div>
  
<div class="root__row">
  <div class="root__row-content root__row-content--wide">
    
<div
  id="pricing-options"
  class="pricing-options pricing-options--monthly-billing pricing-options--nonprofit">
  <div class="pricing-options__content">
    <div
      class="pricing-options__org-type">
      <h2
        class="pricing-options__org-choice-header">Choose your pricing plan</h2>
      <label tabindex="0" clickable class="labelled-slider__base">
  <input tabindex="-1" id="org-type-selector" type="checkbox" onclick=toggleOrgSelector(event)>
  <span class="labelled-slider__toggle"></span>
  <span class="labelled-slider__label labelled-slider__label--left">Nonprofit</span>
  <span class="labelled-slider__label labelled-slider__label--right">Other</span>
</label>

    </div>
    <div
      class="pricing-options__description-and-billing">
      <div
        class="pricing-options__org-type-description">
        <span
          class="pricing-options__org-type-description--nonprofit">
          <b>Nonprofit:</b>
          This category includes nonprofits, government agencies, UN organizations, and educational institutions.
        </span>
        <span
          class="pricing-options__org-type-description--other">
          <b>Other:</b>
          This category includes private companies, for-profit organizations, and personal use not associated with an organization.
        </span>
      </div>
      <div
        class="pricing-options__billing-toggle">
        <span
          class="pricing-options__billing-toggle--monthly">Monthly</span>
        <label tabindex="0" clickable class="simple-slider__base">
  <input tabindex="-1" type="checkbox" onclick=toggleBillingCycle(event)>
  <span class="simple-slider__toggle"></span>
</label>

        <span
          class="pricing-options__billing-toggle--annual">Annual</span>
      </div>
    </div>
  </div>
</div>
 <div
  id="pricing-table-container"
  class="pricing-table-container">
  

<table id="pricing-table-all" class="pricing-table-all">
  <colgroup>
    <col class="pricing-table-all__col pricing-table-all__col--features" />
    
      <col
        class="pricing-table-all__col
      
      
        pricing-table-all__col--for-profit-only">
    
      <col
        class="pricing-table-all__col
      
        pricing-table-all__col--most-popular
      ">
    
      <col
        class="pricing-table-all__col
      
      ">
    
      <col
        class="pricing-table-all__col
      
      ">
    
  </colgroup>
  <thead id="pricing-table-all-thead"class="pricing-table-all__thead">
    <tr>
      <th class="pricing-table-all__header-cell"></th>
      
        <th
          class="pricing-table-all__header-cell
          
            pricing-table-all__cell--for-profit
          ">
          <div class="pricing-table-header-cell__top-upper">
  <div class="pricing-table-header-cell__name-container">
    <div class="pricing-table-header-cell__name">
      Starter
    </div>
    
  </div>
  <div class="pricing-table-header-cell__price-org pricing-table-header-cell__price-org--nonprofit">
    <div class="pricing-table-header-cell__price pricing-table-header-cell__price--monthly">
      <span>$25</span>
      
        <span class="pricing-table-header-cell__per-month">per month</span>
      
    </div>
    <div class="pricing-table-header-cell__price pricing-table-header-cell__price--annual">
      $21
      
        <span class="pricing-table-header-cell__per-month">per month</span>
      
    </div>
  </div>
  <div class="pricing-table-header-cell__price-org pricing-table-header-cell__price-org--other">
    <div class="pricing-table-header-cell__price pricing-table-header-cell__price--monthly">
      $25
      
        <span class="pricing-table-header-cell__per-month">per month</span>
      
    </div>
    <div class="pricing-table-header-cell__price pricing-table-header-cell__price--annual">
      $21
      
        <span class="pricing-table-header-cell__per-month">per month</span>
      
    </div>
  </div>
</div>
<div class="pricing-table-header-cell__description">
  <span class="blech">The ideal choice for creating small- to medium-sized surveys.</span>
</div>
        </th>
      
        <th
          class="pricing-table-all__header-cell
          
          
            pricing-table-all__header-cell--most-popular">
          <div class="pricing-table-header-cell__top-upper">
  <div class="pricing-table-header-cell__name-container">
    <div class="pricing-table-header-cell__name">
      Community
    </div>
    
      <div class="pricing-table-header-cell__popular-chip">
        Most popular
      </div>
    
  </div>
  <div class="pricing-table-header-cell__price-org pricing-table-header-cell__price-org--nonprofit">
    <div class="pricing-table-header-cell__price pricing-table-header-cell__price--monthly">
      <span>Free</span>
      
    </div>
    <div class="pricing-table-header-cell__price pricing-table-header-cell__price--annual">
      Free
      
    </div>
  </div>
  <div class="pricing-table-header-cell__price-org pricing-table-header-cell__price-org--other">
    <div class="pricing-table-header-cell__price pricing-table-header-cell__price--monthly">
      $99
      
        <span class="pricing-table-header-cell__per-month">per month</span>
      
    </div>
    <div class="pricing-table-header-cell__price pricing-table-header-cell__price--annual">
      $88
      
        <span class="pricing-table-header-cell__per-month">per month</span>
      
    </div>
  </div>
</div>
<div class="pricing-table-header-cell__description">
  <span class="blech">The plan for everyone, the perfect solution for most projects.</span>
</div>
        </th>
      
        <th
          class="pricing-table-all__header-cell
          
          ">
          <div class="pricing-table-header-cell__top-upper">
  <div class="pricing-table-header-cell__name-container">
    <div class="pricing-table-header-cell__name">
      Professional
    </div>
    
  </div>
  <div class="pricing-table-header-cell__price-org pricing-table-header-cell__price-org--nonprofit">
    <div class="pricing-table-header-cell__price pricing-table-header-cell__price--monthly">
      <span>$159</span>
      
        <span class="pricing-table-header-cell__per-month">per month</span>
      
    </div>
    <div class="pricing-table-header-cell__price pricing-table-header-cell__price--annual">
      $129
      
        <span class="pricing-table-header-cell__per-month">per month</span>
      
    </div>
  </div>
  <div class="pricing-table-header-cell__price-org pricing-table-header-cell__price-org--other">
    <div class="pricing-table-header-cell__price pricing-table-header-cell__price--monthly">
      $199
      
        <span class="pricing-table-header-cell__per-month">per month</span>
      
    </div>
    <div class="pricing-table-header-cell__price pricing-table-header-cell__price--annual">
      $166
      
        <span class="pricing-table-header-cell__per-month">per month</span>
      
    </div>
  </div>
</div>
<div class="pricing-table-header-cell__description">
  <span class="blech">For individuals with higher data collection needs.</span>
</div>
        </th>
      
        <th
          class="pricing-table-all__header-cell
          
          ">
          <div class="pricing-table-header-cell__top-upper">
  <div class="pricing-table-header-cell__name-container">
    <div class="pricing-table-header-cell__name">
      Enterprise
    </div>
    
  </div>
  <div class="pricing-table-header-cell__price-org pricing-table-header-cell__price-org--nonprofit">
    <div class="pricing-table-header-cell__price pricing-table-header-cell__price--monthly">
      <span>Contact us</span>
      
    </div>
    <div class="pricing-table-header-cell__price pricing-table-header-cell__price--annual">
      Contact us
      
    </div>
  </div>
  <div class="pricing-table-header-cell__price-org pricing-table-header-cell__price-org--other">
    <div class="pricing-table-header-cell__price pricing-table-header-cell__price--monthly">
      Contact us
      
    </div>
    <div class="pricing-table-header-cell__price pricing-table-header-cell__price--annual">
      Contact us
      
    </div>
  </div>
</div>
<div class="pricing-table-header-cell__description">
  <span class="blech">Priority organization support and high volume data collection.</span>
</div>
        </th>
      
    </tr>
    <tr>
      <td class="pricing-table-all__cta-top"></td>
      
        <td
          class="pricing-table-all__cta-top
          
            pricing-table-all__cell--for-profit
          ">
          
<a class="button button--size-m button--type-full button--color-blue" href="/sign-up/">Get started</a>

        </td>
      
        <td
          class="pricing-table-all__cta-top
          
          
            pricing-table-all__cta-top--most-popular">
          
<a class="button button--size-m button--type-full button--color-blue" href="/sign-up/">Get started</a>

        </td>
      
        <td
          class="pricing-table-all__cta-top
          
          ">
          
<a class="button button--size-m button--type-full button--color-blue" href="/sign-up/">Get started</a>

        </td>
      
        <td
          class="pricing-table-all__cta-top
          
          ">
          
<a class="button button--size-m button--type-full button--color-blue" href="/contact/">Get in touch</a>

        </td>
      
    </tr>
  </thead>
  

<tr
  class="pricing-table-body__subhead-row">
  <th
    class="pricing-table-body__subhead-name-cell"
    scope="row">
    <b>ESSENTIALS</b>
  </th>
  
    <td
      class="
      pricing-table-body__cell
      
      pricing-table-all__cell--for-profit">
    </td>
  
    <td
      class="
      pricing-table-body__cell
      pricing-table-body__cell--most-popular
      ">
    </td>
  
    <td
      class="
      pricing-table-body__cell
      
      ">
    </td>
  
    <td
      class="
      pricing-table-body__cell
      
      ">
    </td>
  
</tr>
<tbody
  class="pricing-table-body__sub-section ">
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Projects/Forms</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    The number of projects and forms you can create
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        pricing-table-all__cell--for-profit">

        Unlimited

      </td>
    
      <td
        class="
        pricing-table-body__cell
        pricing-table-body__cell--most-popular
        ">

        Unlimited

      </td>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        Unlimited

      </td>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        Unlimited

      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Data collectors and collaborators</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    The number of data collectors (also known as enumerators) and other types of collaborators you can add to your projects
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        pricing-table-all__cell--for-profit">

        Unlimited

      </td>
    
      <td
        class="
        pricing-table-body__cell
        pricing-table-body__cell--most-popular
        ">

        Unlimited

      </td>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        Unlimited

      </td>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        Unlimited

      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Survey submissions</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    The number of survey submissions that can be collected by the projects owned by your account
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        pricing-table-all__cell--for-profit">
          <span class="pricing-table-body__feature-value--monthly">
            1,000/month
          </span>
          <span class="pricing-table-body__feature-value--annual">
            1,000/month
          </span>
      </td>
    
      <td
        class="
        pricing-table-body__cell
        pricing-table-body__cell--most-popular
        ">
          <span class="pricing-table-body__feature-value--monthly">
            5,000/month
          </span>
          <span class="pricing-table-body__feature-value--annual">
            5,000/month
          </span>
      </td>
    
      <td
        class="
        pricing-table-body__cell
        
        ">
          <span class="pricing-table-body__feature-value--monthly">
            25,000/month
          </span>
          <span class="pricing-table-body__feature-value--annual">
            300,000/year
          </span>
      </td>
    
      <td
        class="
        pricing-table-body__cell
        
        ">
          <span class="pricing-table-body__feature-value--monthly">
            Custom
          </span>
          <span class="pricing-table-body__feature-value--annual">
            Custom
          </span>
      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">File storage</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    The space available for storing photo, video, and audio files collected with your surveys
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        pricing-table-all__cell--for-profit">

        0.5 GB

      </td>
    
      <td
        class="
        pricing-table-body__cell
        pricing-table-body__cell--most-popular
        ">

        1 GB

      </td>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        Unlimited

      </td>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        Unlimited

      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Online/offline data collection</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Collect data online and offline with our Android app or with web forms on all devices, including iOS and desktop
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        pricing-table-all__cell--for-profit">

        
  <svg
    class="pricing-table-body__checkmark">
    <use
      xlink:href="/assets/images/site/sprite.svg#check" />
  </svg>



      </td>
    
      <td
        class="
        pricing-table-body__cell
        pricing-table-body__cell--most-popular
        ">

        
  <svg
    class="pricing-table-body__checkmark">
    <use
      xlink:href="/assets/images/site/sprite.svg#check" />
  </svg>



      </td>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        
  <svg
    class="pricing-table-body__checkmark">
    <use
      xlink:href="/assets/images/site/sprite.svg#check" />
  </svg>



      </td>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        
  <svg
    class="pricing-table-body__checkmark">
    <use
      xlink:href="/assets/images/site/sprite.svg#check" />
  </svg>



      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Support our open source development</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Paid plans help fund the development of shopnotoolbox and ensure our software is accessible to as many users as possible
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        pricing-table-all__cell--for-profit">

        
  <span
    class="pricing-table-body__em-dash">&#8212;</span>



      </td>
    
      <td
        class="
        pricing-table-body__cell
        pricing-table-body__cell--most-popular
        ">

        
  <span
    class="pricing-table-body__em-dash">&#8212;</span>



      </td>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        
  <svg
    class="pricing-table-body__checkmark">
    <use
      xlink:href="/assets/images/site/sprite.svg#check" />
  </svg>



      </td>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        
  <svg
    class="pricing-table-body__checkmark">
    <use
      xlink:href="/assets/images/site/sprite.svg#check" />
  </svg>



      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Group access and teams</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Share your paid plan and additional limits with other users
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        pricing-table-all__cell--for-profit">

        <span class='pricing-table-body__em-dash'>&#8212;</span>

      </td>
    
      <td
        class="
        pricing-table-body__cell
        pricing-table-body__cell--most-popular
        ">

        <span class='pricing-table-body__em-dash'>&#8212;</span>

      </td>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        Get in touch

      </td>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        Custom

      </td>
    
  </tr>
</tbody>
<tr
  class="pricing-table-body__subhead-row">
  <th
    class="pricing-table-body__subhead-name-cell"
    scope="row">
    <b>ADVANCED FEATURES</b>
  </th>
  
    <td
      class="
      pricing-table-body__cell
      
      pricing-table-all__cell--for-profit">

    </td>
  
    <td
      class="
      pricing-table-body__cell
      pricing-table-body__cell--most-popular
      ">

    </td>
  
    <td
      class="
      pricing-table-body__cell
      
      ">

    </td>
  
    <td
      class="
      pricing-table-body__cell
      
      ">

    </td>
  
</tr>
<tbody
  class="pricing-table-body__sub-section">
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Two-factor authentication</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Add an extra layer of security with a second identification step, authenticated with a mobile app or offline passcodes
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        pricing-table-all__cell--for-profit">

        
  <span
    class="pricing-table-body__em-dash">&#8212;</span>



      </td>
    
      <td
        class="
        pricing-table-body__cell
        pricing-table-body__cell--most-popular
        ">

        
  <span
    class="pricing-table-body__em-dash">&#8212;</span>



      </td>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        
  <svg
    class="pricing-table-body__checkmark">
    <use
      xlink:href="/assets/images/site/sprite.svg#check" />
  </svg>



      </td>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        
  <svg
    class="pricing-table-body__checkmark">
    <use
      xlink:href="/assets/images/site/sprite.svg#check" />
  </svg>



      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Single sign-on (SSO)</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Create and sign in to shopnotoolbox accounts using an existing user authentication method, such as Azure Active Directory
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        pricing-table-all__cell--for-profit">

        
  <span
    class="pricing-table-body__em-dash">&#8212;</span>



      </td>
    
      <td
        class="
        pricing-table-body__cell
        pricing-table-body__cell--most-popular
        ">

        
  <span
    class="pricing-table-body__em-dash">&#8212;</span>



      </td>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        
  <span
    class="pricing-table-body__em-dash">&#8212;</span>



      </td>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        
  <svg
    class="pricing-table-body__checkmark">
    <use
      xlink:href="/assets/images/site/sprite.svg#check" />
  </svg>



      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Automatic speech-to-text transcription</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Create transcripts of audio files collected in different languages using automatic speech recognition
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        pricing-table-all__cell--for-profit">

        5 minutes/month

      </td>
    
      <td
        class="
        pricing-table-body__cell
        pricing-table-body__cell--most-popular
        ">

        10 minutes/month

      </td>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        120 minutes/month

      </td>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        Custom

      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Machine translation of transcripts</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Create translations of transcripts in different languages using automated translation
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        pricing-table-all__cell--for-profit">

        3,000 characters/month

      </td>
    
      <td
        class="
        pricing-table-body__cell
        pricing-table-body__cell--most-popular
        ">

        6,000 characters/month

      </td>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        72,000 characters/month

      </td>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        Custom

      </td>
    
  </tr>
</tbody>
<tr
  class="pricing-table-body__subhead-row">
  <th
    class="pricing-table-body__subhead-name-cell"
    scope="row">
    <b>SUPPORT</b>
  </th>
  
    <td
      class="
      pricing-table-body__cell
      
      pricing-table-all__cell--for-profit">

    </td>
  
    <td
      class="
      pricing-table-body__cell
      pricing-table-body__cell--most-popular
      ">

    </td>
  
    <td
      class="
      pricing-table-body__cell
      
      ">

    </td>
  
    <td
      class="
      pricing-table-body__cell
      
      ">

    </td>
  
</tr>
<tbody
  class="pricing-table-body__sub-section">
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Vibrant Community Forum</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Ask questions, share answers, and collaborate to find solutions with thousands of shopnotoolbox users
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        pricing-table-all__cell--for-profit">

        
  <svg
    class="pricing-table-body__checkmark">
    <use
      xlink:href="/assets/images/site/sprite.svg#check" />
  </svg>



      </td>
    
      <td
        class="
        pricing-table-body__cell
        pricing-table-body__cell--most-popular
        ">

        
  <svg
    class="pricing-table-body__checkmark">
    <use
      xlink:href="/assets/images/site/sprite.svg#check" />
  </svg>



      </td>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        
  <svg
    class="pricing-table-body__checkmark">
    <use
      xlink:href="/assets/images/site/sprite.svg#check" />
  </svg>



      </td>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        
  <svg
    class="pricing-table-body__checkmark">
    <use
      xlink:href="/assets/images/site/sprite.svg#check" />
  </svg>



      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Self-serve learning base</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Find answers and resources in our extensive documentation, including tutorials and training videos
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        pricing-table-all__cell--for-profit">

        
  <svg
    class="pricing-table-body__checkmark">
    <use
      xlink:href="/assets/images/site/sprite.svg#check" />
  </svg>



      </td>
    
      <td
        class="
        pricing-table-body__cell
        pricing-table-body__cell--most-popular
        ">

        
  <svg
    class="pricing-table-body__checkmark">
    <use
      xlink:href="/assets/images/site/sprite.svg#check" />
  </svg>



      </td>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        
  <svg
    class="pricing-table-body__checkmark">
    <use
      xlink:href="/assets/images/site/sprite.svg#check" />
  </svg>



      </td>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        
  <svg
    class="pricing-table-body__checkmark">
    <use
      xlink:href="/assets/images/site/sprite.svg#check" />
  </svg>



      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Direct user support</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Get help from our professional support team
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        pricing-table-all__cell--for-profit">

        
  <span
    class="pricing-table-body__em-dash">&#8212;</span>



      </td>
    
      <td
        class="
        pricing-table-body__cell
        pricing-table-body__cell--most-popular
        ">

        
  <span
    class="pricing-table-body__em-dash">&#8212;</span>



      </td>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        
  <svg
    class="pricing-table-body__checkmark">
    <use
      xlink:href="/assets/images/site/sprite.svg#check" />
  </svg>



      </td>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        
  <svg
    class="pricing-table-body__checkmark">
    <use
      xlink:href="/assets/images/site/sprite.svg#check" />
  </svg>



      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Dedicated organization support</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Advanced support from our staff experts and priority response timing
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        pricing-table-all__cell--for-profit">

        
  <span
    class="pricing-table-body__em-dash">&#8212;</span>



      </td>
    
      <td
        class="
        pricing-table-body__cell
        pricing-table-body__cell--most-popular
        ">

        
  <span
    class="pricing-table-body__em-dash">&#8212;</span>



      </td>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        
  <span
    class="pricing-table-body__em-dash">&#8212;</span>



      </td>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        
  <svg
    class="pricing-table-body__checkmark">
    <use
      xlink:href="/assets/images/site/sprite.svg#check" />
  </svg>



      </td>
    
  </tr>
</tbody>
<tr
  class="pricing-table-body__subhead-row">
  <th
    class="pricing-table-body__subhead-name-cell"
    scope="row">
    <b>PROFESSIONAL SERVICES</b>
  </th>
  
    <td
      class="
      pricing-table-body__cell
      
      pricing-table-all__cell--for-profit">

    </td>
  
    <td
      class="
      pricing-table-body__cell
      pricing-table-body__cell--most-popular
      ">

    </td>
  
    <td
      class="
      pricing-table-body__cell
      
      ">

    </td>
  
    <td
      class="
      pricing-table-body__cell
      
      ">

    </td>
  
</tr>
<tbody
  class="pricing-table-body__sub-section">
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Consultations with shopnotoolbox experts</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Regular consultations with senior staff from Kobo's team of experts to discuss potential optimizations, integrations, and more
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        pricing-table-all__cell--for-profit">

        
  <span
    class="pricing-table-body__em-dash">&#8212;</span>



      </td>
    
      <td
        class="
        pricing-table-body__cell
        pricing-table-body__cell--most-popular
        ">

        
  <span
    class="pricing-table-body__em-dash">&#8212;</span>



      </td>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        
  <span
    class="pricing-table-body__em-dash">&#8212;</span>



      </td>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        
  <svg
    class="pricing-table-body__checkmark">
    <use
      xlink:href="/assets/images/site/sprite.svg#check" />
  </svg>



      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Preview new features and shape the shopnotoolbox roadmap</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Opportunities to contribute your input to pre-release feature testing and software development planning
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        pricing-table-all__cell--for-profit">

        
  <span
    class="pricing-table-body__em-dash">&#8212;</span>



      </td>
    
      <td
        class="
        pricing-table-body__cell
        pricing-table-body__cell--most-popular
        ">

        
  <span
    class="pricing-table-body__em-dash">&#8212;</span>



      </td>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        
  <span
    class="pricing-table-body__em-dash">&#8212;</span>



      </td>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        
  <svg
    class="pricing-table-body__checkmark">
    <use
      xlink:href="/assets/images/site/sprite.svg#check" />
  </svg>



      </td>
    
  </tr>
</tbody>
</table>


  
  



<table
  id="pricing-table-single--1"
  class="
  pricing-table-single
   pricing-table-single--forProfit">
  <colgroup>
    <col
      class="pricing-table-single--col1">
    <col
      class="pricing-table-single--col2" />
  </colgroup>
    <caption
  class="pricing-table-single-header-caption
  
  
    pricing-table-single-header-caption--other-display
  ">
      <div class="pricing-table-single-header-caption__name-container">
        <div class="pricing-table-single-header-caption__name">
          Starter
        </div>
        
      </div>
      <div class="pricing-table-single-header-caption__price-org pricing-table-single-header-caption__price-org--nonprofit">
        <div class="pricing-table-single-header-caption__price pricing-table-single-header-caption__price--monthly">
          <span>$25</span>
          
            <span class="pricing-table-single-header-caption__per-month">per month</span>
          
        </div>
        <div class="pricing-table-single-header-caption__price pricing-table-single-header-caption__price--annual">
          $21
          
            <span class="pricing-table-single-header-caption__per-month">per month</span>
          
        </div>
      </div>
      <div class="pricing-table-single-header-caption__price-org pricing-table-single-header-caption__price-org--other">
        <div class="pricing-table-single-header-caption__price pricing-table-single-header-caption__price--monthly">
          $25
          
            <span class="pricing-table-single-header-caption__per-month">per month</span>
          
        </div>
        <div class="pricing-table-single-header-caption__price pricing-table-single-header-caption__price--annual">
          $21
          
            <span class="pricing-table-single-header-caption__per-month">per month</span>
          
        </div>
      </div>
    <div class="pricing-table-single-header-caption__description">
      <span class="blech">The ideal choice for creating small- to medium-sized surveys.</span>
    </div>

  <div class="pricing-table-single-header-caption__cta">
    
<a class="button button--size-m button--type-full button--color-blue" href="/sign-up/">Get started</a>

  </div>
</caption>

    

<tr
  class="pricing-table-body__subhead-row">
  <th
    class="pricing-table-body__subhead-name-cell"
    scope="row">
    <b>ESSENTIALS</b>
  </th>
  
    <td
      class="
      pricing-table-body__cell
      
      pricing-table-all__cell--for-profit">
    </td>
  
</tr>
<tbody
  class="pricing-table-body__sub-section pricing-table-body__essentials">
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Projects/Forms</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    The number of projects and forms you can create
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        pricing-table-all__cell--for-profit">

        Unlimited

      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Data collectors and collaborators</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    The number of data collectors (also known as enumerators) and other types of collaborators you can add to your projects
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        pricing-table-all__cell--for-profit">

        Unlimited

      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Survey submissions</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    The number of survey submissions that can be collected by the projects owned by your account
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        pricing-table-all__cell--for-profit">
          <span class="pricing-table-body__feature-value--monthly">
            1,000/month
          </span>
          <span class="pricing-table-body__feature-value--annual">
            1,000/month
          </span>
      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">File storage</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    The space available for storing photo, video, and audio files collected with your surveys
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        pricing-table-all__cell--for-profit">

        0.5 GB

      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Online/offline data collection</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Collect data online and offline with our Android app or with web forms on all devices, including iOS and desktop
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        pricing-table-all__cell--for-profit">

        
  <svg
    class="pricing-table-body__checkmark">
    <use
      xlink:href="/assets/images/site/sprite.svg#check" />
  </svg>



      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Support our open source development</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Paid plans help fund the development of shopnotoolbox and ensure our software is accessible to as many users as possible
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        pricing-table-all__cell--for-profit">

        
  <span
    class="pricing-table-body__em-dash">&#8212;</span>



      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Group access and teams</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Share your paid plan and additional limits with other users
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        pricing-table-all__cell--for-profit">

        <span class='pricing-table-body__em-dash'>&#8212;</span>

      </td>
    
  </tr>
</tbody>
<tr
  class="pricing-table-body__subhead-row">
  <th
    class="pricing-table-body__subhead-name-cell"
    scope="row">
    <b>ADVANCED FEATURES</b>
  </th>
  
    <td
      class="
      pricing-table-body__cell
      
      pricing-table-all__cell--for-profit">

    </td>
  
</tr>
<tbody
  class="pricing-table-body__sub-section">
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Two-factor authentication</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Add an extra layer of security with a second identification step, authenticated with a mobile app or offline passcodes
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        pricing-table-all__cell--for-profit">

        
  <span
    class="pricing-table-body__em-dash">&#8212;</span>



      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Single sign-on (SSO)</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Create and sign in to shopnotoolbox accounts using an existing user authentication method, such as Azure Active Directory
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        pricing-table-all__cell--for-profit">

        
  <span
    class="pricing-table-body__em-dash">&#8212;</span>



      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Automatic speech-to-text transcription</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Create transcripts of audio files collected in different languages using automatic speech recognition
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        pricing-table-all__cell--for-profit">

        5 minutes/month

      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Machine translation of transcripts</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Create translations of transcripts in different languages using automated translation
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        pricing-table-all__cell--for-profit">

        3,000 characters/month

      </td>
    
  </tr>
</tbody>
<tr
  class="pricing-table-body__subhead-row">
  <th
    class="pricing-table-body__subhead-name-cell"
    scope="row">
    <b>SUPPORT</b>
  </th>
  
    <td
      class="
      pricing-table-body__cell
      
      pricing-table-all__cell--for-profit">

    </td>
  
</tr>
<tbody
  class="pricing-table-body__sub-section">
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Vibrant Community Forum</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Ask questions, share answers, and collaborate to find solutions with thousands of shopnotoolbox users
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        pricing-table-all__cell--for-profit">

        
  <svg
    class="pricing-table-body__checkmark">
    <use
      xlink:href="/assets/images/site/sprite.svg#check" />
  </svg>



      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Self-serve learning base</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Find answers and resources in our extensive documentation, including tutorials and training videos
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        pricing-table-all__cell--for-profit">

        
  <svg
    class="pricing-table-body__checkmark">
    <use
      xlink:href="/assets/images/site/sprite.svg#check" />
  </svg>



      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Direct user support</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Get help from our professional support team
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        pricing-table-all__cell--for-profit">

        
  <span
    class="pricing-table-body__em-dash">&#8212;</span>



      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Dedicated organization support</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Advanced support from our staff experts and priority response timing
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        pricing-table-all__cell--for-profit">

        
  <span
    class="pricing-table-body__em-dash">&#8212;</span>



      </td>
    
  </tr>
</tbody>
<tr
  class="pricing-table-body__subhead-row">
  <th
    class="pricing-table-body__subhead-name-cell"
    scope="row">
    <b>PROFESSIONAL SERVICES</b>
  </th>
  
    <td
      class="
      pricing-table-body__cell
      
      pricing-table-all__cell--for-profit">

    </td>
  
</tr>
<tbody
  class="pricing-table-body__sub-section">
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Consultations with shopnotoolbox experts</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Regular consultations with senior staff from Kobo's team of experts to discuss potential optimizations, integrations, and more
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        pricing-table-all__cell--for-profit">

        
  <span
    class="pricing-table-body__em-dash">&#8212;</span>



      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Preview new features and shape the shopnotoolbox roadmap</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Opportunities to contribute your input to pre-release feature testing and software development planning
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        pricing-table-all__cell--for-profit">

        
  <span
    class="pricing-table-body__em-dash">&#8212;</span>



      </td>
    
  </tr>
</tbody>
  <tfoot>
      <tr class="pricing-table-single__read-more-row">
        <td colspan="2" class="pricing-table-single__read-more-cell">
          <input
            id="pricing-table-read-more--1"
            tableId="1"
            type="checkbox"
            onclick=toggleTableExpansion(event)
            class="pricing-table-single__read-more-input" />
          <label
            id="pricing-table-read-more-trigger--1"
            role="button"
            clickable
            tabindex="0"
            for="pricing-table-read-more--1"
            class="pricing-table-single__read-more-trigger"></label>
        </td>
      </tr>
      <tr class="pricing-table-single__cta-footer-row">
        <td colspan="2" class="pricing-table-single__cta-footer">
          
<a class="button button--size-m button--type-full button--color-blue" href="/sign-up/">Get started</a>

        </td>
      </tr>
</table>


  
  



<table
  id="pricing-table-single--2"
  class="
  pricing-table-single
  ">
  <colgroup>
    <col
      class="pricing-table-single--col1">
    <col
      class="pricing-table-single--col2" />
  </colgroup>
    <caption
  class="pricing-table-single-header-caption
  
    pricing-table-single-header-caption--most-popular
  
  ">
      <div class="pricing-table-single-header-caption__name-container">
        <div class="pricing-table-single-header-caption__name">
          Community
        </div>
        
          <div class="pricing-table-single-header-caption__popular-chip">
            Most popular
          </div>
        
      </div>
      <div class="pricing-table-single-header-caption__price-org pricing-table-single-header-caption__price-org--nonprofit">
        <div class="pricing-table-single-header-caption__price pricing-table-single-header-caption__price--monthly">
          <span>Free</span>
          
        </div>
        <div class="pricing-table-single-header-caption__price pricing-table-single-header-caption__price--annual">
          Free
          
        </div>
      </div>
      <div class="pricing-table-single-header-caption__price-org pricing-table-single-header-caption__price-org--other">
        <div class="pricing-table-single-header-caption__price pricing-table-single-header-caption__price--monthly">
          $99
          
            <span class="pricing-table-single-header-caption__per-month">per month</span>
          
        </div>
        <div class="pricing-table-single-header-caption__price pricing-table-single-header-caption__price--annual">
          $88
          
            <span class="pricing-table-single-header-caption__per-month">per month</span>
          
        </div>
      </div>
    <div class="pricing-table-single-header-caption__description">
      <span class="blech">The plan for everyone, the perfect solution for most projects.</span>
    </div>

  <div class="pricing-table-single-header-caption__cta">
    
<a class="button button--size-m button--type-full button--color-blue" href="/sign-up/">Get started</a>

  </div>
</caption>

    

<tr
  class="pricing-table-body__subhead-row">
  <th
    class="pricing-table-body__subhead-name-cell"
    scope="row">
    <b>ESSENTIALS</b>
  </th>
  
    <td
      class="
      pricing-table-body__cell
      pricing-table-body__cell--most-popular
      ">
    </td>
  
</tr>
<tbody
  class="pricing-table-body__sub-section pricing-table-body__essentials">
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Projects/Forms</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    The number of projects and forms you can create
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        pricing-table-body__cell--most-popular
        ">

        Unlimited

      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Data collectors and collaborators</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    The number of data collectors (also known as enumerators) and other types of collaborators you can add to your projects
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        pricing-table-body__cell--most-popular
        ">

        Unlimited

      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Survey submissions</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    The number of survey submissions that can be collected by the projects owned by your account
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        pricing-table-body__cell--most-popular
        ">
          <span class="pricing-table-body__feature-value--monthly">
            5,000/month
          </span>
          <span class="pricing-table-body__feature-value--annual">
            5,000/month
          </span>
      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">File storage</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    The space available for storing photo, video, and audio files collected with your surveys
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        pricing-table-body__cell--most-popular
        ">

        1 GB

      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Online/offline data collection</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Collect data online and offline with our Android app or with web forms on all devices, including iOS and desktop
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        pricing-table-body__cell--most-popular
        ">

        
  <svg
    class="pricing-table-body__checkmark">
    <use
      xlink:href="/assets/images/site/sprite.svg#check" />
  </svg>



      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Support our open source development</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Paid plans help fund the development of shopnotoolbox and ensure our software is accessible to as many users as possible
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        pricing-table-body__cell--most-popular
        ">

        
  <span
    class="pricing-table-body__em-dash">&#8212;</span>



      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Group access and teams</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Share your paid plan and additional limits with other users
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        pricing-table-body__cell--most-popular
        ">

        <span class='pricing-table-body__em-dash'>&#8212;</span>

      </td>
    
  </tr>
</tbody>
<tr
  class="pricing-table-body__subhead-row">
  <th
    class="pricing-table-body__subhead-name-cell"
    scope="row">
    <b>ADVANCED FEATURES</b>
  </th>
  
    <td
      class="
      pricing-table-body__cell
      pricing-table-body__cell--most-popular
      ">

    </td>
  
</tr>
<tbody
  class="pricing-table-body__sub-section">
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Two-factor authentication</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Add an extra layer of security with a second identification step, authenticated with a mobile app or offline passcodes
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        pricing-table-body__cell--most-popular
        ">

        
  <span
    class="pricing-table-body__em-dash">&#8212;</span>



      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Single sign-on (SSO)</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Create and sign in to shopnotoolbox accounts using an existing user authentication method, such as Azure Active Directory
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        pricing-table-body__cell--most-popular
        ">

        
  <span
    class="pricing-table-body__em-dash">&#8212;</span>



      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Automatic speech-to-text transcription</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Create transcripts of audio files collected in different languages using automatic speech recognition
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        pricing-table-body__cell--most-popular
        ">

        10 minutes/month

      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Machine translation of transcripts</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Create translations of transcripts in different languages using automated translation
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        pricing-table-body__cell--most-popular
        ">

        6,000 characters/month

      </td>
    
  </tr>
</tbody>
<tr
  class="pricing-table-body__subhead-row">
  <th
    class="pricing-table-body__subhead-name-cell"
    scope="row">
    <b>SUPPORT</b>
  </th>
  
    <td
      class="
      pricing-table-body__cell
      pricing-table-body__cell--most-popular
      ">

    </td>
  
</tr>
<tbody
  class="pricing-table-body__sub-section">
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Vibrant Community Forum</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Ask questions, share answers, and collaborate to find solutions with thousands of shopnotoolbox users
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        pricing-table-body__cell--most-popular
        ">

        
  <svg
    class="pricing-table-body__checkmark">
    <use
      xlink:href="/assets/images/site/sprite.svg#check" />
  </svg>



      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Self-serve learning base</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Find answers and resources in our extensive documentation, including tutorials and training videos
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        pricing-table-body__cell--most-popular
        ">

        
  <svg
    class="pricing-table-body__checkmark">
    <use
      xlink:href="/assets/images/site/sprite.svg#check" />
  </svg>



      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Direct user support</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Get help from our professional support team
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        pricing-table-body__cell--most-popular
        ">

        
  <span
    class="pricing-table-body__em-dash">&#8212;</span>



      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Dedicated organization support</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Advanced support from our staff experts and priority response timing
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        pricing-table-body__cell--most-popular
        ">

        
  <span
    class="pricing-table-body__em-dash">&#8212;</span>



      </td>
    
  </tr>
</tbody>
<tr
  class="pricing-table-body__subhead-row">
  <th
    class="pricing-table-body__subhead-name-cell"
    scope="row">
    <b>PROFESSIONAL SERVICES</b>
  </th>
  
    <td
      class="
      pricing-table-body__cell
      pricing-table-body__cell--most-popular
      ">

    </td>
  
</tr>
<tbody
  class="pricing-table-body__sub-section">
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Consultations with shopnotoolbox experts</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Regular consultations with senior staff from Kobo's team of experts to discuss potential optimizations, integrations, and more
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        pricing-table-body__cell--most-popular
        ">

        
  <span
    class="pricing-table-body__em-dash">&#8212;</span>



      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Preview new features and shape the shopnotoolbox roadmap</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Opportunities to contribute your input to pre-release feature testing and software development planning
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        pricing-table-body__cell--most-popular
        ">

        
  <span
    class="pricing-table-body__em-dash">&#8212;</span>



      </td>
    
  </tr>
</tbody>
  <tfoot>
      <tr class="pricing-table-single__read-more-row">
        <td colspan="2" class="pricing-table-single__read-more-cell">
          <input
            id="pricing-table-read-more--2"
            tableId="2"
            type="checkbox"
            onclick=toggleTableExpansion(event)
            class="pricing-table-single__read-more-input" />
          <label
            id="pricing-table-read-more-trigger--2"
            role="button"
            clickable
            tabindex="0"
            for="pricing-table-read-more--2"
            class="pricing-table-single__read-more-trigger"></label>
        </td>
      </tr>
      <tr class="pricing-table-single__cta-footer-row">
        <td colspan="2" class="pricing-table-single__cta-footer">
          
<a class="button button--size-m button--type-full button--color-blue" href="/sign-up/">Get started</a>

        </td>
      </tr>
</table>


  
  



<table
  id="pricing-table-single--3"
  class="
  pricing-table-single
  ">
  <colgroup>
    <col
      class="pricing-table-single--col1">
    <col
      class="pricing-table-single--col2" />
  </colgroup>
    <caption
  class="pricing-table-single-header-caption
  
  ">
      <div class="pricing-table-single-header-caption__name-container">
        <div class="pricing-table-single-header-caption__name">
          Professional
        </div>
        
      </div>
      <div class="pricing-table-single-header-caption__price-org pricing-table-single-header-caption__price-org--nonprofit">
        <div class="pricing-table-single-header-caption__price pricing-table-single-header-caption__price--monthly">
          <span>$159</span>
          
            <span class="pricing-table-single-header-caption__per-month">per month</span>
          
        </div>
        <div class="pricing-table-single-header-caption__price pricing-table-single-header-caption__price--annual">
          $129
          
            <span class="pricing-table-single-header-caption__per-month">per month</span>
          
        </div>
      </div>
      <div class="pricing-table-single-header-caption__price-org pricing-table-single-header-caption__price-org--other">
        <div class="pricing-table-single-header-caption__price pricing-table-single-header-caption__price--monthly">
          $199
          
            <span class="pricing-table-single-header-caption__per-month">per month</span>
          
        </div>
        <div class="pricing-table-single-header-caption__price pricing-table-single-header-caption__price--annual">
          $166
          
            <span class="pricing-table-single-header-caption__per-month">per month</span>
          
        </div>
      </div>
    <div class="pricing-table-single-header-caption__description">
      <span class="blech">For individuals with higher data collection needs.</span>
    </div>

  <div class="pricing-table-single-header-caption__cta">
    
<a class="button button--size-m button--type-full button--color-blue" href="/sign-up/">Get started</a>

  </div>
</caption>

    

<tr
  class="pricing-table-body__subhead-row">
  <th
    class="pricing-table-body__subhead-name-cell"
    scope="row">
    <b>ESSENTIALS</b>
  </th>
  
    <td
      class="
      pricing-table-body__cell
      
      ">
    </td>
  
</tr>
<tbody
  class="pricing-table-body__sub-section pricing-table-body__essentials">
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Projects/Forms</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    The number of projects and forms you can create
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        Unlimited

      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Data collectors and collaborators</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    The number of data collectors (also known as enumerators) and other types of collaborators you can add to your projects
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        Unlimited

      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Survey submissions</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    The number of survey submissions that can be collected by the projects owned by your account
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        ">
          <span class="pricing-table-body__feature-value--monthly">
            25,000/month
          </span>
          <span class="pricing-table-body__feature-value--annual">
            300,000/year
          </span>
      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">File storage</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    The space available for storing photo, video, and audio files collected with your surveys
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        Unlimited

      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Online/offline data collection</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Collect data online and offline with our Android app or with web forms on all devices, including iOS and desktop
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        
  <svg
    class="pricing-table-body__checkmark">
    <use
      xlink:href="/assets/images/site/sprite.svg#check" />
  </svg>



      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Support our open source development</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Paid plans help fund the development of shopnotoolbox and ensure our software is accessible to as many users as possible
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        
  <svg
    class="pricing-table-body__checkmark">
    <use
      xlink:href="/assets/images/site/sprite.svg#check" />
  </svg>



      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Group access and teams</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Share your paid plan and additional limits with other users
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        Get in touch

      </td>
    
  </tr>
</tbody>
<tr
  class="pricing-table-body__subhead-row">
  <th
    class="pricing-table-body__subhead-name-cell"
    scope="row">
    <b>ADVANCED FEATURES</b>
  </th>
  
    <td
      class="
      pricing-table-body__cell
      
      ">

    </td>
  
</tr>
<tbody
  class="pricing-table-body__sub-section">
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Two-factor authentication</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Add an extra layer of security with a second identification step, authenticated with a mobile app or offline passcodes
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        
  <svg
    class="pricing-table-body__checkmark">
    <use
      xlink:href="/assets/images/site/sprite.svg#check" />
  </svg>



      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Single sign-on (SSO)</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Create and sign in to shopnotoolbox accounts using an existing user authentication method, such as Azure Active Directory
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        
  <span
    class="pricing-table-body__em-dash">&#8212;</span>



      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Automatic speech-to-text transcription</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Create transcripts of audio files collected in different languages using automatic speech recognition
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        120 minutes/month

      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Machine translation of transcripts</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Create translations of transcripts in different languages using automated translation
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        72,000 characters/month

      </td>
    
  </tr>
</tbody>
<tr
  class="pricing-table-body__subhead-row">
  <th
    class="pricing-table-body__subhead-name-cell"
    scope="row">
    <b>SUPPORT</b>
  </th>
  
    <td
      class="
      pricing-table-body__cell
      
      ">

    </td>
  
</tr>
<tbody
  class="pricing-table-body__sub-section">
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Vibrant Community Forum</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Ask questions, share answers, and collaborate to find solutions with thousands of shopnotoolbox users
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        
  <svg
    class="pricing-table-body__checkmark">
    <use
      xlink:href="/assets/images/site/sprite.svg#check" />
  </svg>



      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Self-serve learning base</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Find answers and resources in our extensive documentation, including tutorials and training videos
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        
  <svg
    class="pricing-table-body__checkmark">
    <use
      xlink:href="/assets/images/site/sprite.svg#check" />
  </svg>



      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Direct user support</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Get help from our professional support team
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        
  <svg
    class="pricing-table-body__checkmark">
    <use
      xlink:href="/assets/images/site/sprite.svg#check" />
  </svg>



      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Dedicated organization support</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Advanced support from our staff experts and priority response timing
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        
  <span
    class="pricing-table-body__em-dash">&#8212;</span>



      </td>
    
  </tr>
</tbody>
<tr
  class="pricing-table-body__subhead-row">
  <th
    class="pricing-table-body__subhead-name-cell"
    scope="row">
    <b>PROFESSIONAL SERVICES</b>
  </th>
  
    <td
      class="
      pricing-table-body__cell
      
      ">

    </td>
  
</tr>
<tbody
  class="pricing-table-body__sub-section">
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Consultations with shopnotoolbox experts</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Regular consultations with senior staff from Kobo's team of experts to discuss potential optimizations, integrations, and more
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        
  <span
    class="pricing-table-body__em-dash">&#8212;</span>



      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Preview new features and shape the shopnotoolbox roadmap</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Opportunities to contribute your input to pre-release feature testing and software development planning
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        
  <span
    class="pricing-table-body__em-dash">&#8212;</span>



      </td>
    
  </tr>
</tbody>
  <tfoot>
      <tr class="pricing-table-single__read-more-row">
        <td colspan="2" class="pricing-table-single__read-more-cell">
          <input
            id="pricing-table-read-more--3"
            tableId="3"
            type="checkbox"
            onclick=toggleTableExpansion(event)
            class="pricing-table-single__read-more-input" />
          <label
            id="pricing-table-read-more-trigger--3"
            role="button"
            clickable
            tabindex="0"
            for="pricing-table-read-more--3"
            class="pricing-table-single__read-more-trigger"></label>
        </td>
      </tr>
      <tr class="pricing-table-single__cta-footer-row">
        <td colspan="2" class="pricing-table-single__cta-footer">
          
<a class="button button--size-m button--type-full button--color-blue" href="/sign-up/">Get started</a>

        </td>
      </tr>
</table>


  
  



<table
  id="pricing-table-single--4"
  class="
  pricing-table-single
  ">
  <colgroup>
    <col
      class="pricing-table-single--col1">
    <col
      class="pricing-table-single--col2" />
  </colgroup>
    <caption
  class="pricing-table-single-header-caption
  
  ">
      <div class="pricing-table-single-header-caption__name-container">
        <div class="pricing-table-single-header-caption__name">
          Enterprise
        </div>
        
      </div>
      <div class="pricing-table-single-header-caption__price-org pricing-table-single-header-caption__price-org--nonprofit">
        <div class="pricing-table-single-header-caption__price pricing-table-single-header-caption__price--monthly">
          <span>Contact us</span>
          
        </div>
        <div class="pricing-table-single-header-caption__price pricing-table-single-header-caption__price--annual">
          Contact us
          
        </div>
      </div>
      <div class="pricing-table-single-header-caption__price-org pricing-table-single-header-caption__price-org--other">
        <div class="pricing-table-single-header-caption__price pricing-table-single-header-caption__price--monthly">
          Contact us
          
        </div>
        <div class="pricing-table-single-header-caption__price pricing-table-single-header-caption__price--annual">
          Contact us
          
        </div>
      </div>
    <div class="pricing-table-single-header-caption__description">
      <span class="blech">Priority organization support and high volume data collection.</span>
    </div>

  <div class="pricing-table-single-header-caption__cta">
    
<a class="button button--size-m button--type-full button--color-blue" href="/contact/">Get in touch</a>

  </div>
</caption>

    

<tr
  class="pricing-table-body__subhead-row">
  <th
    class="pricing-table-body__subhead-name-cell"
    scope="row">
    <b>ESSENTIALS</b>
  </th>
  
    <td
      class="
      pricing-table-body__cell
      
      ">
    </td>
  
</tr>
<tbody
  class="pricing-table-body__sub-section pricing-table-body__essentials">
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Projects/Forms</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    The number of projects and forms you can create
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        Unlimited

      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Data collectors and collaborators</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    The number of data collectors (also known as enumerators) and other types of collaborators you can add to your projects
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        Unlimited

      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Survey submissions</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    The number of survey submissions that can be collected by the projects owned by your account
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        ">
          <span class="pricing-table-body__feature-value--monthly">
            Custom
          </span>
          <span class="pricing-table-body__feature-value--annual">
            Custom
          </span>
      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">File storage</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    The space available for storing photo, video, and audio files collected with your surveys
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        Unlimited

      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Online/offline data collection</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Collect data online and offline with our Android app or with web forms on all devices, including iOS and desktop
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        
  <svg
    class="pricing-table-body__checkmark">
    <use
      xlink:href="/assets/images/site/sprite.svg#check" />
  </svg>



      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Support our open source development</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Paid plans help fund the development of shopnotoolbox and ensure our software is accessible to as many users as possible
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        
  <svg
    class="pricing-table-body__checkmark">
    <use
      xlink:href="/assets/images/site/sprite.svg#check" />
  </svg>



      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Group access and teams</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Share your paid plan and additional limits with other users
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        Custom

      </td>
    
  </tr>
</tbody>
<tr
  class="pricing-table-body__subhead-row">
  <th
    class="pricing-table-body__subhead-name-cell"
    scope="row">
    <b>ADVANCED FEATURES</b>
  </th>
  
    <td
      class="
      pricing-table-body__cell
      
      ">

    </td>
  
</tr>
<tbody
  class="pricing-table-body__sub-section">
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Two-factor authentication</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Add an extra layer of security with a second identification step, authenticated with a mobile app or offline passcodes
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        
  <svg
    class="pricing-table-body__checkmark">
    <use
      xlink:href="/assets/images/site/sprite.svg#check" />
  </svg>



      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Single sign-on (SSO)</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Create and sign in to shopnotoolbox accounts using an existing user authentication method, such as Azure Active Directory
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        
  <svg
    class="pricing-table-body__checkmark">
    <use
      xlink:href="/assets/images/site/sprite.svg#check" />
  </svg>



      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Automatic speech-to-text transcription</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Create transcripts of audio files collected in different languages using automatic speech recognition
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        Custom

      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Machine translation of transcripts</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Create translations of transcripts in different languages using automated translation
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        Custom

      </td>
    
  </tr>
</tbody>
<tr
  class="pricing-table-body__subhead-row">
  <th
    class="pricing-table-body__subhead-name-cell"
    scope="row">
    <b>SUPPORT</b>
  </th>
  
    <td
      class="
      pricing-table-body__cell
      
      ">

    </td>
  
</tr>
<tbody
  class="pricing-table-body__sub-section">
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Vibrant Community Forum</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Ask questions, share answers, and collaborate to find solutions with thousands of shopnotoolbox users
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        
  <svg
    class="pricing-table-body__checkmark">
    <use
      xlink:href="/assets/images/site/sprite.svg#check" />
  </svg>



      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Self-serve learning base</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Find answers and resources in our extensive documentation, including tutorials and training videos
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        
  <svg
    class="pricing-table-body__checkmark">
    <use
      xlink:href="/assets/images/site/sprite.svg#check" />
  </svg>



      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Direct user support</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Get help from our professional support team
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        
  <svg
    class="pricing-table-body__checkmark">
    <use
      xlink:href="/assets/images/site/sprite.svg#check" />
  </svg>



      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Dedicated organization support</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Advanced support from our staff experts and priority response timing
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        
  <svg
    class="pricing-table-body__checkmark">
    <use
      xlink:href="/assets/images/site/sprite.svg#check" />
  </svg>



      </td>
    
  </tr>
</tbody>
<tr
  class="pricing-table-body__subhead-row">
  <th
    class="pricing-table-body__subhead-name-cell"
    scope="row">
    <b>PROFESSIONAL SERVICES</b>
  </th>
  
    <td
      class="
      pricing-table-body__cell
      
      ">

    </td>
  
</tr>
<tbody
  class="pricing-table-body__sub-section">
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Consultations with shopnotoolbox experts</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Regular consultations with senior staff from Kobo's team of experts to discuss potential optimizations, integrations, and more
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        
  <svg
    class="pricing-table-body__checkmark">
    <use
      xlink:href="/assets/images/site/sprite.svg#check" />
  </svg>



      </td>
    
  </tr>
  <tr
    class="pricing-table-body__feature-row">
    <th
      class="pricing-table-body__feature-name-cell"
      scope="row">
      

<div
  class="pricing-table-body__feature-name-content">
  <div
    class="pricing-table-body__feature-name-text">Preview new features and shape the shopnotoolbox roadmap</div>
  <div
  class="info-tooltip">
  <svg
    class="info-tooltip__icon"
    aria-label="info icon">
    <use
      xlink:href="/assets/images/site/sprite.svg#info" />
  </svg>
  <div
    class="info-tooltip__text-box">
    Opportunities to contribute your input to pre-release feature testing and software development planning
  </div>
</div>

</div>

    </th>
    
      <td
        class="
        pricing-table-body__cell
        
        ">

        
  <svg
    class="pricing-table-body__checkmark">
    <use
      xlink:href="/assets/images/site/sprite.svg#check" />
  </svg>



      </td>
    
  </tr>
</tbody>
  <tfoot>
      <tr class="pricing-table-single__read-more-row">
        <td colspan="2" class="pricing-table-single__read-more-cell">
          <input
            id="pricing-table-read-more--4"
            tableId="4"
            type="checkbox"
            onclick=toggleTableExpansion(event)
            class="pricing-table-single__read-more-input" />
          <label
            id="pricing-table-read-more-trigger--4"
            role="button"
            clickable
            tabindex="0"
            for="pricing-table-read-more--4"
            class="pricing-table-single__read-more-trigger"></label>
        </td>
      </tr>
      <tr class="pricing-table-single__cta-footer-row">
        <td colspan="2" class="pricing-table-single__cta-footer">
          
<a class="button button--size-m button--type-full button--color-blue" href="/contact/">Get in touch</a>

        </td>
      </tr>
</table>

</div>

  </div>
</div>
<div class="root__row root__row--light-blue">
  <div class="root__row-content">
    <section class="pricing-private-servers">
      <div class="pricing-private-servers__top-container">
        <div class="pricing-private-servers__cta">
          <h3 class="pricing-private-servers__cta-header">
            Dedicated private servers
          </h3>
          <p>
            For organizations seeking customizable and scalable solutions with
            unlimited data collection and enhanced security, we offer private
            shopnotoolbox servers.
          </p>
          <div class="pricing-private-servers__buttons">
            
<a class="button button--size-l button--type-full button--color-blue" href="/contact/">Get in touch</a>
 
<a class="button button--size-l button--type-frame button--color-blue" href="/services/private-servers/">Learn more</a>

          </div>
        </div>
        <div class="pricing-private-servers__bullet-points">
          <div class="pricing-private-servers__bullet">
            <div class="pricing-private-servers__bullet-icon-container">
              <svg class="pricing-private-servers__bullet-check">
                <use xlink:href="/assets/images/site/sprite.svg#circle-check" />
              </svg>
            </div>
            <div class="pricing-private-servers__bullet-text">
              Unlimited survey submissions, projects, and file storage
            </div>
          </div>
          <div class="pricing-private-servers__bullet">
            <div class="pricing-private-servers__bullet-icon-container">
              <svg class="pricing-private-servers__bullet-check">
                <use xlink:href="/assets/images/site/sprite.svg#circle-check" />
              </svg>
            </div>
            <div class="pricing-private-servers__bullet-text">
              Fully controlled and branded by your organization, maintained by
              our experts
            </div>
          </div>
          <div class="pricing-private-servers__bullet">
            <div class="pricing-private-servers__bullet-icon-container">
              <svg class="pricing-private-servers__bullet-check">
                <use xlink:href="/assets/images/site/sprite.svg#circle-check" />
              </svg>
            </div>
            <div class="pricing-private-servers__bullet-text">
              Enhanced oversight with custom project views and administrator
              control over data and users
            </div>
          </div>
          <div class="pricing-private-servers__bullet">
            <div class="pricing-private-servers__bullet-icon-container">
              <svg class="pricing-private-servers__bullet-check">
                <use xlink:href="/assets/images/site/sprite.svg#circle-check" />
              </svg>
            </div>
            <div class="pricing-private-servers__bullet-text">
              Customizable security settings for SSO integrations, MFA
              enforcement, data retention, session timeout, and more
            </div>
          </div>
        </div>
      </div>
      <div class="pricing-private-servers__orgs">
        <h2 class="pricing-private-servers__orgs-header">
          ORGANIZATIONS USING OUR PRIVATE SERVERS
        </h2>
        <div class="pricing-private-servers__org-icons">
          <load-file
            replaceWith
            src="/assets/images/partners/unocha.svg"
          ></load-file>
          <load-file
            replaceWith
            src="/assets/images/partners/ifrc.svg"
          ></load-file>
          <load-file
            replaceWith
            src="/assets/images/partners/savethechildren.svg"
          ></load-file>
          <load-file
            replaceWith
            src="/assets/images/partners/iom.svg"
          ></load-file>
          <load-file
            replaceWith
            src="/assets/images/partners/acf.svg"
          ></load-file>
        </div>
      </div>
    </section>
  </div>
</div>



<script>
  const expandInitialAnchor = () => {
    if (!location.hash) {
      return;
    }
    const id = location.hash.replace('#', '');


    if (question) {
      updateQuestions(question);
      document.getElementById(id).scrollIntoView();
    }
  };

  const scrollBetweenQuestions = (event, id) => {
    event.preventDefault();
    const parentPath = 'pricing';



    updateQuestions(targetQuestion);

    const targetAnchor = document.getElementById(id);
    const currentAnswer = event.currentTarget.closest('.faq__answer-content');
    const currentAnswerY = currentAnswer.getBoundingClientRect().top;
    const targetAnchorY = targetAnchor.getBoundingClientRect().top;
    const currentAnswerOffset =
      currentAnswerY < targetAnchorY ? currentAnswer.scrollHeight : 0;

    window.scrollTo({
      top:
        targetAnchor.getBoundingClientRect().top +
        window.pageYOffset -
        80 -
        currentAnswerOffset,
    });
  };

  const updateQuestions = (question) => {
    const questionBlocks = Array.from(
      document.getElementsByClassName('faq__question-block')
    );

    const previousState = question.selected;

    questionBlocks.forEach((block) => {
      block.querySelector('.faq__expansion-toggle').selected = false;
    });

    question.selected = !previousState;

    questionBlocks.forEach((block) => {
      const question = block.querySelector('.faq__expansion-toggle');
      const answer = block.querySelector('.faq__answer');
      const answerContent = block.querySelector('.faq__answer-content');

      if (question.selected) {
        question.classList.add('faq__expansion-toggle--expanded');
        answer.style.height = answerContent.scrollHeight + 'px';
      } else {
        question.classList.remove('faq__expansion-toggle--expanded');
        answer.style.height = null;
      }
    });
  };

  document.addEventListener(
    'DOMContentLoaded',
    function (e) {
      const questionBlocks = Array.from(
        document.getElementsByClassName('faq__question-block')
      );

      questionBlocks.forEach((question) => {
        question
          .querySelector('.faq__expansion-toggle')
          .addEventListener('click', function (e) {
            updateQuestions(e.target);
          });
      });
    },
    {once: true}
  );

  //TODO: Find a document listener event to add this to
  window.onload = expandInitialAnchor;
</script>


<div class="root__row">
  <div class="root__row-content">
    <section class="faq">
      <div class="faq__header">
        <h3 id="faq" 
        class="faq__sticky-header">
        Frequently asked questions
        </h3>
      </div>
      <div class="faq__content">

        
  <div class="faq__subhead">Main FAQs</div>

<div class="faq__question-section-container">

  
  
   
  <div class="faq__question-block">
  <input
    type="button"
    id="faq-toggle-free"
    class="faq__expansion-toggle"
  />
  <label tabindex="0" clickable for="faq-toggle-free">
    <h4 id="free">Is there a free version of shopnotoolbox?</h4>
    <div class="faq__toggle-sign"></div>
  </label>
  <div id="faq-toggle-free-answer" class="faq__answer">
    <div class="faq__answer-content">
      
  <p>
    For all of our <a onclick="scrollBetweenQuestions(event, 'nonprofit')" href="/pricing/#nonprofit">nonprofit users</a>,
    shopnotoolbox is available for free under the Community Plan, a powerful and popular option
    that covers the vast majority of data collection needs. This plan includes 5,000
    survey submissions per month and 1GB of file storage at no cost. Additionally, it
    provides you with an unlimited number of projects and forms, monthly
    quotas for automatic speech recognition and machine translation for
    audio files, full access to our extensive support documentation, and
    much more.
  </p>
  <p>
    Users who require more data storage, more survey submissions, or
    more features can upgrade to our Professional Plan at any time.
  </p>
  
    </div>
  </div>
</div>


  
  

   
  <div class="faq__question-block">
  <input
    type="button"
    id="faq-toggle-upgrade"
    class="faq__expansion-toggle"
  />
  <label tabindex="0" clickable for="faq-toggle-upgrade">
    <h4 id="upgrade">What if I want to collect more submissions than are included with my current plan?</h4>
    <div class="faq__toggle-sign"></div>
  </label>
  <div id="faq-toggle-upgrade-answer" class="faq__answer">
    <div class="faq__answer-content">
      
    <p>
      If you need to collect more submissions than are included with your current plan,
      you can <a onclick="scrollBetweenQuestions(event, 'enroll')" href="/pricing/#enroll">upgrade your account</a> at any point.
      Upgrading to a paid plan gives you access to more media file storage, higher quotas for automatic transcription and machine
      translation, and advanced support options. Users on plans with file storage limits can access account add-ons to increase
      their file storage.
    </p>
    <p>
      To discuss updates to multiple accounts or an Enterprise Plan for your organization,
      <a href="/contact/">get in touch</a> with our team.
    </p>
  
    </div>
  </div>
</div>


  
  
   
  <div class="faq__question-block">
  <input
    type="button"
    id="faq-toggle-cost"
    class="faq__expansion-toggle"
  />
  <label tabindex="0" clickable for="faq-toggle-cost">
    <h4 id="cost">How much does it cost to create a shopnotoolbox account?</h4>
    <div class="faq__toggle-sign"></div>
  </label>
  <div id="faq-toggle-cost-answer" class="faq__answer">
    <div class="faq__answer-content">
      
    <p>
      For all of our <a onclick="scrollBetweenQuestions(event, 'nonprofit')" href="/pricing/#nonprofit">nonprofit users</a>, shopnotoolbox is available
      for free under the Community Plan, which includes 5,000 survey submissions per month and
      1GB of file storage. 
    </p>
    <p>
      Users who require more data storage, more survey submissions, or more features can upgrade
      to our Professional Plan at any time.
    </p>
    <p>
      For users who do not qualify for our nonprofit plans, we offer a range of 
      <a onclick="scrollBetweenQuestions(event, 'other-orgs')" href="/pricing/#other-orgs">other paid plans</a>. As a nonprofit organization, 
      <a href="https://shopnoltd.kesug.com/about-us/the-organization/">Kobo</a> cannot provide the
      use of shopnotoolbox for free to any for-profit organizations, private companies,
      or for personal use.
    </p>
    <p>
      To discuss an Enterprise Plan for your organization, <a href="/contact/">get in touch</a>
      with our team.
    </p>
  
    </div>
  </div>
</div>

  
  
  
   
  <div class="faq__question-block">
  <input
    type="button"
    id="faq-toggle-payment-options"
    class="faq__expansion-toggle"
  />
  <label tabindex="0" clickable for="faq-toggle-payment-options">
    <h4 id="payment-options">What payment options are available?</h4>
    <div class="faq__toggle-sign"></div>
  </label>
  <div id="faq-toggle-payment-options-answer" class="faq__answer">
    <div class="faq__answer-content">
      
    <p>
      You can easily pay online through your shopnotoolbox account via
      Stripe, our secure payment processor. Payments for monthly and
      annual plans are automatically charged to the credit card on file
      on the first day of each billing cycle. Annual plans can also be
      paid by invoice or bank transfer. Plans can be canceled at any
      point, effective at the end of each billing cycle.
    </p>
    <p>
      For information about pricing and payments for Enterprise Plans,
      please <a href="/contact/">contact our team</a>.
    </p>
  
    </div>
  </div>
</div>

  
  
  
   
  <div class="faq__question-block">
  <input
    type="button"
    id="faq-toggle-professional-plan"
    class="faq__expansion-toggle"
  />
  <label tabindex="0" clickable for="faq-toggle-professional-plan">
    <h4 id="professional-plan">What is included with the Professional Plan?</h4>
    <div class="faq__toggle-sign"></div>
  </label>
  <div id="faq-toggle-professional-plan-answer" class="faq__answer">
    <div class="faq__answer-content">
      
    <p>
      Our Professional Plan offers more data collection, more media file storage,
      and higher speech recognition and machine translation quotas. Professional Plan
      users also have access to our dedicated support team for time-sensitive responses
      to technical questions and troubleshooting.
    </p>
    <p>
      Plans are available on a <a onclick="scrollBetweenQuestions(event, 'monthly-annual')" href="/pricing/#monthly-annual">monthly or annual basis</a>. 
      You can easily <a onclick="scrollBetweenQuestions(event, 'enroll')" href="/pricing/#enroll">enroll in a plan</a> at any time.
    </p>
  
    </div>
  </div>
</div>


  
  
   
  <div class="faq__question-block">
  <input
    type="button"
    id="faq-toggle-services"
    class="faq__expansion-toggle"
  />
  <label tabindex="0" clickable for="faq-toggle-services">
    <h4 id="services">What other solutions are available for my organization?</h4>
    <div class="faq__toggle-sign"></div>
  </label>
  <div id="faq-toggle-services-answer" class="faq__answer">
    <div class="faq__answer-content">
      
    <p>
      In addition to the free nonprofit Community Plan and high volume paid plans, Kobo also
      offers <a href="/services/private-servers/">private servers for large organizations</a>
      and <a href="/services/">consulting services</a> for mission-critical projects, such as
      training, custom dashboards, or project rollout support.
    </p>
  
    </div>
  </div>
</div>


</div>

<div class="faq__subhead">Signing up for a plan</div>

<div class="faq__question-section-container">
  
  
   
  <div class="faq__question-block">
  <input
    type="button"
    id="faq-toggle-enroll"
    class="faq__expansion-toggle"
  />
  <label tabindex="0" clickable for="faq-toggle-enroll">
    <h4 id="enroll">How do I enroll in a paid plan?</h4>
    <div class="faq__toggle-sign"></div>
  </label>
  <div id="faq-toggle-enroll-answer" class="faq__answer">
    <div class="faq__answer-content">
      
    <p>
      You can enroll in a new plan directly from the Plans page within
      your account. To upgrade now, go to either the
      <a href="https://shopnoltd.kesug.com/#/account/plan"
        >plans page on the Global Server</a
      >
      or the
      <a href="https://shopnoltd.kesug.com/#/account/plan"
        >plans page on the European Union Server</a
      >
    , depending on which server you used to create your account. You
      can then select a monthly or annual billing cycle. Once you have
      added your payment details to your account, future payments will
      automatically be charged to the credit card on file on the first
      day of each billing cycle.
    </p>
    <p>
      To discuss upgrading multiple accounts or to learn more about
      an Enterprise Plan for your organization,
      <a href="/contact/">get in touch</a> with our team.
    </p>
  
    </div>
  </div>
</div>


  
  
   
  <div class="faq__question-block">
  <input
    type="button"
    id="faq-toggle-discounts"
    class="faq__expansion-toggle"
  />
  <label tabindex="0" clickable for="faq-toggle-discounts">
    <h4 id="discounts">Are discounts available for nonprofit organizations and students?</h4>
    <div class="faq__toggle-sign"></div>
  </label>
  <div id="faq-toggle-discounts-answer" class="faq__answer">
    <div class="faq__answer-content">
      
    <p>
      We offer shopnotoolbox for free under the nonprofit
      <a href="#free">Community Plan</a>
      to anyone working for or associated with a nonprofit organization,
      including students and staff at educational institutions,
      government agencies, international organizations, and other charitable
      organizations that operate on a nonprofit basis. These users also
      benefit from reduced pricing for account upgrades.
    </p>
    <p>
      For more information about eligibility for nonprofit plans, please see
      <a onclick="scrollBetweenQuestions(event, 'nonprofit')" href="/pricing/#nonprofit">Who qualifies for the nonprofit pricing plans?</a>.
    </p>
  
    </div>
  </div>
</div>


  
  
   
  <div class="faq__question-block">
  <input
    type="button"
    id="faq-toggle-groups"
    class="faq__expansion-toggle"
  />
  <label tabindex="0" clickable for="faq-toggle-groups">
    <h4 id="groups">Are discounts available for teams or organizations?</h4>
    <div class="faq__toggle-sign"></div>
  </label>
  <div id="faq-toggle-groups-answer" class="faq__answer">
    <div class="faq__answer-content">
      
    <p>
      To discuss plans and upgrades for multiple accounts or an
      Enterprise Plan for your organization, please
      <a href="/contact">get in touch</a> so we can find the best solution
      for your needs.
    </p>
  
    </div>
  </div>
</div>


  
  
   
  <div class="faq__question-block">
  <input
    type="button"
    id="faq-toggle-nonprofit"
    class="faq__expansion-toggle"
  />
  <label tabindex="0" clickable for="faq-toggle-nonprofit">
    <h4 id="nonprofit">Who qualifies for the nonprofit pricing plans?</h4>
    <div class="faq__toggle-sign"></div>
  </label>
  <div id="faq-toggle-nonprofit-answer" class="faq__answer">
    <div class="faq__answer-content">
      
    <p>
      Our nonprofit pricing plans are specifically designed for organizations whose
      purpose is to serve the public good and not to generate profits. If you work for
      any nonprofit organization, are associated with a nonprofit as a volunteer or
      intern, or are registered as a student, you are eligible to use any of our nonprofit
      plans, including the free <a onclick="scrollBetweenQuestions(event, 'free')" href="/pricing/#free">Community Plan</a>. 
    </p>
    <p>
      The following categories of organizations are eligible for nonprofit plans:
    </p>
    <ul>
      <li>
        <b>Nonprofits:</b> Any legally registered nonprofit organization whose purpose is to
        serve the public good and not to generate profits (e.g., charities, social welfare
        organizations, Red Cross and Red Crescent Societies, local nonprofit organizations,
        cooperatives, and community-serving groups).
      </li>
      <li>
        <b>Government:</b> Local, state, and federal government agencies that serve the public
        and do not generate profits.
      </li>
      <li>
        <b>International organizations:</b> United Nations organizations, inter-governmental
        organizations, and other international nonprofit entities.
      </li>
      <li>
        <b>Educational institutions:</b> Schools, colleges, and universities that are not operated for
        profit (e.g., public schools, state-funded universities, and private schools or universities
        operating on a nonprofit basis).
      </li>
    </ul>
    <p>
      Our nonprofit eligibility criteria ensure that social impact organizations working in humanitarian action,
      development, environmental protection, education, and other sectors that serve the public good can access
      the Community Plan for free as well as plan upgrades at reduced cost. Learn more about
      <a href="/about-us/our-mission/">our mission</a> to support data collection for these organizations.
    </p>
  
    </div>
  </div>
</div>

  
  
  
   
  <div class="faq__question-block">
  <input
    type="button"
    id="faq-toggle-other-orgs"
    class="faq__expansion-toggle"
  />
  <label tabindex="0" clickable for="faq-toggle-other-orgs">
    <h4 id="other-orgs">What pricing plans are available for users who are not associated with nonprofits?</h4>
    <div class="faq__toggle-sign"></div>
  </label>
  <div id="faq-toggle-other-orgs-answer" class="faq__answer">
    <div class="faq__answer-content">
      
    <p>
      For organizations and users that do not match our <a onclick="scrollBetweenQuestions(event, 'nonprofit')" href="/pricing/#nonprofit">nonprofit definition</a>, we offer a range
      of other paid plans, from Starter to Enterprise. These plans are designed specifically for organizations
      and users who use shopnotoolbox for private or for-profit purposes, including the following categories:
    </p>
    <ul>
      <li>
        <b>For-profit organizations:</b> Any organization whose primary purpose is to generate profits (e.g., businesses,
        companies, corporations, partnerships, and sole proprietorships).
      </li>
      <li>
        <b>Private companies:</b> Privately owned companies, businesses, or other entities whose primary purpose is to
        generate profits.
      </li>
      <li>
        <b>Personal use:</b> Individual users who are not affiliated with a nonprofit organization and do not qualify for
        the nonprofit pricing plans.
      </li>
    </ul>
    <p>
      As a nonprofit organization, <a href="/about-us/the-organization/">Kobo</a> cannot provide the use of shopnotoolbox for
      free to any for-profit organizations, private companies, or for personal use.
    </p>
    <p>
      For any additional questions related to the different pricing plans and the nonprofit eligibility criteria, please 
      <a href="/contact">contact our team</a>.
    </p>
  
    </div>
  </div>
</div>

</div>

<div class="faq__subhead">Payments and billing</div>

<div class="faq__question-section-container">

  
  
  
  <div class="faq__question-block">
  <input
    type="button"
    id="faq-toggle-invoice"
    class="faq__expansion-toggle"
  />
  <label tabindex="0" clickable for="faq-toggle-invoice">
    <h4 id="invoice">Will I receive an invoice?</h4>
    <div class="faq__toggle-sign"></div>
  </label>
  <div id="faq-toggle-invoice-answer" class="faq__answer">
    <div class="faq__answer-content">
      
    <p>
      Yes, after you have enrolled in your new plan and the payment has been processed, you will receive an email with
      your invoice and payment receipt. Invoices and receipts can also be downloaded directly from your account. In your
      account settings, go to the Plans page and click Manage below your plan to access the billing portal. In the billing
      portal, go to the Invoice History section and click on the invoice you wish to download.
    </p>
    <p>
      All prices and payments on your invoice are in USD. Currency conversions are handled by our payment processor, Stripe.
      <a href="https://stripe.com/docs/currencies/conversions">Learn more</a> about how Stripe handles currency conversions.
    </p>
    <p>
      For any questions about invoices, please <a href="/contact">contact our support team</a>.
    </p>
  
    </div>
  </div>
</div>


  
  
  
  <div class="faq__question-block">
  <input
    type="button"
    id="faq-toggle-credit-card"
    class="faq__expansion-toggle"
  />
  <label tabindex="0" clickable for="faq-toggle-credit-card">
    <h4 id="credit-card">Can I change the credit card I use for billing?</h4>
    <div class="faq__toggle-sign"></div>
  </label>
  <div id="faq-toggle-credit-card-answer" class="faq__answer">
    <div class="faq__answer-content">
      
    <p>
      Yes, you can easily change the credit card used for billing. In your account settings, go to the Plans page and
      click Manage below your plan to access the billing portal. In the billing portal, add the new credit card
      information in your Payment Methods. Future payments will then use the new credit card.
    </p>
    <p>
      If you have any additional questions about billing, please <a href="/contact">contact our team</a>.
    </p>
  
    </div>
  </div>
</div>


  
  
  
  <div class="faq__question-block">
  <input
    type="button"
    id="faq-toggle-invoice-name"
    class="faq__expansion-toggle"
  />
  <label tabindex="0" clickable for="faq-toggle-invoice-name">
    <h4 id="invoice-name">Can the invoice be made out to my organization or company?</h4>
    <div class="faq__toggle-sign"></div>
  </label>
  <div id="faq-toggle-invoice-name-answer" class="faq__answer">
    <div class="faq__answer-content">
      
    <p>
      Yes, you can change the name on your invoice through your account settings. Invoices automatically include your
      name as entered in the “Full name” field in your account profile. To have the invoice made out to your organization
      or company, enter the organization or company name in the “Full name” field in your account profile. You can then
      download your invoice through the billing portal. 
    </p>
    <p>
      If you require support with invoices, <a href="/contact">get in touch with our team</a>.
    </p>
  
    </div>
  </div>
</div>


</div>

<div class="faq__subhead">Usage</div>

<div class="faq__question-section-container">
  
  
  
  <div class="faq__question-block">
  <input
    type="button"
    id="faq-toggle-usage"
    class="faq__expansion-toggle"
  />
  <label tabindex="0" clickable for="faq-toggle-usage">
    <h4 id="usage">How can I check my usage?</h4>
    <div class="faq__toggle-sign"></div>
  </label>
  <div id="faq-toggle-usage-answer" class="faq__answer">
    <div class="faq__answer-content">
      
    <p>
      You can easily keep track of your usage on the Usage page in your account. To check your usage, you can also go
      directly to the <a href="https://shopnoltd.kesug.com/#/account/usage">Usage page on the Global Server</a> or the
      <a href="https://shopnoltd.kesug.com/#/account/usage">Usage page on the European Union Server</a>,
      depending on which server you used to create your account.
    </p>
    <p>
      You will also be alerted via notifications in your account when you are approaching your usage limit. To increase
      your usage limits, you can <a onclick="scrollBetweenQuestions(event, 'enroll')" href="/pricing/#enroll">upgrade your plan</a> at any time.
    </p>
  
    </div>
  </div>
</div>


  
  
   
  <div class="faq__question-block">
  <input
    type="button"
    id="faq-toggle-limit-reached"
    class="faq__expansion-toggle"
  />
  <label tabindex="0" clickable for="faq-toggle-limit-reached">
    <h4 id="limit-reached">What happens if I reach my usage limits?</h4>
    <div class="faq__toggle-sign"></div>
  </label>
  <div id="faq-toggle-limit-reached-answer" class="faq__answer">
    <div class="faq__answer-content">
      
    <p>
      When you are approaching any of your usage limits, you will receive a notification in your account. You will
      receive another notification when you have reached a usage limit. If you exceed your storage or submissions limit, you will still be able to use all aspects of the tool, including data exports. In the future, restrictions may be enforced on collecting new submissions once the storage or submission limit has been reached.  
    </p>
    <p>
      To avoid any interruptions in data collection, we strongly recommend that you 
      <a onclick="scrollBetweenQuestions(event, 'enroll')" href="/pricing/#enroll">upgrade your plan</a> when you are approaching your limit.
    </p>
    <p>
      For our free nonprofit Community Plan, the usage limits for survey submissions, automatic transcription minutes,
      and machine translation characters reset on the first day of every month. This means your usage quota for
      these features is renewed at the beginning of each month. For all paid plans, usage limits reset at the
      beginning of each new billing cycle. This means that if you are on a monthly plan, your usage quotas will reset
      once per month. If you are on an annual plan, your usage quotas will reset once per year.
    </p>
    <p>
      Our Professional and Enterprise Plans have unlimited file storage. The Starter and Community Plans have
      fixed storage limits. You can lower your storage usage by deleting submissions or projects from your account.
      Please ensure that you download any important data before deleting it from your account.
    </p>
    <p>
      If you require more usage than is included with your plan, you can
      <a onclick="scrollBetweenQuestions(event, 'enroll')" href="/pricing/#enroll">upgrade at any time</a>
      or <a href="/contact">contact us</a> to discuss a custom solution for your organization.
    </p>
  
    </div>
  </div>
</div>


  
  
   
  <div class="faq__question-block">
  <input
    type="button"
    id="faq-toggle-shared"
    class="faq__expansion-toggle"
  />
  <label tabindex="0" clickable for="faq-toggle-shared">
    <h4 id="shared">Do shared projects count towards my usage limits?</h4>
    <div class="faq__toggle-sign"></div>
  </label>
  <div id="faq-toggle-shared-answer" class="faq__answer">
    <div class="faq__answer-content">
      
    <p>
      Only the usage for projects that you own will count towards your usage limits. If you are the owner of a
      project, all submissions, storage, and transcription and translation usage for the project will count
      towards your usage. If you share your project with other users, any data they collect for the project
      will count towards your limit because you are the project owner.
    </p>
    <p>
      Usage for projects that have been shared with you by another user will not count towards your usage and
      will not appear in your <a onclick="scrollBetweenQuestions(event, 'usage')" href="/pricing/#usage">Usage page</a>.
    </p>
  
    </div>
  </div>
</div>


</div>

<div class="faq__subhead">Managing your plan</div>

<div class="faq__question-section-container">

  
  
   
  <div class="faq__question-block">
  <input
    type="button"
    id="faq-toggle-monthly-annual"
    class="faq__expansion-toggle"
  />
  <label tabindex="0" clickable for="faq-toggle-monthly-annual">
    <h4 id="monthly-annual">Can I change my plan from a monthly plan to an annual plan? Or vice versa?</h4>
    <div class="faq__toggle-sign"></div>
  </label>
  <div id="faq-toggle-monthly-annual-answer" class="faq__answer">
    <div class="faq__answer-content">
      
    <p>
      Yes, you can change your plan from a monthly plan to an annual plan, or vice versa, at any time.
      To change your plan option, go to the Plans page in your account settings and click Manage below
      your plan. In the billing portal, select Update plan and then choose either the monthly or
      annual plan option.
    </p>
    <p>
      If you are on a monthly plan and change to an annual plan, you will be charged the price of the
      annual plan minus the prorated amount of your monthly plan. The full rate of the annual plan will
      then be charged at the beginning of your next billing cycle.
    </p>
    <p>
      If you choose to switch from an annual plan to a monthly plan, the monthly rate will automatically
      take effect at the beginning of your next billing cycle.
    </p>
  
    </div>
  </div>
</div>


  
  
   
  <div class="faq__question-block">
  <input
    type="button"
    id="faq-toggle-renew"
    class="faq__expansion-toggle"
  />
  <label tabindex="0" clickable for="faq-toggle-renew">
    <h4 id="renew">How do I renew my plan?</h4>
    <div class="faq__toggle-sign"></div>
  </label>
  <div id="faq-toggle-renew-answer" class="faq__answer">
    <div class="faq__answer-content">
      
    <p>
      The free nonprofit Community Plan will automatically renew indefinitely. All paid plans will also renew
      automatically. Payments for monthly and annual plans are automatically charged to the payment method
      on file on the first day of each billing cycle.
    </p>
  
    </div>
  </div>
</div>


  
  
   
  <div class="faq__question-block">
  <input
    type="button"
    id="faq-toggle-change-plan"
    class="faq__expansion-toggle"
  />
  <label tabindex="0" clickable for="faq-toggle-change-plan">
    <h4 id="change-plan">What if I need to cancel or change my plan?</h4>
    <div class="faq__toggle-sign"></div>
  </label>
  <div id="faq-toggle-change-plan-answer" class="faq__answer">
    <div class="faq__answer-content">
      
    <p>
      If for any reason your plan is not meeting your needs, <a href="/contact">please contact us</a>. We'll work
      with you to find a solution. You can also <a onclick="scrollBetweenQuestions(event, 'enroll')" href="/pricing/#enroll">upgrade your plan</a> at any time directly from
      the Plans page within your account.
    </p>
    <p>
      To cancel your plan and stop automatic renewals, go to the Plans page in your account settings, then click
      Manage below your plan. In the billing portal, select Cancel plan. Cancellations take effect at the end of
      the current billing cycle. You will continue to have access to your account within the limits of your plan
      until the cancellation takes effect. Nonprofit users who cancel a paid plan will revert back to the free
      <a onclick="scrollBetweenQuestions(event, 'free')" href="/pricing/#free">Community Plan</a>.
    </p>
  
    </div>
  </div>
</div>


  
  
   
  <div class="faq__question-block">
  <input
    type="button"
    id="faq-toggle-cancel-plan"
    class="faq__expansion-toggle"
  />
  <label tabindex="0" clickable for="faq-toggle-cancel-plan">
    <h4 id="cancel-plan">What happens to my data and files if I cancel my paid plan?</h4>
    <div class="faq__toggle-sign"></div>
  </label>
  <div id="faq-toggle-cancel-plan-answer" class="faq__answer">
    <div class="faq__answer-content">
      
    <p>If you are a <a onclick="scrollBetweenQuestions(event, 'nonprofit')" href="/pricing/#nonprofit">nonprofit user</a> and cancel a paid plan, you
      will be reverted back to the free nonprofit <a onclick="scrollBetweenQuestions(event, 'free')" href="/pricing/#free">Community Plan</a>. All
      of your data will continue to be accessible through your account. For example, if you were on the nonprofit
      Professional Plan and collected 30,000 submissions with your projects, you will still be able to access,
      download, edit, and analyze all of your project data after canceling your paid plan. You can also continue
      collecting data within the limits of the free Community Plan, which includes 5,000 survey submissions per
      month and unlimited projects.
    </p>
    <p>
      For nonprofit users, please be aware that the free Community Plan has a storage limit of 1 GB. To avoid any
      interruptions in data collection, you may need to lower your storage usage by deleting submissions or projects
      from your account before canceling your paid plan. Please ensure that you download any important data before
      deleting it from your account.
    </p>
    <p>
      If you are on a <a onclick="scrollBetweenQuestions(event, 'other-orgs')" href="/pricing/#other-orgs">for-profit or private use plan</a>,
      you will continue to have access to your account until the cancellation takes effect. Once the cancellation
      takes effect, you will no longer be able to collect new data and you may lose access to previously collected data.
    </p>
  
    </div>
  </div>
</div>


</div>

<div class="faq__subhead">Add-ons for additional usage</div>

<div class="faq__question-section-container">

  
  
   
  <div class="faq__question-block">
  <input
    type="button"
    id="faq-toggle-account-add-ons"
    class="faq__expansion-toggle"
  />
  <label tabindex="0" clickable for="faq-toggle-account-add-ons">
    <h4 id="account-add-ons">What are account add-ons?</h4>
    <div class="faq__toggle-sign"></div>
  </label>
  <div id="faq-toggle-account-add-ons-answer" class="faq__answer">
    <div class="faq__answer-content">
      
    <p>
      Account add-ons are packages that you can add to your current plan to increase your usage limits.
      Add-ons can be added to your plan at any time. If you are approaching or have reached the usage limits
      included with your plan, you can purchase add-ons for additional usage. To avoid any interruptions
      in data collection, we recommend that add-ons be purchased before you reach your limit.
    </p>
    <p>
      Add-ons are especially useful if you need to temporarily increase your usage or only need to increase
      your usage by a certain amount. For ongoing or long-term high volume data collection, we recommend
      upgrading your plan. <a href="/contact">Contact our team</a> to discuss the best
      solution for your needs.
    </p>
  
    </div>
  </div>
</div>


  
  
   
  <div class="faq__question-block">
  <input
    type="button"
    id="faq-toggle-available-add-ons"
    class="faq__expansion-toggle"
  />
  <label tabindex="0" clickable for="faq-toggle-available-add-ons">
    <h4 id="available-add-ons">What add-ons are available?</h4>
    <div class="faq__toggle-sign"></div>
  </label>
  <div id="faq-toggle-available-add-ons-answer" class="faq__answer">
    <div class="faq__answer-content">
      
    <p>
      Currently, users on the Starter and Community Plans can choose to increase their file storage limit with storage add-ons.
      Add-ons are available for either 5 GB, 10 GB, or 20 GB of storage.
    </p>
    <p>
      When you purchase a file storage add-on, your storage limit will become the amount of the package purchased. For example, if the default file storage for your plan is 1 GB, when you purchase a 10 GB add-on, your new storage limit will be 10 GB.
    </p>
  
    </div>
  </div>
</div>


  
  
   
  <div class="faq__question-block">
  <input
    type="button"
    id="faq-toggle-purchase-add-ons"
    class="faq__expansion-toggle"
  />
  <label tabindex="0" clickable for="faq-toggle-purchase-add-ons">
    <h4 id="purchase-add-ons">How do add-ons work?</h4>
    <div class="faq__toggle-sign"></div>
  </label>
  <div id="faq-toggle-purchase-add-ons-answer" class="faq__answer">
    <div class="faq__answer-content">
      
    <p>
      When you purchase an add-on, it will take effect immediately. The add-on package will
      automatically renew and reset your usage at the beginning of each monthly or annual billing cycle
      depending on your plan.
    </p>
    <p>
      When you purchase a file storage add-on, your storage limit will become the amount of the package purchased.
      For example, if a user with 1 GB of file storage on the Community Plan purchases a 10 GB storage add-on,
      their new file storage limit will be 10 GB.
    </p>
    <p>
      If you require more file storage than the available add-ons, you may wish to upgrade to a Professional Plan,
      or <a href="/contact">get in touch</a> to discuss an Enterprise Plan for your organization. 
    </p>
  
    </div>
  </div>
</div>


  
  
   
  <div class="faq__question-block">
  <input
    type="button"
    id="faq-toggle-manage-add-ons"
    class="faq__expansion-toggle"
  />
  <label tabindex="0" clickable for="faq-toggle-manage-add-ons">
    <h4 id="manage-add-ons">How can I add account add-ons?</h4>
    <div class="faq__toggle-sign"></div>
  </label>
  <div id="faq-toggle-manage-add-ons-answer" class="faq__answer">
    <div class="faq__answer-content">
      
    <p>
      You can purchase add-ons directly from within your account. In your account settings, go to the Plans
      page and scroll down to view the Add-ons section. You can then choose the add-on you wish to enroll in.
    </p>
    <p>
      You can pay online through your shopnotoolbox account via Stripe, our secure payment processor.
      All major credit cards are accepted.
    </p>
    <p>
      The add-on package will automatically renew and reset your usage at the beginning of each monthly or
      annual billing cycle depending on your plan. Payments will automatically be charged to the credit card on file.
    </p>
    <p>
      You can stop automatic renewals or cancel your add-on at any time directly from within your account.
      Cancellations take effect at the end of the current billing cycle.
    </p>
  
    </div>
  </div>
</div>


</div>



      </div>
    </section>
  </div>
</div>

</main>

<footer class="root__footer">
  <div class="root__row">
    <div class="root__row-content root__row-content--wide">
      <div class="footer-nav__container">
  <nav class="footer-nav">
    <div class="footer-nav__block footer-nav__menu">
      <ul class="footer-nav-menu__row">
        <label>Organization</label>

        
          <li>
            <a href="/about-us/">About us</a>
          </li>
        
          <li>
            <a href="/about-us/meet-the-team/">Team</a>
          </li>
        
          <li>
            <a href="/join-our-team">Jobs</a>
          </li>
        
          <li>
            <a href="/about-us/financials/">Financials</a>
          </li>
        
          <li>
            <a href="/contact/">Contact</a>
          </li>
        
      </ul>

      <ul class="footer-nav-menu__row">
        <label>Software</label>

        
          <li>
            <a href="https://academy.shopnotoolbox.org/collections">Online learning</a>
          </li>
        
          <li>
            <a href="/about-us/software">About shopnotoolbox</a>
          </li>
        
          <li>
            <a href="/features">Features</a>
          </li>
        
          <li>
            <a href="/pricing">Pricing</a>
          </li>
        
          <li>
            <a href="/services/private-servers">Private servers</a>
          </li>
        
          <li>
            <a href="/services">Services</a>
          </li>
        
      </ul>

      <ul class="footer-nav-menu__row">
        <label>Community</label>

        
          <li>
            <a href="https://community.shopnotoolbox.org/">Forum</a>
          </li>
        
          <li>
            <a href="https://support.shopnotoolbox.org/">Documentation</a>
          </li>
        
          <li>
            <a href="/donate">Donate</a>
          </li>
        
      </ul>
    </div>

    <div class="footer-nav__block">
      <section class="footer-nav__newsletter">
        <h3>Stay up<br/>to date.</h3>

        <p>Subscribe to our shopnotoolbox Updates newsletter to be the first to learn about new features, resources, and user impact stories from around the world.</p>

        <section class="newsletter-form-wrapper">
  <script charset="utf-8" type="text/javascript" src="https://js.hsforms.net/forms/shell.js"></script>
  <script>
    hbspt.forms.create({
      region: "na1",
      portalId: "21396257",
      formId: "16b9634b-3ea9-4539-9ec2-b83d4125e24c"
  });
  </script>
</section>
      </section>

      <section class="footer-nav__social">
        <nav>
          
            <li>
              <a href="https://www.facebook.com/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/facebook.svg"></load-file>
              </a>
            </li>
          
            <li>
              <a href="https://twitter.com/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/twitter.svg"></load-file>
              </a>
            </li>
          
            <li>
              <a href="https://www.linkedin.com/company/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/linkedin.svg"></load-file>
              </a>
            </li>
          
            <li>
              <a href="https://github.com/shopnotoolbox">
                <load-file replaceWith src="/assets/images/social-icons/github.svg"></load-file>
              </a>
            </li>
          
        </nav>

        <div>
          <a class="footer-nav__logo" href="/">
            <img src="/assets/images/site/shopnotoolbox-logo-borderless.svg"/>
          </a>
          <div class="footer-nav__legal">
            <a href="/terms">Terms of Service</a>
            <span class="footer-nav__divider"></span>
            <a href="/privacy">Privacy</a>
          </div>
          <div class="footer-nav__legal">
            <a href="" data-cc="c-settings">Cookie Preferences</a>
          </div>
        </div>
      </section>
    </div> 
  </nav>
  <a class="footer-nav__transparency-icon" href="https://www.guidestar.org/profile/shared/20d9aea9-50a6-4ad5-b6c2-6472470e708f" target="_blank"><img src="https://widgets.guidestar.org/TransparencySeal/9868102" /></a>
  <div class="footer-nav__copyright">Website content is licensed under a <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank">CC-BY-NC license</a>, unless noted otherwise.</div>
</div>
    </div>
  </div>
</footer>


    <script async src="https://shopnoltd.kesug.com/assets/scripts/kobo.js?2024-12-05_18-51-37"></script>
    
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-26003863-1"></script>
    <script type="text/plain" data-cookiecategory="analytics">
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-26003863-1');
    </script>
</body>
</html>


    `);  // <-- Make sure this closing backtick is also present here
});


// Start the server
app.listen(80, () => {
    console.log('Server running at http://127.0.0.1:80');
});
