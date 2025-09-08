# frontend/Dockerfile

FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy only package files first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Start the Vite dev server on container run
CMD ["npm", "run", "dev", "--", "--host"]
