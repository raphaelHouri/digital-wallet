# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build TypeScript code
RUN npx tsc

# Expose the port that the application will run on
EXPOSE 5002

# Define the command to run the application
CMD ["node", "./dist/app.js"]