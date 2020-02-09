FROM node:12-alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 6454/udp

CMD [ "node", "app" ]
