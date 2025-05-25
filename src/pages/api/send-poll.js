import { sendPoll } from "@/lib/telegram";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { question, options } = req.body;

    const chatId = "-1002399252478"; 

    await sendPoll(chatId, question, options);
    res.status(200).send("Poll enviada!");
  } else {
    res.status(405).send("Method not allowed");
  }
}
