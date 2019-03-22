source ./env/provision-live.env

docker run -v $VOLUME_CHALLENGES:/usr/share/nginx/html/challenges -v $VOLUME_LETSENCRYPT:/etc/letsencrypt certbot/certbot renew --agree-tos --email night@apricummedia.com -d augustfreytag.com --webroot -w /usr/share/nginx/html/challenges