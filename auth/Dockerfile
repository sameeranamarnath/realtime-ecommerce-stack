FROM node:alpine

RUN yarn global add node-gyp 
WORKDIR /app
COPY package.json . 
RUN npm install --omit=dev
COPY  . .

CMD ["npm", "start"]