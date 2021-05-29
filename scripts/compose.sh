#! /usr/bin/env zsh

DEBUG=0

BASEDIR=$(dirname "$0")
ROOTDIR=$(realpath "$BASEDIR/..")
DOCKERDIR="$ROOTDIR/server/docker"

if [[ $LIVE == '1' ]]; then
	DOCKERENV="$DOCKERDIR/env/parameters.live.private.env"
else
	DOCKERENV="$DOCKERDIR/env/parameters.dev.private.env"
fi

set -a
source "$DOCKERENV"
set +a

if [[ $DEBUG == '1' ]]; then
	APP_STARTUP_CMD="yarn dev-inspect-brk"
fi

set +e
mkdir "$SERVER_CERTIFICATE_DIRECTORY" &> /dev/null
mkdir "$SERVER_CERTIFICATE_LOG_DIRECTORY" &> /dev/null
set -e

if [[ $LIVE == '1' ]]; then
	docker-compose --file $DOCKERDIR/docker-compose.yml --project-directory $ROOTDIR $@
else
	docker compose --file $DOCKERDIR/docker-compose.yml --project-directory $ROOTDIR $@	
fi