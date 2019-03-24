BASE=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )

if [ "$APP_ENVIRONMENT" = "LIVE" ]
then
	source "$BASE/server/env/cycle-live.env"
else
	source "$BASE/server/env/cycle-dev.env"
fi

docker-compose $@