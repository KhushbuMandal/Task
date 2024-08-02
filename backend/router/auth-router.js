const express = require ("express");
const router = express.Router();
// const {home} = require('../controllers/auth-controller')
const authControllers = require('../controllers/auth-controller')


router.route('/').get(authControllers.home);
router.route("/groups").get(authControllers.getGroups).post(authControllers.createGroup);

module.exports = router;
