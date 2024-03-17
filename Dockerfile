# Use the Node 21 image as the base image
FROM node:21

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json if present
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Env variable 
ENV PORT 7000
# Expose the port the app runs on
EXPOSE $PORT

# Command to run the application
CMD ["npm", "run","dev"]
