const { Users, Roles } = require('../database/models');

exports.getAdmins = async (req, res) => {
    try {
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

        res.json({
            count: admins.length,
            data: admins
        });
    } catch (err) {
        console.error('❌ Error fetching admins:', err);
        res.status(500).json({ message: 'Failed to fetch admins' });
    }
};
