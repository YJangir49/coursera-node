const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/';
const dbname='conFusion';

MongoClient.connect(url, (err,client)=>{
    assert.equal(err, null);
    console.log('Connected Sucessfully to the Server..');

    const db = client.db(dbname);
    const collection = db.collection("dishes");

    collection.insertOne({"name": "Utthapizza", "descrition": "test"}, (err,result)=>{
        assert.equal(err,null);
        console.log('After Insert: \n');
        console.log(result.ops);

        collection.find({}).toArray((err,docs)=>{
            assert.equal(err, null);
            console.log(docs);
            
            db.dropCollection("dishes", (err,result)=>{
                assert.equal(err,null);
                client.close();
            })
        })
    });
});