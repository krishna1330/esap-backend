const { Router } = require('express');
const { getAdmins } = require('../controllers/users.controller');

const router = Router();

router.get('/', getAdmins);

module.exports = router;
