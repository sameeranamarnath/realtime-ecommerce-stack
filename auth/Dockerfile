FROM node:alpine

RUN yarn global add node-gyp 
WORKDIR /app
COPY package.json . 
RUN npm install
COPY  . .

CMD ["npm", "start"]