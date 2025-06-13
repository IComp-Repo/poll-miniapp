import axios from "axios";
import { API_ROUTES } from "./routes";

interface ReplyMarkup {
  reply_markup?: any;
}

export async function sendMessage(
  chatId: number | string,
  text: string,
  replyMarkup: ReplyMarkup = {}
): Promise<void> {
  try {
    await axios.post(API_ROUTES.POLLS.MESSAGE, {
      chat_id: chatId,
      text,
      ...replyMarkup,
    });
  } catch (error) {
    console.error("Erro ao enviar mensagem para o Telegram:", error);
  }
}

export async function sendPoll(
  chatId: number | string,
  question: string,
  options: string[]
): Promise<void> {
  await axios.post(API_ROUTES.POLLS.CREATE, {
    chat_id: chatId,
    question,
    options,
    is_anonymous: false,
  });
}
