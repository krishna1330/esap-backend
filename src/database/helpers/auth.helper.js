const { Users } = require('../models');
const { signJwt } = require('../../utils/jwt');

async function login(email, password) {
    const user = await Users.findOne({
        where: { email, is_deleted: false },
        attributes: [
            'user_id',
            'first_name',
            'last_name',
            'email',
            'role_id',
            'password_hash',
            'is_active'
        ]
    });

    if (!user) {
        const err = new Error('Invalid email or password');
        err.status = 401;
        throw err;
    }

    if (!user.is_active) {
        const err = new Error('User is inactive');
        err.status = 403;
        throw err;
    }

    const isMatch = password === user.password_hash;
    if (!isMatch) {
        const err = new Error('Invalid email or password');
        err.status = 401;
        throw err;
    }

    const payload = {
        sub: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        role_id: user.role_id,
        email: user.email
    };

    const token = signJwt(payload);

    const { password_hash, ...safeUser } = user.get({ plain: true });
    return { token, user: safeUser };
}

module.exports = { login };
