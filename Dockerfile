# Use the official Node.js 18 base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the project files to the working directory
COPY . .

# Expose the port on which your Node.js application is listening
EXPOSE 3000

# Start the Node.js application
CMD [ "npm", "start" ]
