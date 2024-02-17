const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        return renewToken(req, res) ? next() : res.json({ valid: false, message: "Failed to renew token" });
    } else {
        jwt.verify(accessToken, 'jwt-access-token-secret-key', (err, decoded) => {
            if (err) {
                return res.json({ valid: false, message: "Invalid Token" });
            } else {
                req.email = decoded.email;
                next();
            }
        });
    }
};

const renewToken = (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.json({ valid: false, message: "No Refresh token" });
    } else {
        jwt.verify(refreshToken, 'jwt-refresh-token-secret-key', (err, decoded) => {
            if (err) {
                return res.json({ valid: false, message: "Invalid Refresh Token" });
            } else {
                const accessToken = jwt.sign({ email: decoded.email }, "jwt-access-token-secret-key", { expiresIn: '1m' });
                res.cookie('accessToken', accessToken, { maxAge: 60000 });
                next(); // Call next to proceed to the next middleware or route handler
            }
        });
    }
};

module.exports = verifyUser;