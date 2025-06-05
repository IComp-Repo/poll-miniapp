import { sendPoll, sendMessage } from "@/lib/telegram";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const update = req.body;
    console.log("UPDATE:", JSON.stringify(update, null, 2));
    const message = update.message;
    const text = message?.text;
    const entities = message?.entities;
    const chatId = message?.chat?.id;

    if (text === "/start") {
      console.log("Usuário iniciou o bot com /start:", chatId);

      await sendMessage(chatId, "Vamos começar 🖥️\nUse o botão abaixo para criar uma enquente!", {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Criar enquente",
                web_app: { url: "https://poll-miniapp.vercel.app/" }, 
              },
            ],
          ],
        },
      });

      res.status(200).send("ok");
      return;
    }

    res.status(200).send("ok");
  } else {
    res.status(405).send("Method not allowed");
  }
}
