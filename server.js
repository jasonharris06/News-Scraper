var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

//Scraping tools
var axios = require("axios");
const cheerio = require('cheerio');

//require all models
var db = require("./models");
var PORT = 3000;

var app = express();

//configure middleware

//Use morgan logger for logging requests
app.use(logger("dev"))
//Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newsScraper";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
//Routes

//A GET route for scraping the KSL Website
app.get("/scrape", function (req, res) {
    let url = "http://www.ksl.com";
    
    axios.get(url).then(response => {
        var $ = cheerio.load(response.data);

        $("div.queue_story").each(function (element, i) {
            //save results in empty object
            var results = {};

            results.title = $(this).find("h2").text().trim();
            results.summary = $(this).find("h5").text().trim();
            results.link = (url + $(this).find("a").attr("href"));
            results.photo = $(this).find("a").find("img").attr("data-srcset").trim();
            results.updated = $(this).find("h4").text();

            //console.log(results.photo);

            db.Article.create(results)
                .then(function(dbArticle){
                    //document.location.href="home"
                    //res.render("home", {items : data})
                    console.log(dbArticle);
                    // db.Article.find({}).then(function(data){
                    //     //console.log(data)
                    //     res.render("home", {items : data})
                    })
                })
                .catch(function(err) {
                    console.log(err);
                });
        });
        
        //res.render("home", {items : data})
        //document.location.href="/";
        //location.reload();
        res.send("scrapy scrape scrape")
    });
    // db.Article.find({}).then(function(data){
    //     //console.log(data)
    //     res.render("home", {items : data})


// Route for getting all Articles from the db
app.get("/articles", function(req, res) {
    // Grab every document in the Articles collection
    db.Article.find({})
      .then(function(dbArticle) {
        // If we were able to successfully find Articles, send them back to the client
        res.json(dbArticle);
        
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

app.get("/articles/:id", (req, res) => {
    res.render("notes", {items : data}),
    db.Article.findOne({ _id: req.params.id })
    .populate("note")
    .then(function(dbArticle){
        res.json(dbArticle) ,
        res.render("notes", {items : data})
    })
    .catch(function(err){
        console.log(err);
        res.json(err);
    });
    res.render("notes", {items : data})
});

app.put("/delete/:id", (req, res) => {
    db.Article.findByIdAndUpdate({ _id: req.params.id}, {delete: true}, (err, succeess) => {
        if (err) console.error(err);
        res.send('success')
    })


})

app.post("/articles/:id", (req, res) =>{
   console.log(`\n\n\n${JSON.stringify(req.body)}\n\n\n`);
    db.Notes.create(req.body)
    .then(function(dbNote){
        return db.Article.findByIdAndUpdate({ _id: req.params.id}, { note:dbNote._id }, {new: true});
        
    })
    .then(function(dbArticle){
        res.json(dbArticle);
    })
    .catch(function(err){
        res.json(err);
    });
});

app.get("/", function(req, res){

    db.Article.find({}).then(function(data){
        //console.log(data)
        res.render("home", {items : data})
    })
   
})

app.get("/saved", function(req, res){

    db.Article.find({}).then(function(data){
        //console.log(data)
        res.render("saved", {items : data})
    })
   
})
// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});