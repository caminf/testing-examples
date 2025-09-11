FROM node:18

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

# Ejecuta las pruebas y genera el contrato
CMD ["npm", "test"]
