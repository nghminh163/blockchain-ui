# Build BASE
FROM node:16-alpine as BASE
WORKDIR /app
COPY package.json .
RUN yarn
COPY . .
RUN yarn build
EXPOSE 3000

CMD ["yarn", "start"]
