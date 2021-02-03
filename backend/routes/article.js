const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth')
const articleCtrl = require('../controllers/article');


router.post('/', articleCtrl.createArticle);
router.get('/', articleCtrl.getAllArticles);
router.delete('/:id', articleCtrl.deleteArticle);
router.get('/:id', articleCtrl.getOneArticle);
router.put('/:id', articleCtrl.modifyArticle)


module.exports = router;