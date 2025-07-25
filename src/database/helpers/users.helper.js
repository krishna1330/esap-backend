const { Users, Roles } = require('../models');

const ADMIN_ROLE_ID = 2;

async function getAdmins() {
    const admins = await Users.findAll({
        include: [
            {
                model: Roles,
                as: 'roles',
                where: { role: 'Admin' },
                attributes: ['role_id', 'role']
            }
        ],
        where: {
            is_deleted: false,
            is_active: true
        },
        attributes: [
            'user_id',
            'first_name',
            'last_name',
            'email',
            'phone',
            'created_date',
            'modified_date'
        ],
        order: [['created_date', 'DESC']]
    });

    return {
        count: admins.length,
        data: admins
    };
}

async function createAdmin(payload) {
    const {
        first_name,
        last_name,
        email,
        phone,
        password_hash,
        created_by
    } = payload;

    // Basic validation
    if (!first_name || !email || !password_hash) {
        const err = new Error('first_name, email and password_hash are required');
        err.status = 400;
        throw err;
    }

    // Check existing email
    const existing = await Users.findOne({ where: { email, is_deleted: false } });
    if (existing) {
        const err = new Error('Email already exists');
        err.status = 409;
        throw err;
    }

    const now = new Date();

    const admin = await Users.create({
        role_id: ADMIN_ROLE_ID,
        first_name,
        last_name,
        email,
        phone,
        password_hash,
        is_active: true,
        is_deleted: false,
        created_by,
        created_date: now,
        modified_by: null,
        modified_date: null
    });

    const { password_hash: _, ...safe } = admin.get({ plain: true });
    return safe;
}

module.exports = {
    getAdmins,
    createAdmin
};
