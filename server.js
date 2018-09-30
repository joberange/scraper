var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("./models");

var PORT = 3000;
var app = express();

app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/scraper", { useNewUrlParser: true });

app.get("/scrape", function (req, res) {

    axios.get("http://www.gamingilluminaughty.com/").then(function (response) {
        const $ = cheerio.load(response.data);
        
        $("H5.entry-title").each(function (i, element) {
            var result = {};
            result.link = $(element).children().attr("href");
            result.title = $(element).children().text();
            result.img = $("figure.post-gallery").children().attr("href");
            result.summary = $("div.entry-content").children().text().substring(0, 300);
        });
        res.send("Scrape Complete");
    });
});

app.get("/articles", function (req, res) {

    db.Article.find({})
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});

// I was not able to figure out th enote taking functionality. I didnt utilize handlebars.