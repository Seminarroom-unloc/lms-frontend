# Stage 1: Build the frontend
FROM node:18 AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL
