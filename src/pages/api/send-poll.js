import { sendPoll } from "@/lib/telegram";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { question, options, chatId } = req.body;

    // Envie a Poll pro grupo selecionado
    await sendPoll(chatId, question, options);

    res.status(200).send("Poll enviada para o grupo selecionado!");
  } else {
    res.status(405).send("Method not allowed");
  }
}
