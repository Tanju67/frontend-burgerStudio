FROM nginx:stable-alpine

# Senin yaptığın:
COPY dist /usr/share/nginx/html

# EKSİK OLAN VE EKLEMEN GEREKEN:
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]