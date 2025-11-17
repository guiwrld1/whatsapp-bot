import express from "express";
import bodyParser from "body-parser";
import twilio from "twilio";

const MessagingResponse = twilio.twiml.MessagingResponse;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/webhook", (req, res) => {
  const twiml = new MessagingResponse();
  twiml.message("Recebi a tua mensagem mano já estamos vivos 😎");

  res.type("text/xml");
  res.send(twiml.toString());
});

app.get("/", (req, res) => {
  res.send("Bot WhatsApp está a bombar 💥");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor ON na porta ${PORT}`));
