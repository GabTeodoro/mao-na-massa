const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());
let events = []

app.post('/MaoNaMassa',(req)=>{
    const event = req.body;
    events.push(event);
    console.log("Enviando evento " + event.type)
    // Ingrediente  
    axios.post('http://localhost:5000/MaoNaMassa',event).catch(()=>console.log("Não enviou para o ingrediente"));

    //Receita
    axios.post('http://localhost:4000/MaoNaMassa',event).catch(()=>console.log("Não enviou para a receita"));;

    //Itens produzidps
    axios.post('http://localhost:7000/MaoNaMassa',event).catch(()=>console.log("Não enviou para os itens produzidos"));;

    //Notificações
    axios.post('http://localhost:8000/MaoNaMassa',event).catch(()=>console.log("Não enviou para a notificação"));;
})

app.get('/MaoNaMassa',(req, res)=>{
    res.send(events)
})

module.exports = app

