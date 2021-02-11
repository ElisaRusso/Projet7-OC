const express = require('express');
const multer = require('../middleware/multer-config');

const router = express.Router();
const auth = require('../middleware/auth')
const articleCtrl = require('../controllers/article');
const isOwner = require('../middleware/isOwner');



router.post('/', auth, multer, articleCtrl.createArticle);
router.get('/', auth, articleCtrl.getAllArticles);
router.delete('/:id', auth, isOwner, articleCtrl.deleteArticle);
router.get('/:id', articleCtrl.getOneArticle);
router.put('/:id', auth, isOwner, articleCtrl.modifyArticle)


module.exports = router;