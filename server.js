const express = require('express');
const cors = require('cors')

const app = express();

app.use(express.json());
app.use(cors());

app.listen(8020, ()=>{
    console.log("Servidor Ativo")
})

app.get('/', (req, res)=>{
    res.send("Servidor funcionando")    
})