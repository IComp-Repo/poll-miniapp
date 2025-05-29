import axios from "axios";

const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;

export async function sendMessage(chatId, text,replyMarkup = {}) {
  await axios.post(`${TELEGRAM_API}/sendMessage`, {
    chat_id: chatId,
    text,
    ...replyMarkup,
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
