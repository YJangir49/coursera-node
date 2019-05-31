
const http = require('http');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const hostname='localhost';
const port=3000;

const app=express();

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(__dirname+'/public'));
app.all('/dishes', (req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type', 'text/plain');
    next();
});

app.get('/dishes' , (req,res,next)=>{
    res.end('Will send all dishes to you!');
});

app.put('/dishes',(req,res,next)=>{
    res.statusCode=404;
    res.end('/dishes did not support the PUT operation.');
});

app.post('/dishes',(req,res,next)=>{
    res.end('Will add the dish : ' + req.body.name + 'with description ' + req.body.description );
});

app.delete('/dishes',(req,res,next)=>{
    res.end('will delete all the dishes for you!');
});

app.get('/dishes/:dishId', (req,res,next)=>{
    res.end('Will send you details of dish: ' + req.params.dishId );
})


app.put('/dishes/:dishId', (req,res,next)=>{
    res.write('Updating the dish: ' + req.params.dishId + '\n' );
    res.end('Will update the dish: ' + req.body.name + 
    ' with details: ' + req.body.description);
})


app.post('/dishes/:dishId', (req,res,next)=>{
    res.end('Post oreration did not supported on /dishes/'+ req.params.dishId );
})


app.delete('/dishes/:dishId', (req,res,next)=>{
    res.end('Deleting dish:  ' + req.params.dishId );
})

app.use((req,res,next)=>{
    console.log(req.headers);
    res.statusCode=200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h5>This is express server</h5></body></html>');
});

const server = http.createServer(app);

server.listen(port,hostname,()=>{console.log(`Server is running at http://${hostname}:${port}/`);});