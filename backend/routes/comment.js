const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');
const commentCtrl = require('../controllers/comment');
const isOwner = require('../middleware/isOwner');


router.post('/', auth, commentCtrl.createComment);
router.get('/:id', auth, commentCtrl.getCommentsByArticle);
router.get('/', auth, commentCtrl.getAllComments);
router.delete('/:id', auth, commentCtrl.deleteComment);

module.exports = router;