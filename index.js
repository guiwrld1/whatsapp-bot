import express from "express";
import bodyParser from "body-parser";
import twilio from "twilio";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/webhook", (req, res) => {
  const twiml = new twilio.twiml.MessagingResponse();
  twiml.message("Recebi a tua mensagem mano já estamos vivos 😎");

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

app.get("/", (req, res) => {
  res.send("Bot WhatsApp está a bombar 💥");
});

// usar a porta do Render ou 3000 local
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor ON na porta ${PORT}`));
