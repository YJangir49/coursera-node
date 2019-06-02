const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db)=>{
    console.log('Connect to the server..!!');

     Dishes.create({
        name: 'Utthapizza',
        description: 'test'
    })
    .then((dish)=>{
        console.log(dish);
        return Dishes.find({});
    })
    .then((dishes)=>{
        console.log(dishes);
        return Dishes.remove({});
    })
    .then(()=>{
        return mongoose.connection.close();
    })
    .catch((err)=>console.log(err));
})