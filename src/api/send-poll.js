import { sendPoll } from "@/lib/telegram";

export default async function handler(req, res) {
  const { chat_id, question, options, is_anonymous = false } = req.body;

  try {
    await sendPoll(chat_id, question, options, is_anonymous);
    res.status(200).send("Enquete enviada");
  } catch (err) {
    res.status(500).send("Erro ao enviar enquete");
  }
}
