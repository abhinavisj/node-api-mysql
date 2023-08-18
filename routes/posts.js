const express = require('express')
const postsController = require('../controllers/post.controller')

const router = express.Router();

router.post('/', postsController.save)
router.get('/:id', postsController.show)
router.get('/', postsController.showall)
router.put('/:id', postsController.updateData)
router.delete('/:id', postsController.deletepost)

module.exports = router;