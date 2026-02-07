# frontend/Dockerfile
FROM node:20-alpine

# Create app directory
WORKDIR /frontend

# Install bash/sh utilities (optional, handy for exec)
RUN apk add --no-cache bash

# Expose Vite dev server port
EXPOSE 5173

# Start the Vite dev server on container run
CMD ["sh", "-c", "npm install && npm run dev -- --host"]
