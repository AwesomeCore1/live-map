var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    var mascots = [
        { name: 'Sammy', organization: 'DigitalOcean', birth_year: 2012 },
        { name: 'Tux', organization: 'Linux', birth_year: 1996 },
        { name: 'Moby Duck', organization: 'Docker', birth_year: 2013 }
    ];
    var tagline = "No programming is complete without a cute animal mascot.";

    res.render('pages/index', {
        mascots: mascots,
        tagline: tagline
    });
});

app.get('/airports', function(req, res) {
    res.render('pages/airports');
});

app.listen(3000);
console.log('Live at port 3000');