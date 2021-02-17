var express = require('express');
var app = express();
var mongo = require('mongodb');
var path = require('path');
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://dbuser:dbuser@harjotcluster.fkkhl.mongodb.net/test?authSource=admin&replicaSet=atlas-e2zs4d-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";


// var dbo;
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;

//   console.log("Database created!");
//   dbo = db.db("Banking_System");
//   var myobj = {
//     "Customer_ID": "3",
//     "First_Name": "Amandeep",
//     "Last_Name": "Singh",
//     "Address": "123 Laxmi nagar delhi",
//     "City": "Delhi",
//     "State": "Delhi",
//     "Balance": "6000",
//     "Email": "amandeep.singh@amity.edu"
// };
//   dbo.collection("Customer").insertOne(myobj, function(err, res) {
//     if (err) throw err;
//     console.log("1 document inserted");
//     db.close();
//   });
// });

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
  var staticPath = path.join(__dirname, '/app');
  app.use(express.static(staticPath));

app.get('/getCustomers',(req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;

        console.log("Database created!");
        var  dbo = db.db("Banking_System");
        var temp;
        dbo.collection("Customer").find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            temp = result;
            db.close();
            res.send(200,{"Data":result})
          });
        
    });

})

app.listen(8080, function () {
    console.log("listening on 8080");
});


