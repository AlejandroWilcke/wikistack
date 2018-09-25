const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const routes = require('./routes');
const port = 3001;

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', {noCache: true});

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
	console.log('METHOD: ' + req.method + ' | URL: ' + req.url);
	next();
});

app.listen(port, () => console.log('Listening at port ' + port));

app.use('/', routes);