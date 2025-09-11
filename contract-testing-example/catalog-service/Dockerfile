FROM node:18

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

# Primero levanta el server, luego corre las pruebas pact
CMD ["npm", "run", "test:pact"]
