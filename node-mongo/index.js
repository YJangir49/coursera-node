const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dbopr = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname='conFusion';

MongoClient.connect(url, (err,client)=>{
    assert.equal(err, null);
    console.log('Connected Sucessfully to the Server..');

    const db = client.db(dbname);
    dbopr.insertDocument(db, {name: "Vadonut", description: "Test"}, 'dishes', (result)=>{
        console.log("Insert Document:\n", result.ops);

        dbopr.findDocuments(db, 'dishes', (docs)=>{
            console.log("Found Documents: \n", docs);

            dbopr.updateDocument(db, {name: 'Vadonut'}, {description: 'Updated Test'}, 'dishes', (result)=>{
                console.log("Updated Document: ", result.result);
                    
                dbopr.findDocuments(db, 'dishes', (docs)=>{
                    console.log("Found Documents: \n", docs);

                        db.dropCollection("dishes", (result)=>{
                            console.log("Droped: ", result);
                            client.close();
                    });
                });
            });
        });
    });
});