FROM node:22.14.0

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY --chown=www-data:www-data . .

# Cài nodemon dev mode
RUN npm install -g nodemon

#RUN usermod -u 1000 www-data && groupmod -g 1000 www-data
RUN chown -R www-data:www-data /usr/src/app

RUN npm run build

CMD ["node", "dist/main"]
