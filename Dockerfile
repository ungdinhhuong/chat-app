FROM node:22.14.0

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install -g @nestjs/cli

RUN npm install

COPY --chown=node:node . .

RUN #usermod -u 1000 www-data && groupmod -g 1000 www-data
RUN chown -R node:node /usr/src/app

USER node

CMD ["npm", "run", "start:dev"]