const express = require('express');
const router = express.Router();

var { Users } = require('../models');

router.get('/', (req, res) => {
	Users.findAll().then(users => res.render('users', {users}))
});

router.get('/:id', (req, res) => {
	Users.findById(req.params.id).then(user => res.render('singleuser', {user, pages}));
});

module.exports = router;