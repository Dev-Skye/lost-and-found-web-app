# ---------- BUILD STAGE ----------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# build Vite app
RUN npm run build

# ---------- PRODUCTION STAGE ----------
FROM nginx:alpine

# copy built app to nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# expose port
EXPOSE 80

# start nginx
CMD ["nginx", "-g", "daemon off;"]