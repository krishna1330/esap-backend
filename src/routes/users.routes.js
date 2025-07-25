const { Router } = require('express');
const { getAdmins, createAdmin } = require('../controllers/users.controller');

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

/**
 * @swagger
 * /api/admins:
 *   post:
 *     summary: Create an admin (role_id = 2)
 *     tags: [Admins]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [first_name, email, password_hash]
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               password_hash:
 *                 type: string
 *               created_by:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Admin created
 *       400:
 *         description: Validation error
 *       409:
 *         description: Email already exists
 */
router.post('/', createAdmin);

module.exports = router;
