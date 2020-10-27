//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const request = require("request");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
/////////////////////////////////////

app.get("/", function(req, res){

    var date= new Date();
    var month= date.getMonth()+1;
    var day= date.getDate();

    const url= "http://history.muffinlabs.com/date/"+ month + "/" + day;

    request.get(url, (error, response, body) =>{
      let json= JSON.parse(body);
      res.render("home", {dateData: json});
    });

});

app.post("/", function(req, res){

    var month= req.body.monthSelected;
    var day= req.body.getDate;

    const url= "http://history.muffinlabs.com/date/"+ month + "/" + day;

    request.get(url, (error, response, body) =>{
      let json= JSON.parse(body);
      res.render("aboutDate", {dateData: json});
    });

});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
