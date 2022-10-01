FROM node:18-alpine as prod

WORKDIR /code

COPY package.json ./

RUN npm install

COPY . .

ENTRYPOINT [ "npm", "start" ]


FROM node:18-alpine as debug

WORKDIR /code

COPY package.json .

RUN npm install --include="dev"

COPY . .

ENTRYPOINT [ "npm", "run", "debug" ]