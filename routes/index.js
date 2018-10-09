const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const wikiRouter = require('./wiki');
const userRouter = require('./user');

router.use('/wiki', wikiRouter);
router.use('/user', userRouter);

router.get('/form', (req, res) =>{
	res.render('index');
});

/*router.get('/:urlTitle', (req, res) =>{
	var urlTitle = req.params.urlTitle;
	res.render(urlTitle);
});*/

module.exports = router;