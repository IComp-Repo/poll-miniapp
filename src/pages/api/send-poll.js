// /pages/api/send-poll.js
import { sendPoll } from "@/lib/telegram";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { question, options } = req.body;

    // Substitua pelo seu chat_id de teste
    const chatId = "SEU_CHAT_ID_DE_TESTE";

    await sendPoll(chatId, question, options);
    res.status(200).send("Poll enviada!");
  } else {
    res.status(405).send("Method not allowed");
  }
}
