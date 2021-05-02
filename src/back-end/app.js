const express = require("express");
const env = require('dotenv');
env.config();
const app = express();

const cors = require("cors");
const axios = require('axios');
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());




// Requisições Ingredientes
// app.use(app.router);
// serviceBusRoutes.initialize(app);
app.post('/MaoNaMassa',(req,res)=>{
  // Service Bus
  const event = req.body
  axios.post('localhost:10000/MaoNaMassa', event)

})
app.get('/MaoNaMassa',(req, res)=>{
  axios.get('http://localhost:10000/MaoNaMassa')
  res.send(200).end()
})

//Requisições Recipe

module.exports = app;
