# using nodejs image
FROM node:16.17

WORKDIR ./app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "start"]