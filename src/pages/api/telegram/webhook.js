// /pages/api/telegram/webhook.js
import { sendMessage } from "@/lib/telegram";

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("=== UPDATE RECEBIDO ===");
    console.log(JSON.stringify(req.body, null, 2));
    const update = req.body;

    if (update.poll_answer) {
      // Resposta do aluno
      const { user, poll_id, option_ids } = update.poll_answer;
      const resposta = option_ids[0];
      // Exemplo: se a opção correta for 1
      const correto = resposta === 1 ? "✅ Correto!" : "❌ Errado!";
      await sendMessage(user.id, correto);
    }

    res.status(200).send("OK");
  } else {
    res.status(405).send("Method not allowed");
  }
}
