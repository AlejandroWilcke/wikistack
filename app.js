const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const routes = require('./routes');
const models = require('./models');
const port = 3001;

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', {noCache: true});

models.db.sync({force:false})
.then(function () {
	app.listen(port, () => console.log("Listening..."));
})
.catch(console.error);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

/*models.User.sync({})
.then(function(){return models.Page.sync({})})
.then(function(){
	app.listen(port, () => console.log("Listening..."));
}).catch(console.error);*/

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
	console.log('METHOD: ' + req.method + ' | URL: ' + req.url);
	next();
});

app.use('/', routes);