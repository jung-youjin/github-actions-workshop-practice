FROM node:slim

COPY package*.json ./

RUN apt-get -y update

RUN npm install

COPY . .

CMD [ "node", "/src/index.js" ]
