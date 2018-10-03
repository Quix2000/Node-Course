var express = require('express');
var hbs = require('hbs');
var fs = require('fs');

var app = express();

var port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials/');

app.set('view engine', 'hbs');

app.use((request, response, next) => {
    var now = new Date().toString();
    var log = `${now}: ${request.method} ${request.url}`;
    console.log(log)
    fs.appendFile('server.log',log + '\n', (err) => {
        if (err){
            console.log('Cannot append to server log');
        }
    });
    next();
})

//app.use((request, response, next) => {
//    response.render('maintenance.hbs');
//})

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/',(request, response) => {
    //response.send('About Page');
    response.render('home.hbs', {
        pageTitle: 'Home Page',
        currentYear: new Date().getFullYear(),
        welcomeMessage: 'Welcome to my Site'
    });
});

app.get('/about',(request, response) => {
    //response.send('About Page');
    response.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/bad',(request, response) => {
    response.send('Unable to process request');
})

app.listen(port, () => {
    console.log(`Server is up at Port ${port}`);
});