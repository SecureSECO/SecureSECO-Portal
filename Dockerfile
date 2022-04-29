FROM node:18 as build

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

RUN npm run build

FROM scratch
COPY --from=build /app/dist /dist
