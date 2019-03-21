if [ "$APP_ENVIRONMENT" = "LIVE" ]
then
	source ./cycle-live.env
else
	source ./cycle-dev.env
fi

docker-compose $@