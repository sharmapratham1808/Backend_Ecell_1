const express = require('express');
const admin_controller = require('../controllers/admin_controller');
const router = express.Router();
const authMiddleware = require("../middlewares/auth_middleware.js");
const adminMiddleware = require('../middlewares/admin_middleware.js');

router.route('/users').get(authMiddleware, adminMiddleware, admin_controller.getAllUsers);
router.route('/users/:id').get(authMiddleware, adminMiddleware, admin_controller.getUserById);
router.route('/users/update/:id').patch(authMiddleware, adminMiddleware, admin_controller.updateUserById);
router.route('/users/delete/:id').delete(authMiddleware, adminMiddleware, admin_controller.deleteUserById);
router.route('/contacts').get(authMiddleware, adminMiddleware, admin_controller.getAllContacts);
router.route('/contacts/delete/:id').delete(authMiddleware, adminMiddleware, admin_controller.deleteContactById);


module.exports = router;
