# Renew Mode: Let existing certificates be overwritten by certbot if renew is due.

BASE=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
source "$BASE/env/cycle-live.env"
source "$BASE/env/provision-live.env"

docker-compose down proxy
docker run -p 80:80 -v $VOLUME_CHALLENGES:/usr/share/nginx/html/challenges -v $VOLUME_SSL:/etc/letsencrypt certbot/certbot renew --standalone -preferred-challenges http --agree-tos --email night@apricummedia.com
docker run -v $VOLUME_SSL:/etc/letsencrypt frapsoft/openssl dhparam -dsaparam -out /etc/letsencrypt/dhparam-2048.pem 2048
docker-compose up proxy