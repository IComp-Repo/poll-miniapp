# Stage 1 - Build
FROM node:22-alpine AS builder

WORKDIR /app

# Copiar arquivos de dependências
COPY package.json package-lock.json* ./

# Instalar dependências (inclui dev deps, necessárias pro build)
RUN npm ci

# Copiar o restante do código
COPY . .

# Buildar Next.js
RUN npm run build


# Stage 2 - Production
FROM node:22-alpine AS runner

WORKDIR /app

# Definir ambiente de produção
ENV NODE_ENV=production

# Copiar apenas os arquivos necessários da build
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Porta que o Next.js roda
EXPOSE 3000

# Rodar a aplicação
CMD ["npm", "start"]
