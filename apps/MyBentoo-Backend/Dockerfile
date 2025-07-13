FROM node:20-alpine

WORKDIR /app

# Copie des dépendances d'abord pour cache efficace
COPY package*.json ./
RUN npm install --frozen-lockfile

# Copie du reste des fichiers
COPY . .

# Compilation du code TypeScript
RUN npm run build

# Variables d’environnement injectées à l'exécution, pas au build
EXPOSE 3000

CMD ["node", "dist/main"]