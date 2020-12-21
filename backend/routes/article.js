const express = require('express');

const router = express.Router();

const articleCtrl = require('../controllers/article');


router.post('/', articleCtrl.createArticle)
router.get('/', articleCtrl.GetAllArticles)



module.exports = router;