
const { check, validationResult }
= require('express-validator');

const bodyparser = require('body-parser')
const express = require("express")
const path = require('path')
const app = express()
// View Engine Setup

app.set("views", path.join(__dirname))
app.set("view engine", "ejs")
app.use(express.static(__dirname + '/'));
var jsonfile = require('jsonfile');    
var file = './link-data.json'
 
// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())


app.get('/',function(req,res){
    res.render("form")
})

app.post('/reserveflight', [
    check('email', 'Email is not correct')
                    .isEmail(),
    check('firstname', 'Name length should be 10 to 20 characters')
                    .isLength({ min: 5, max: 20 }),
    check('lastname', 'Name length should be 5 to 20 characters')
                    .isLength({ min: 5, max: 20 })
], (req, res) => {
 
    // validationResult function checks whether
    // any occurs or not and return an object
    const errors = validationResult(req);
 
    // If some error occurs, then this
    // block of code will run
    if (!errors.isEmpty()) {
        res.json(errors)
    }
 
    // If no error occurs, then this
    // block of code will run
    else {
        //start writing
        var obj = req.body
        jsonfile.writeFileSync(file, obj, {flag: 'a'});
        res.send("Successfully validated")
    }
});

app.listen(3000)