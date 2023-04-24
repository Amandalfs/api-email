const express = require('express');
const cors = require('cors')
const enviarEmail = require('./routes/enviarMail/enviar')

const app = express();

app.use(express.json());
app.use(cors());

//rotas
enviarEmail(app);


app.listen(8020, ()=>{
    console.log("Servidor Ativo")
})

app.get('/', (req, res)=>{
    res.send("Servidor funcionando")    
})