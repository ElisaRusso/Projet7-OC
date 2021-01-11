const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth')
const articleCtrl = require('../controllers/article');


router.post('/', articleCtrl.createArticle);
router.get('/', auth, articleCtrl.getAllArticles);
router.delete('/:id', auth, articleCtrl.deleteArticle);
router.get('/:id', auth, articleCtrl.getOneArticle);
router.put('/:id', auth, articleCtrl.modifyArticle)


module.exports = router;