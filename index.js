const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 8800;

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const url = 'mongodb://localhost:27017';

app.use(bodyParser.json());
app.use(express.static('public'));

// creating db connection and using callback to get data from db and returning it as json
app.get('/banking', (req, res) => {

    MongoClient.connect(url, { useUnifiedTopology: true }, (err,client) => {
        console.log('connected correctly to mongodb');
        let  db = client.db('banking');
        getDataFromDb(db, (documentsReturned)=>{
            res.json(documentsReturned)
        })
    });
});
// grabbing data from mongo db
var getDataFromDb = (db, callback) => {
    //specific collection
    var collection = db.collection('accounts');
    //If you put nothing inside the object below, you get everything
    collection.find({}).toArray((err, docs)=>{
        console.log('found the following records:');
        callback(docs)
    });
};



    // starts app running listening at defined port
app.listen(port, () => console.log(`To do app listening at http://localhost:${port}`));