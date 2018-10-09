const express = require('express');
const router = express.Router();
var models = require('../models');

var Page = models.Page; 
var User = models.User;

router.post('/', function(req, res, next) {
	var page = Page.build({
		title: req.body.title,
		content: req.body.content,
	});
	page.save()
	.then(savedPage => {
	    res.redirect(savedPage.urlTitle); // route virtual FTW
	})
	.catch(next);
	
});

router.get('/', (req, res, next)=>{
	Page.findAll({})
	.then(pages=> res.render('index', {pages: pages}));
});

router.get('/add', function(req, res, next) {
	res.render('addpage');
});

router.get('/:urlTitle', function (req, res, next) {
  Page.findOne({ 
    where: { 
      urlTitle: req.params.urlTitle
    },
    include:{
    	models: Users,
    	as: 'author'
    }
  })
  .then(function(foundPage){
    res.render('wikipage', {result: foundPage});
  })
  .catch(next);
});

module.exports = router;