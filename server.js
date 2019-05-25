var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
const url = 'http://www.agriculture.gov.au/pests-diseases-weeds/plant/';
app.get('/scrape', function(req,res){
    request(url, function(error,response,html){
        if(error) {
            res.status(404).send("Error with url.");
        } else {
        var $ = cheerio.load(html);
        var tempArr = [];
        $('.flex-item').each(function(i,e){

            // this will extract text from html and will remove newline, tabs and extra spaces.
            var name = $(this).text().trim().replace(/(\r\n|\n|\r)/gm, ""); 

            //Find the image tags from html and extract value of src from selected image tag.
            var imgLink = $(this).find('img').attr('src');

            var plantDiseases = {
                DiseaseName: name,
                ImageLink: imgLink
            }
            tempArr.push(plantDiseases);
        });
        res.status(200).send(tempArr); // Display extracted data in the form of array of json objects.
        }
    });
    
});

console.log("Server started at 3000.");
app.listen('3000');

