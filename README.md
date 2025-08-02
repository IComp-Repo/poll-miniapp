# Polls Bot 

Um miniapp de enquetes para professores, integrado ao Telegram! Crie e gerencie enquetes de forma simples e intuitiva, com integração direta em grupos do Telegram.


## 🖥️ Tecnologias usadas

- **Next.js** (framework React para frontend e backend)
- **Bootstrap** (estilização rápida e responsiva)
- **Axios** (requisições HTTP)
- **React-Toastify** (notificações toast)
- **Telegram Bot API** (integração com Telegram)
- **Telegram Mini Apps SDK** (https://docs.telegram-mini-apps.com/)

---

## ⚙️ Como rodar localmente

1️⃣ Clone o repositório:
```bash
git clone https://github.com/IComp-Repo/poll-miniapp.git
cd poll-miniapp
```

2️⃣ Instale as dependências:
```bash
npm install
```

3️⃣ Renomei o arquivo .env-example para .env as seguintes variáveis:
```bash
TELEGRAM_BOT_TOKEN=SEU_TOKEN_DO_BOT
WEBHOOK_URL=https://SEU_DOMINIO_NGROK/api/telegram/webhook
```

4️⃣ Rode o projeto em modo de desenvolvimento:
```bash
npm run dev
```
-> Acesse em: http://localhost:3000


## 🟦 Webhook do Telegram

Para receber atualizações do Telegram, use o ngrok:

ngrok http 3000

Configure o webhook do Telegram:

curl -X POST "https://api.telegram.org/botSEU_TOKEN_DO_BOT/setWebhook?url=https://SEU_DOMINIO_NGROK/api/telegram/webhook"


Link de instalação : https://ngrok.com/

## 🟦 Json de example para o DragDrop

-> perguntas.json.example