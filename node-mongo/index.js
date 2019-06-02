const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dbopr = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname='conFusion';

MongoClient.connect(url).then((client)=>{
    console.log('Connected Sucessfully to the Server..');

    const db = client.db(dbname);
    dbopr.insertDocument(db, {name: "Vadonut", description: "Test"}, 'dishes')
    .then((result)=>{
        console.log("Insert Document:\n", result.ops);
        return dbopr.findDocuments(db, 'dishes');
    })
    .then((docs)=>{
        console.log("Found Documents: \n", docs);
        return  dbopr.updateDocument(db, {name: 'Vadonut'}, {description: 'Updated Test'}, 'dishes')
    })
    .then((result)=>{
        console.log("Updated Document: ", result.result);
        return  dbopr.findDocuments(db, 'dishes')
    })
     .then((docs)=>{
        console.log("Found Documents: \n", docs);
        return db.dropCollection("dishes");
    })
      .then((result)=>{
        console.log("Droped: ", result);
        client.close();
    })
    .catch((err)=>{console.log(err)});
}).catch((err)=>{console.log(err)});