const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());
let events = []
const filter = require('../models/filter/filter');

app.post('/MaoNaMassa',(req, res)=>{
    const event = req.body;
    events.push(event);
    console.log("Enviando evento " + event.type)
    // Ingrediente  
    axios.post('http://localhost:5000/MaoNaMassa',event).catch(()=>{});

    //Receita
    axios.post('http://localhost:4000/MaoNaMassa',event).catch(()=>{});

    //Itens produzidps
    axios.post('http://localhost:7000/MaoNaMassa',event).catch(()=>{});

    //Notificações
    axios.post('http://localhost:8000/MaoNaMassa',event).catch(()=>{});

    //Usuario
    axios.post('http://localhost:9000/MaoNaMassa',event).catch(()=>{});
    res.status(200).send({msg: "Ok"})
})

app.get('/MaoNaMassa',(req, res)=>{
    res.send(events)
})

module.exports = app

