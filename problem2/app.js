var express = require('express');
var formidable = require('formidable');
var path=require('path')
var fs=require('fs')

var app = express();

app.get('/', function (req, res){
    res.sendFile(__dirname + '/index.html');
});

app.post('/api/uploadFile', function (req, res){
   
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files){

    
        if(files.myFile.mimetype=='image/jpeg' || files.myFile.mimetype=='image/png'){
        var oldPath = files.myFile.filepath;
    
        var newPath = path.join(__dirname, 'uploads')
                + '/'+files.myFile.originalFilename
        
        var rawData = fs.readFileSync(oldPath)
        
        fs.writeFile(newPath, rawData, function(err){
            if(err) console.log(err)
            return res.send("Successfully uploaded")
        })
    }else{
        res.send("File not suppported")
    }

  })
 
});

app.listen(3000);