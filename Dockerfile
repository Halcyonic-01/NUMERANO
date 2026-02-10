# Base stage
FROM node:20-alpine as base
WORKDIR /app
COPY package*.json ./
RUN npm install

# Development stage
FROM base as dev
ENV NODE_ENV=development
COPY . .
CMD ["npm", "run", "dev", "--", "--host"]

# Build stage
FROM base as build
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine as prod
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
