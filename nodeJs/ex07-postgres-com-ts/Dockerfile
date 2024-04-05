FROM node:18.17.0-alpine

RUN npm install -g pnpm

WORKDIR /usr
COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm build
EXPOSE 3000

CMD ["pnpm", "start"]