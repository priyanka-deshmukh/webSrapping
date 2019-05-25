var express = require('express');
var app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/scrape', function(req,res){
    res.status(200).send("Website scrapping started.");
});

console.log("Server started at 8081.");
app.listen('8081');


