const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.get('/nada', (req, res) =>{
	res.send('adios');
});

router.get('/form', (req, res) =>{
	res.render('index')
});

module.exports = router;