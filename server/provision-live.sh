source ./cycle-live.env
export NGINX_CONF_NAME="nginx.dev.conf"

docker-compose up -d proxy
docker-compose exec certbot /bin/bash -c "run -d augustfreytag.com,www.augustfreytag.com --webroot /usr/share/nginx/html/challenges"
docker-compose exec certbot /bin/bash -c "openssl dhparam -out /var/lib/letsencrypt/dhparam-2048.pem"
docker-compose down