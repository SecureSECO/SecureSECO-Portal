FROM node:12.22.9

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

CMD [ "npm", "run", "build" ]
