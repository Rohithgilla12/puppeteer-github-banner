FROM zenika/alpine-chrome:89-with-node-14
# FROM node:14

USER root
ENV NODE_ENV=production
WORKDIR /src


COPY package.json ./
RUN yarn install
RUN npx tsc

COPY . .
EXPOSE 8080
CMD ["yarn" , "start"]