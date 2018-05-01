// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.json());
// Require path
var path = require('path');

// exports.index = function (req, res) {
//     res.render('index', { moment: moment });
// }
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/basic_mongoose');
mongoose.Promise = global.Promise;


var PersonSchema = new mongoose.Schema({
    name: { type: String, required: [true, "name needs to be at least 2 character"], minlength: 2 }}, { timestamps: true });


// var UserSchema = new mongoose.Schema({
//     name: String,
//     age: Number
// })
mongoose.model('Person', PersonSchema); // We are setting this Schema in our Models as 'User'
var Person = mongoose.model('Person') // We are retrieving this Schema from our Models, named 'User'



// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');
// Routes
// Root Request



app.get('/', function (req, res) {
    Person.find({}, function (err, people) {
        if (err) {
            console.log("Returned error", err);
            // respond with JSON
            res.json({ message: "Error", error: err })
        }
        else {
            // respond with JSON
            res.json({ message: "Success", data: people })
        }
    })
}) 

app.get('/new/:name', function (req, res) {
    console.log("POST DATA");
    var person = new Person();
    person.name = req.params.name
 
    person.save(function (err) {
        // if there is an error console.log that something went wrong!
        if (err) {
            console.log("Returned error", err);
            // respond with JSON
            res.json({ message: "Error", error: err })
        }

        else { // else console.log that we did well and then redirect to the root route
            console.log('successfully added a person!');
            res.json({ message: "Success", data: person })
        }
    })
}) 

app.get('/remove/:name', function (req, res) {
    console.log("POST DATA", req.params.id);
    Person.remove({ name: req.params.name }, function (err) {


        // if there is an error console.log that something went wrong!
        if (err) {
            console.log("Returned error", err);
            // respond with JSON
            res.json({ message: "Error", error: err })

        }
        else { // else console.log that we did well and then redirect to the root route

            console.log('successfully added a person!');
            res.json({ message: "Success"})
        }
    })
}) 

app.get('/:name', function (req, res) {
    console.log("POST DATA", req.params.id);
    Person.findOne({name: req.params.name}, function (err, person) {
        if (err) {
            console.log("Returned error", err);
            // respond with JSON
            res.json({ message: "Error", error: err })
        }
        else {
            // respond with JSON
            res.json({ message: "Success", data: person})
        }
    })
}) 

   

// Setting our Server to Listen on Port: 8000
app.listen(8000, function () {
    console.log("listening on port 8000");
})