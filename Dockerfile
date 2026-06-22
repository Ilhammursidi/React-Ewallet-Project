FROM node:24.16.0-alpine AS builder

WORKDIR /app

ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.31.0-alpine3.23-slim

COPY --from=builder /app/dist /usr/share/nginx/html

COPY --from=builder /app/nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 81

CMD ["sh", "-c", "nginx -g 'daemon off;'"]