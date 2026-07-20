FROM ubuntu:latest

RUN apt-get update \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends nginx \
    && sed -i 's/listen 80 default_server;/listen 7000 default_server;/' /etc/nginx/sites-available/default \
    && sed -i 's/listen \[::\]:80 default_server;/listen [::]:7000 default_server;/' /etc/nginx/sites-available/default \
    && rm -rf /var/lib/apt/lists/*

EXPOSE 7000

CMD ["nginx", "-g", "daemon off;"]


