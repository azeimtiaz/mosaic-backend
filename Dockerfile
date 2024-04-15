
FROM node:latest


RUN npm install -g nodemon


WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .


EXPOSE 8081


CMD ["npm", "start"]

