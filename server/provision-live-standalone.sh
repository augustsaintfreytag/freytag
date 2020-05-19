# Clean Mode Standalone: Shut down proxy, let Certbot run in standalone mode for creation, restart proxy.

BASE=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
source "$BASE/env/cycle-live.env"
source "$BASE/env/provision-live.env"

docker-compose stop proxy

for DOMAIN_NAME in $(echo $DOMAIN_NAME_PARAMS | sed "s/,/ /g")
do
    echo "Creating new certificate for domain '$DOMAIN_NAME'."
	docker run -v $VOLUME_CHALLENGES:/usr/share/nginx/html/challenges -v $VOLUME_SSL:/etc/letsencrypt certbot/certbot certonly --standalone -preferred-challenges http --agree-tos --email night@apricummedia.com -d $DOMAIN_NAME
done

docker run -v $VOLUME_SSL:/etc/letsencrypt frapsoft/openssl dhparam -dsaparam -out /etc/letsencrypt/dhparam-2048.pem 2048
docker-compose start proxy
