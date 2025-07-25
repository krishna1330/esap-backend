const { Router } = require('express');
const router = Router();

// example route group
router.get('/v1/ping', (req, res) => res.json({ pong: true }));

module.exports = router;
