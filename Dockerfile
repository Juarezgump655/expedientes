
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


FROM nginx:1.25-alpine


RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/build /usr/share/nginx/html


EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
