source ./cycle-live.env
export NGINX_CONF_NAME="nginx.dev.conf"

docker-compose up proxy -d
docker-compose exec certbot /bin/bash -c "certbot renew"
docker-compose exec certbot /bin/bash -c "openssl dhparam -out /var/lib/letsencrypt/dhparam-2048.pem"
docker-compose down