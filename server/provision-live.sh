source ./cycle-live.env
source ./provision-live.env

docker-compose up -d
docker run -v $VOLUME_CHALLENGES:/usr/share/nginx/html/challenges -v $VOLUME_LETSENCRYPT:/etc/letsencrypt certbot/certbot certonly --agree-tos --email night@apricummedia.com -d augustfreytag.com --webroot -w /usr/share/nginx/html/challenges
docker run -v freytag_data-letsencrypt:/etc/letsencrypt frapsoft/openssl dhparam -dsaparam -out /etc/letsencrypt/dhparam-2048.pem 2048
docker-compose down