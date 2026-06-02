FROM node:alpine3.23 AS builder

WORKDIR /app

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

COPY package.json package-lock.json ./

RUN npm ci  

COPY . .

RUN npm run build

FROM nginx:alpine3.23

COPY --from=builder /app/dist /usr/share/nginx/html

COPY --from=builder /app/nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 81

CMD ["sh", "-c", "nginx -g 'daemon off;'"]