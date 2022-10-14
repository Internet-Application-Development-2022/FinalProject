FROM node:18-alpine as prod

ENV PROD=1

WORKDIR /work

# default to port 80 for node
ARG PORT=80
ENV PORT $PORT

COPY backend/ backend/
COPY shared/ shared/

WORKDIR /work/backend

RUN npm install

ENTRYPOINT [ "npm", "start" ]


FROM node:18-alpine as debug

ENV PROD=

WORKDIR /work

# default to port 80 for node
ARG PORT=80
ENV PORT $PORT

COPY backend/ backend/
COPY shared/ shared/

WORKDIR /work/backend

RUN npm install --include="dev"

ENTRYPOINT [ "npm", "run", "debuggable" ]