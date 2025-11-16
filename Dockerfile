# Use an official Node.js runtime as a parent image with the required version
FROM node:18.13.0-alpine

# Set the working directory
WORKDIR /app

# Install wget for health checks
RUN apk add --no-cache wget

# Build arguments for environment
ARG NODE_ENV=production
ARG BUILD_ID=unknown
# Use BUILD_ID to force cache invalidation on each deployment
# This ensures we always rebuild with latest code even if files haven't changed
LABEL build_id=${BUILD_ID}
# Echo BUILD_ID to create a layer that changes on each deployment, forcing cache invalidation
RUN echo "Build ID: ${BUILD_ID}"

# Copy package files
COPY package*.json yarn.lock ./

# Install dependencies using Yarn (including devDependencies needed for build)
RUN yarn install --frozen-lockfile --production=false

# Copy the rest of the application code
COPY . .

ENV NODE_ENV=${NODE_ENV}
ENV BUILD_ID=${BUILD_ID}

# Conditionally run the build step based on the environment
RUN if [ "$NODE_ENV" = "production" ]; then yarn build; fi

# Expose the port that the app runs on
EXPOSE 4000

# Start the application
CMD ["node", "dist/main"]

