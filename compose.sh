if [ "$APP_ENVIRONMENT" = "LIVE" ]
then
	echo "Loading environment variables for LIVE."
	source ./server/cycle-live.env
else
	echo "Loading environment variables for DEV."
	source ./server/cycle-dev.env
fi

docker-compose $@