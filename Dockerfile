FROM node:16-alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn install

COPY . .

EXPOSE 8080

RUN yarn build

CMD [ "yarn", "run", "dev" ]