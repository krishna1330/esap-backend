const { Router } = require('express');
const { getAdmins } = require('../controllers/users.controller');

const router = Router();

/**
 * @swagger
 * /api/admins:
 *   get:
 *     summary: Get all admin users
 *     tags: [Admins]
 *     responses:
 *       200:
 *         description: List of admins
 */
router.get('/', getAdmins);

module.exports = router;
    