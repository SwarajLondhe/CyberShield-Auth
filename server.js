const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');

const app = express();
const PORT = 3000;

// ==========================================
// 🛡️ SECURITY MIDDLEWARES
// ==========================================
app.use(helmet()); // Sets secure HTTP headers
app.use(xss()); // Sanitizes user input to prevent XSS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Secure Session Management
app.use(session({
    secret: 'SuperSecretCyberKey_CHANGE_IN_PROD_9982!',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true, // Prevents client-side JS from reading cookie (XSS protection)
        secure: false, // Set to true if using HTTPS
        sameSite: 'strict', // Prevents CSRF attacks
        maxAge: 15 * 60 * 1000 // 15 minutes session timeout
    }
}));

// Rate Limiting (Prevents Brute Force)
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login requests per window
    message: { error: "⚠️ INTRUSION DETECTED: Too many login attempts. IP temporarily blocked." }
});

// ==========================================
// 🗄️ DATABASE SETUP (SQLite)
// ==========================================
const db = new sqlite3.Database('./cybershield.db', (err) => {
    if (err) console.error("Database error:", err.message);
    else console.log("[SYSTEM] Database connected securely.");
});

// Create Users Table securely (Prepared for SQLi prevention)
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        failed_attempts INTEGER DEFAULT 0,
        locked_until INTEGER DEFAULT 0
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS security_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        event TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
});

// Helper Function: Log Security Events
const logEvent = (event) => {
    db.run(`INSERT INTO security_logs (event) VALUES (?)`, [event]);
    console.log(`[LOG] ${event}`);
};

// ==========================================
// 🔐 AUTHENTICATION ROUTES
// ==========================================

// 1. REGISTER
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: "Invalid input." });

    try {
        // Hash password securely with bcrypt (salt rounds = 12)
        const hashedPassword = await bcrypt.hash(password, 12);
        
        // Parameterized Query prevents SQL Injection
        db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashedPassword], function(err) {
            if (err) return res.status(400).json({ error: "User already exists." });
            logEvent(`New user registered: ${username}`);
            res.json({ success: "Registration successful. Proceed to login." });
        });
    } catch (err) {
        res.status(500).json({ error: "Server error." });
    }
});

// 2. LOGIN (With Lockout logic)
app.post('/api/login', loginLimiter, (req, res) => {
    const { username, password } = req.body;

    db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, user) => {
        if (err || !user) {
            logEvent(`Failed login attempt for unknown user: ${username}`);
            return res.status(401).json({ error: "Invalid credentials." });
        }

        // Check if account is locked
        if (user.locked_until > Date.now()) {
            const timeLeft = Math.ceil((user.locked_until - Date.now()) / 60000);
            return res.status(403).json({ error: `⚠️ ACCOUNT LOCKED. Try again in ${timeLeft} minutes.` });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            let attempts = user.failed_attempts + 1;
            let lockTime = 0;
            
            if (attempts >= 5) {
                lockTime = Date.now() + (15 * 60 * 1000); // Lock for 15 mins
                logEvent(`ACCOUNT LOCKED: ${username} exceeded login attempts.`);
            }
            
            db.run(`UPDATE users SET failed_attempts = ?, locked_until = ? WHERE username = ?`, [attempts, lockTime, username]);
            return res.status(401).json({ error: "Invalid credentials." });
        }

        // Successful Login: Reset attempts and set session
        db.run(`UPDATE users SET failed_attempts = 0, locked_until = 0 WHERE username = ?`, [username]);
        req.session.userId = user.id;
        req.session.username = user.username;
        logEvent(`Successful login: ${username}`);
        
        res.json({ success: "ACCESS GRANTED.", redirect: "/dashboard.html" });
    });
});

// 3. CHECK AUTH (Protect Dashboard)
app.get('/api/auth-check', (req, res) => {
    if (req.session.userId) res.json({ authenticated: true, username: req.session.username });
    else res.status(401).json({ authenticated: false });
});

// 4. LOGOUT
app.post('/api/logout', (req, res) => {
    logEvent(`User logged out: ${req.session.username}`);
    req.session.destroy();
    res.json({ success: "Logged out successfully." });
});

// 5. GET LOGS (For Hacker Dashboard)
app.get('/api/logs', (req, res) => {
    if (!req.session.userId) return res.status(401).json({ error: "Unauthorized" });
    db.all(`SELECT * FROM security_logs ORDER BY id DESC LIMIT 10`, [], (err, rows) => {
        res.json(rows);
    });
});

// Start Server
app.listen(PORT, () => console.log(`\n[+] CyberShield Node active on http://localhost:${PORT}`));