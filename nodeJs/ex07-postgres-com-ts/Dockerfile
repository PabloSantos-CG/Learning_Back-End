FROM node:18.17.0

WORKDIR /usr
RUN npm install -g pnpm

COPY package.json .
RUN pnpm install --force
COPY . .

CMD ["pnpm", "start"]