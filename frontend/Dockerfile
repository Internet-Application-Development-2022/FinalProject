FROM node:18-alpine

WORKDIR /work

# default to port 80 for node
ARG PORT=80
ENV PORT $PORT

COPY package.json ./

RUN npm install

COPY . .

ENTRYPOINT [ "npm", "start" ]