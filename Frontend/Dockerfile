# Use the official Node.js image as a base image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the application port 
EXPOSE 5173

# Start the application with the development command
CMD ["npm", "run", "dev"]



