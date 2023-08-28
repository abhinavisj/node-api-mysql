const express = require('express')
const postsController = require('../controllers/post.controller')
const checkAuthMiddleware = require("../middleware/check-auth")

const router = express.Router();

router.post('/', checkAuthMiddleware.checkAuth, postsController.save)
router.get('/:id', postsController.show)
router.get('/', postsController.showall)
router.put('/:id', checkAuthMiddleware.checkAuth, postsController.updateData)
router.delete('/:id', checkAuthMiddleware.checkAuth, postsController.deletepost)

module.exports = router;