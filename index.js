import express from "express"
import bodyParser from "body-parser"
import MessagingResponse from "twilio/lib/twiml/MessagingResponse.js"

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))

app.post("/webhook", (req, res) => {
  const twiml = new MessagingResponse()
  twiml.message("Recebi a tua mensagem mano já estamos vivos 😎")

  res.type("text/xml")
  res.send(twiml.toString())
})

app.get("/", (req, res) => {
  res.send("Bot WhatsApp está a bombar 💥")
})

app.listen(3000, () => console.log("Servidor ON na porta 3000"))
