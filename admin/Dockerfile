# admin/Dockerfile
FROM node:22-alpine

# Set working directory
WORKDIR /admin

# Install bash/sh utilities (optional, handy for exec)
RUN apk add --no-cache bash

# Expose Vite dev server port
EXPOSE 5178

# Default command: install deps and start Vite dev server
CMD ["sh", "-c", "npm install && npm run dev -- --host"]
