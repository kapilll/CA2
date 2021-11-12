const express=require('express')
const bodyparser=require('body-parser')
const app=express()
const fs=require('fs')

app.use(express.static(__dirname + '/'));
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); 
app.get('/', function (req, res){
    res.sendFile(__dirname + '/index.html');
});
app.post('/sum',function(req,res){
    let sum = 0;

// looping from i = 1 to number
// in each iteration, i is increased by 1
for (let i = 1; i <= req.body.num; i++) {
    sum += i;
}

fs.writeFile("sum.txt", sum.toString() , function(err) {
    if(err) {
        return console.log(err);
    }
}); 
res.send("File was saved")
})
app.listen(3000)