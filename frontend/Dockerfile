# frontend/Dockerfile

FROM node:18-slim

WORKDIR /app

# 必要なパッケージをインストール
COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
