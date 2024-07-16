FROM node:20.11.0

WORKDIR /app

RUN rm -rf node_modules

COPY package.json package-lock.json ./

RUN npm install --pure-lockfile

COPY . .

RUN npm run build

RUN mkdir /app/logs

EXPOSE 3040

CMD [ "npm", "run", "start:prod" ]
