FROM node:23-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 1987

ENTRYPOINT ["yarn", "dev", "--", "--port=1987", "--host=0.0.0.0"]