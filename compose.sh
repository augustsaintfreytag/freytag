if [ "$APP_ENVIRONMENT" = "LIVE" ]
then
	source ./server/env/cycle-live.env
else
	source ./server/env/cycle-dev.env
fi

docker-compose $@