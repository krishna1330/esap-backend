const { verifyJwt } = require('../utils/jwt');

function extractBearerToken(req) {
    const auth = req.headers.authorization;
    if (!auth) return null;

    const [scheme, token] = auth.split(' ');
    if (!/^Bearer$/i.test(scheme)) return null;

    return token || null;
}

function authenticate(req, res, next) {
    console.log('Authorization header:', req.headers.authorization);

    const token = extractBearerToken(req);

    if (!token) {
        console.warn('❌ Missing or invalid Authorization header:', req.headers.authorization);
        return res.status(401).json({ message: 'Missing token' });
    }

    try {
        const decoded = verifyJwt(token);
        console.log('✅ Token verified. Decoded payload:', decoded);
        req.user = decoded;
        req.userId = decoded.sub;
        next();
    } catch (err) {
        console.error('❌ JWT verification failed:', err.name, err.message);
        return res.status(401).json({
            message: err.name === 'TokenExpiredError' ? 'Token expired' : 'Invalid or expired token'
        });
    }
}

function optionalAuth(req, res, next) {
    const token = extractBearerToken(req);
    if (!token) return next();

    try {
        const decoded = verifyJwt(token);
        req.user = decoded;
        req.userId = decoded.sub;
    } catch (err) {
        console.warn('Optional token verification failed:', err.name);
    }
    next();
}

function requireRole(...roleIds) {
    const allowed = roleIds.map(Number);
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const roleId = Number(req.user.role_id);
        if (!allowed.includes(roleId)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
}

module.exports = { authenticate, optionalAuth, requireRole };
