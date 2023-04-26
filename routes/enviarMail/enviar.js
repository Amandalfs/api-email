const sgMail = require('@sendgrid/mail')
const { config } = require('dotenv');
const { text } = require('express');
config()

const validarEntradaDeDadosBody = (req, res, next) => {
    const {texto, emailReceive, titulo} = req.body;

    const errors = [];

    if(!texto){
        errors.push("Campo texto vazio")
    } 

    if(!emailReceive){
        errors.push("Email vazio");
    }

    if(!titulo){
        errors.push("Titulo Vazio");
    }

    if(errors.length!==0){
        res.status(400).send({errors})
        return
    }
    const dadosBodyTratado = {texto, emailReceive, titulo}
    next();
}

const enviarEmail = (app)=>{
    app.route('/send')
        .post(validarEntradaDeDadosBody,(req, res)=>{
            const {texto, emailReceive, titulo} = req.body
            
            try {   
                const msg = {
                    to: emailReceive, // Change to your recipient
                    from: process.env.EmailSend, // Change to your verified sender
                    subject: titulo,
                    text: texto,
                    html: `<p>${texto}</p>`,
                }
    
                sgMail.setApiKey(process.env.SENDGRID_API_KEY)
                sgMail
                .send(msg)
                    .then(() => {
                        console.log('Email send')
                        res.status(201).send("Email Enviado")
                        return
                    })
                    .catch((error2) => {
                        console.error(error2)
                        res.send({error2})
                })

            } catch (error) {
                console.log(error)
                res.send(error)
            }
           
        })
}

module.exports = enviarEmail