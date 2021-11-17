FROM timbru31/java-node:latest AS build-env
WORKDIR /app
COPY . .
RUN npm ci && npm run openapi-generate-all && npm run buildprod


FROM nginx:alpine
COPY --from=env /app/dist/tuckman /usr/share/nginx/html
EXPOSE 80