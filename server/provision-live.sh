source ./env/ycle-live.env
source ./env/provision-live.env

docker-compose up -d
docker run -v $VOLUME_CHALLENGES:/usr/share/nginx/html/challenges -v $VOLUME_SSL:/etc/letsencrypt certbot/certbot certonly --agree-tos --email night@apricummedia.com -d $DOMAIN_NAMES_SSL --webroot -w /usr/share/nginx/html/challenges
docker run -v freytag_data-letsencrypt:/etc/letsencrypt frapsoft/openssl dhparam -dsaparam -out /etc/letsencrypt/dhparam-2048.pem 2048
docker-compose down