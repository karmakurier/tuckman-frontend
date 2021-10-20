FROM node:alpine AS build-env
WORKDIR /app
COPY . .
RUN npm ci && npm run build


FROM nginx:alpine
COPY --from=env /app/dist/tuckman /usr/share/nginx/html
EXPOSE 80