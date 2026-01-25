# admin/Dockerfile

FROM node:22-alpine

# Create app directory
WORKDIR /admin

# Copy only package files first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the admin code
COPY . .

# Expose Vite dev server port
EXPOSE 5178

# Start the Vite dev server on container run
CMD ["npm", "run", "dev", "--", "--host"]
