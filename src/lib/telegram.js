import axios from "axios";

const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;

export async function sendMessage(chatId, text, options = {}) {
  await axios.post(`${TELEGRAM_API}/sendMessage`, {
    chat_id: chatId,
    text,
    ...options,
  });
}

export async function sendPoll(chatId, question, options) {
  await axios.post(`${TELEGRAM_API}/sendPoll`, {
    chat_id: chatId,
    question,
    options,
    is_anonymous: false,
  });
}
