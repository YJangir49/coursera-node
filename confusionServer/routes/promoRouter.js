
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Promos = require('../models/promotions');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.get((req,res,next)=>{
    Promos.find({})
    .then((promos)=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promos);
    },(err)=>next(err))
    .catch(err=>next(err));
})
.post((req, res, next) => {
    Promos.create(req.body)
    .then((dish)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(dish);
    },(err)=>{next(err);})
    .catch((err)=>{next(err)});
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete((req, res, next) => {
    Promos.remove({})
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=>{next(err);})
    .catch((err)=>{next(err);});
});

promoRouter.route('/:promoId')
.get((req,res,next)=>{
    Promos.findById(req.params.promoId)
    .then((dish)=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err)=>{next(err)})
    .catch((err)=>{next(err)});    
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST method is not supported on /promotions/' + req.params.dishId);
})
.put((req, res, next) => {
    Promos.findByIdAndUpdate(req.params.promoId, {$set: req.body},{new:true})
    .then((dish)=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    },(err)=>{next(err);})
    .catch((err)=>{next(err);});
})
.delete((req, res, next) => {
    Promos.findByIdAndRemove(req.params.promoId)
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    },(err)=>{next(err);})
    .catch((err)=>{next(err);});
});

module.exports = promoRouter;

