# Use an official Node runtime as the parent image
FROM node:18 as build-stage

# Set the working directory in the container to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY ./webapp/package*.json ./

# Install the app dependencies
RUN npm install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY ./webapp .

# Build the React app for production
RUN npm run build

# Use nginx to serve the built React app
FROM nginx:1.21.0-alpine

# Copy the React build from the build environment
COPY --from=build-stage /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
