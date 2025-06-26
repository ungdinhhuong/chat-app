FROM node:22.14.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY --chown=node:node . .

RUN chown -R node:node /app

USER node

CMD ["npm", "run", "dev"]
