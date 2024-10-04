# Dockerfile para el Backend (Node.js)
FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json al contenedor
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código al contenedor
COPY . .

# Exponer el puerto 3000
EXPOSE 3000

# Iniciar la aplicación Node.js
CMD ["node", "server.js"]
