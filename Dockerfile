FROM node:14.16.0-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin;$PATH

COPY package.json ./
RUN yarn 

COPY . ./

CMD ["yarn","start"]