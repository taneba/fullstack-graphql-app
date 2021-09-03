FROM node:16-alpine as build

WORKDIR "/usr/src/fga-server"

RUN apk update && \
    apk add git
COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY . .
RUN npx tsc

FROM node:16-alpine

ARG WORKDIR=/usr/src/fga-server
WORKDIR ${WORKDIR}

RUN apk update && \
    apk add git

COPY --from=build ${WORKDIR}/dist ./dist
COPY ./package.json ${WORKDIR}
COPY ./yarn.lock ${WORKDIR}
RUN yarn install --production

EXPOSE 4000

CMD node ./dist/index.js