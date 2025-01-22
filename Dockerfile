FROM node:23-alpine

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

EXPOSE 1987

CMD ["yarn", "dev", "--port=1987", "--host=0.0.0.0"]