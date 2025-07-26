const { login } = require('../database/helpers/auth.helper');

exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'email and password are required' });
        }

        const { token, user } = await login(email, password);
        return res.json({ token, user });
    } catch (err) {
        console.error('❌ Login error:', err);
        res.status(err.status || 500).json({ message: err.message || 'Login failed' });
    }
};
