FROM node:18-alpine as prod

ENV PROD=1

WORKDIR /work

# default to port 80 for node
ARG PORT=80
ENV PORT $PORT

COPY package.json .

RUN npm install

COPY . .

ENTRYPOINT [ "npm", "start" ]


FROM node:18-alpine as debug

ENV PROD=

WORKDIR /work

# default to port 80 for node
ARG PORT=80
ENV PORT $PORT

COPY package.json .

RUN npm install --include="dev"

COPY . .

ENTRYPOINT [ "npm", "run", "debug" ]