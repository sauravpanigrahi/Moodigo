const jwt = require('jsonwebtoken');

// Your existing middleware for protected routes
function isLoggedIn(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    jwt.verify(token, process.env.JWT_SECRET || 'SECRET_KEY', (err, user) => {
        if (err) return res.status(403).json({ message: 'Forbidden' });
        req.user = user;
        next();
    });
}

// New global middleware that checks auth but doesn't block the request
function checkAuthStatus(req, res, next) {
    const token = req.cookies.token;
    
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET || 'SECRET_KEY', (err, decoded) => {
            if (!err && decoded) {
                req.user = {
                    _id: decoded._id,
                    username: decoded.username,
                    email: decoded.email
                };
                req.isAuthenticated = () => true;
            } else {
                // Token is invalid, clear it
                req.user = null;
                req.isAuthenticated = () => false;
                res.clearCookie('token');
            }
            next();
        });
    } else {
        req.user = null;
        req.isAuthenticated = () => false;
        next();
    }
}

// Optional: Enhanced isLoggedIn that works with checkAuthStatus
function isLoggedInEnhanced(req, res, next) {
    if (req.user && req.isAuthenticated()) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = { 
    isLoggedIn, 
    checkAuthStatus, 
    isLoggedInEnhanced 
};