const assert = require('assert');

exports.insertDocument=(db, document, collection, callback)=>{
    const coll = db.collection(collection);
    coll.insert(document, (err,result)=>{
        assert.equal(err,null);
        console.log('Inserted '+ result.result.n + 'documents in collection ' + collection);
        callback(result);
    })

};

exports.findDocuments=(db, collection, callback)=>{
        const coll = db.collection(collection);
        coll.find({}).toArray((err,docs)=>{
            assert.equal(err,null);
            callback(docs);
        });
};

exports.updateDocument=(db, document, update,  collection, callback)=>{

        const coll=db.collection(collection);
        coll.updateOne(document,{ $set: update },null,(err,result)=>{
                assert.equal(err,null);
                console.log("Updated the Document with ", update );
                callback(result);
        });
};

exports.removeDocument=(db, document, collection, callback)=>{
        const coll= db.collection(collection);
        coll.deleteOne(document, (err,result)=>{
            assert.equal(err, null);
            console.log('Remove Document: ', document);
            callback(result);
        });
};