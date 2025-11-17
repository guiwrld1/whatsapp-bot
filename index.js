import express from "express";
import bodyParser from "body-parser";
import twilio from "twilio";
import OpenAI from "openai";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/webhook", async (req, res) => {
  const incomingMsg = req.body.Body || "";

  // Chamada ao ChatGPTimport express from "express";
import bodyParser from "body-parser";
import twilio from "twilio";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const respostas = [
  { trigger: /oi|olá|ola/i, reply: "Olá! Como posso ajudar-te hoje? 😎" },
  { trigger: /preço|valor|quanto/i, reply: "Os nossos preços variam conforme o produto. Qual te interessa? 💰" },
  { trigger: /produto|produto x/i, reply: "O Produto X é top! Posso enviar-te mais detalhes 📦" },
  { trigger: /ajuda|suporte/i, reply: "Claro! Qual é a tua dúvida? Estou aqui para ajudar 🛠️" },
  { trigger: /.*/i, reply: "Ups! Não percebi bem, podes reformular? 🤔" } // fallback
];

app.post("/webhook", (req, res) => {
  const incomingMsg = req.body.Body || "";
  
  // encontra a primeira resposta que case com a mensagem
  const resposta = respostas.find(r => r.trigger.test(incomingMsg));
  const reply = resposta ? resposta.reply : "Ups! Algo correu mal 😅";

  const twiml = new twilio.twiml.MessagingResponse();
  twiml.message(reply);

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

app.get("/", (req, res) => {
  res.send("Bot WhatsApp gratuito está a bombar 💥");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor ON na porta ${PORT}`));

  let reply = "Ups algo correu mal 😅";
  try {
    const gptResponse = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: incomingMsg }]
    });
    reply = gptResponse.choices[0].message.content;
  } catch (err) {
    console.error(err);
  }

  const twiml = new twilio.twiml.MessagingResponse();
  twiml.message(reply);

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

app.get("/", (req, res) => {
  res.send("Bot WhatsApp com IA está a bombar 💥");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor ON na porta ${PORT}`));
