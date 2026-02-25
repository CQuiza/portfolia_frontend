# Stage 1
FROM node:20-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2
FROM alpine
WORKDIR /app
COPY --from=build-stage /app/dist /app/dist
CMD ["cp", "-rv", "/app/dist/.", "/app/dist"]