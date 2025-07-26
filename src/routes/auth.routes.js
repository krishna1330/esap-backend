const { Router } = require('express');
const { loginController } = require('../controllers/auth.controller');

const router = Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login and get JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: ESAP@1234
 *     responses:
 *       200:
 *         description: JWT token
 */
router.post('/login', loginController);

module.exports = router;
