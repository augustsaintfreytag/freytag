# Clean Mode: Stash existing live certificates away, provision and start development server, move live back and renew.

BASE=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
source "$BASE/env/cycle-live.env"
source "$BASE/env/provision-live.env"

docker run --rm -v $VOLUME_SSL:/etc/letsencrypt alpine /bin/sh -c "mv /etc/letsencrypt/live /etc/letsencrypt/live-displaced"

$BASE/provision-dev.sh

source "$BASE/env/provision-live.env"

docker-compose up -d
docker run --rm -v $VOLUME_SSL:/etc/letsencrypt alpine /bin/sh -c "rm -rf /etc/letsencrypt/live && mv /etc/letsencrypt/live-displaced /etc/letsencrypt/live"

for DOMAIN_NAME in $(echo $DOMAIN_NAME_PARAMS | sed "s/,/ /g")
do
    echo "Creating new certificate for domain '$DOMAIN_NAME'."
	docker run -v $VOLUME_CHALLENGES:/usr/share/nginx/html/challenges -v $VOLUME_SSL:/etc/letsencrypt certbot/certbot certonly --agree-tos --email night@apricummedia.com $DOMAIN_NAME --webroot -w /usr/share/nginx/html/challenges
done

docker run -v $VOLUME_SSL:/etc/letsencrypt frapsoft/openssl dhparam -dsaparam -out /etc/letsencrypt/dhparam-2048.pem 2048
docker-compose down