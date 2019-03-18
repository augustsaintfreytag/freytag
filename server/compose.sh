if [ "$APP_ENVIRONMENT" = "LIVE" ]
then
	source ./server/cycle-live.env
else
	source ./server/cycle-dev.env
fi

docker-compose $@