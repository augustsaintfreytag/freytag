if [ "$APP_ENVIRONMENT" = "LIVE" ]
then
	source ./env/cycle-live.env
else
	source ./env/cycle-dev.env
fi

docker-compose $@