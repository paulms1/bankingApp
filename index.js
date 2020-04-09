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
