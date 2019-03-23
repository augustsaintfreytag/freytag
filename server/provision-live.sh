source ./env/cycle-live.env
source ./env/provision-live.env

docker-compose up -d
docker run --rm -v $VOLUME_SSL:/etc/letsencrypt alpine /bin/sh -c "rm -rf /etc/letsencrypt/live/*"
docker run -v $VOLUME_CHALLENGES:/usr/share/nginx/html/challenges -v $VOLUME_SSL:/etc/letsencrypt certbot/certbot certonly --agree-tos --email night@apricummedia.com $DOMAIN_NAME_PARAMS --webroot -w /usr/share/nginx/html/challenges
docker run -v freytag_data-letsencrypt:/etc/letsencrypt frapsoft/openssl dhparam -dsaparam -out /etc/letsencrypt/dhparam-2048.pem 2048
docker-compose down