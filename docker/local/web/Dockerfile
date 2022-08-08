FROM node:16-alpine3.15
WORKDIR /web
COPY ./web .
RUN npm config set legacy-peer-deps true
RUN npm install
CMD ["npm","run","start"]