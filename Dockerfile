# Sadece Nginx kullanıyoruz, inşaat (build) aşamasını sildik!
FROM nginx:stable-alpine

# Senin bilgisayarında oluşacak olan 'dist' klasörünü doğrudan içeri alıyoruz
COPY dist /usr/share/nginx/html

# Nginx standart olarak 80 portunda çalışır
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]