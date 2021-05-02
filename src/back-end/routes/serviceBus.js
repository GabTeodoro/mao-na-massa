const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());
let events = []

app.post('/MaoNaMassa',(req,res)=>{
    const event = req.body;
    events.push(event);
    console.log("Enviando evento " + event.type)
    // Ingrediente  
    axios.post('http://localhost:5000/MaoNaMassa',event);

    //Receita
    axios.post('http://localhost:4000/MaoNaMassa',event);
})

app.get('/MaoNaMassa',(req, res)=>{
    res.send(events)
})

app.listen(10000,()=>console.log("Barramento de eventos: Porta 10000"))
