const express = require('express')
const app = express()
const port = 5000

var mongoose = require('mongoose')
var timeVal = require('./timeval')

mongoose.connect('mongodb+srv://EmirAlp:rdsThF54RgOcGuP0@firstcluster.uydlz.mongodb.net/?retryWrites=true&w=majority', (error) =>{
    if(!error){
        console.log('connected to mongodb');
    }
})


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/addVal', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
    });
    async function demo(){
        for(let i = 0 ;i<100;i++){
            var timeVal1 = new timeVal({});
            timeVal1.save((err)=>{
                if(err){
                throw err
                }
                console.log("saved"+i);
            })
            await new Promise(r => setTimeout(r, 200));
        }
    }
    demo()
    res.end("done")
  })
  
app.get('/cleanVal', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
    });
    timeVal.find((error,data)=>{
        if(error){
            throw error;
        }
        data.map(async (mydata)=>{
            mydata.remove((err)=>{
                if(err){
                    throw err;
                }
                console.log("deleted");
            });
        })
    })
    res.end("done")
  })
app.get('/getVal', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
    });
    timeVal.find({},(error,data)=>{
        if(error){
            throw error;
        }
        console.log("get");
        res.end(JSON.stringify(data));
    })
   
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})