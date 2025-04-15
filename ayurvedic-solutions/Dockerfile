FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install
# RUN npm install @toolpad/core
COPY . .

EXPOSE 4500

CMD ["npm", "run", "start"]