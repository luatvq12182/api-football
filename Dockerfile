FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8888

# Start the application
CMD ["npm", "run", "start:prod"]