FROM oven/bun:1

RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "bunx prisma generate && bun run dev"]