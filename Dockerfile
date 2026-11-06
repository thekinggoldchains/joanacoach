# Etapa 1: Dependências
FROM node:20-alpine AS dependencias
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

COPY package.json package-lock.json* ./
COPY prisma ./prisma/
RUN npm ci

# Etapa 2: Build da aplicação Next.js (Standalone)
FROM node:20-alpine AS construtor
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

COPY --from=dependencias /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
RUN npx prisma generate
RUN npm run build

# Etapa 3: Imagem enxuta de produção para EasyPanel
FROM node:20-alpine AS producao
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=construtor /app/public ./public
COPY --from=construtor --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=construtor --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
