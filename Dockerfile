# 1. AŞAMA: Projeyi Build Etme (Derleme)
FROM node:20-slim AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2. AŞAMA: Sunucuya Koyma (Nginx)
FROM nginx:stable-alpine
# Vite'ın ürettiği 'dist' klasörünü Nginx'in yayın klasörüne taşıyoruz
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]