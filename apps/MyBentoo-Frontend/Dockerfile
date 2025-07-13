# Étape 1 : builder l'app avec Node
FROM node:20 AS builder

WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile
RUN yarn build
