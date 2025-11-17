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

  // Chamada ao ChatGPT
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
