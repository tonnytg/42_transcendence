FROM node:alpine

RUN npm install -g http-server

WORKDIR /app

COPY src /app

EXPOSE 3000

CMD ["http-server", "-p", "3000"]
