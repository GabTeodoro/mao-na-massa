const express = require("express");
const bcrypt = require ('bcrypt');
const dotenv = require("dotenv");
dotenv.config();
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const Usuario = require("../models/usuario/usuario");
const app = express();
const axios = require("axios");
const cors = require("cors");
app.use(express.json());
app.use(cors());

const userDB = process.env.MONGODB_USER_USER;
const passwordDB = process.env.MONGODB_USER_PASSWORD;
const clusterDB = process.env.MONGODB_USER_CLUSTER;
const databaseDB = process.env.MONGODB_USER_DATABASE;
const eventBusURL = 'http://localhost:3000/MaoNaMassa'

mongoose
  .connect(`mongodb+srv://${userDB}:${passwordDB}@${clusterDB}/${databaseDB}?retryWrites=true&w=majority`,{useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log("Conection OK");
  })
  .catch((err) => {
    console.log("Conection NOK\nError: "+err);
});

const functions = {}



app.put('/MaoNaMassa/login', (req, res, next) => {
    let user;
    Usuario.findOne({ email: req.body.email }).
      then(u => {
        user = u;
        if(!u){
          return res.status(401).json({
            mensagem: "Email ou senha inválidos"
          })
        }
        return bcrypt.compare(req.body.password, u.password);
      })
      .then(result => {
        if(!result){
          res.status(401).json({
            mensagem: "Email ou senha inválidos"
          })
        }
        const token = jwt.sign(
          {
            email: user.email,
            id: user._id
          },
          'minhasenha',
          {expiresIn: '1h'}
        )
        res.status(200).json({
          token: token,
          expiresIn: 3600,
          idUsuario: user._id
        });
      })
      .catch(err => {
        try{
          res.status(401).json({
            mensagem: "Login falhou: " + err
          })
        }catch{}
      })
  })


app.put("/MaoNaMassa/signup", (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const usuario = new Usuario({
        email: req.body.email,
        password: hash,
      });
      usuario
        .save()
        .then((result) => {
          res.status(201).json({
            mensagem: "Ok",
            resultado: result,
          });
        })
        .catch((err) => {
          res.status(500).json({
            mensagem: "Erro com as credenciais",
          });
        });
    })
    .catch((erro) => {
      console.log(erro);
      res.status(500).json({
        mensagem: "Tente novamente mais tarde",
      });
    });
});

app.post("/MaoNaMassa", (req, res, next) => {
  
  try{
    functions[req.body.type](req.body.data)
    console.log(req.body.type)
  }catch(err){}
  res.send({msg:'ok'}).status(201)

});

app.listen(9000,async()=>{
  
  console.log("Usuario: porta 9000")

  try{
    const ret = await axios.get(eventBusURL)
      .catch(()=>{})
    ret.data.forEach((value, index)=>{
      try{
        functions[value.type](value.data)
      }catch(err){}
    })
  }catch{}
})

