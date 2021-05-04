var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('pages/index');
});

app.get('/airports', function(req, res) {
    res.render('pages/airports');
});

app.listen(3000);
console.log('Live at port 3000');