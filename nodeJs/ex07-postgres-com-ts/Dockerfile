FROM node:18.17.0-alpine

WORKDIR /usr/app

RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

EXPOSE 3000

CMD ["pnpm", "dev"]