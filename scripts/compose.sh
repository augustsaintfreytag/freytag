#! /usr/bin/env zsh

BASEDIR=$(dirname "$0")
ROOTDIR=$(realpath "$BASEDIR/..")

DOCKERDIR="$ROOTDIR/server/docker"
DOCKERENV="$DOCKERDIR/env/parameters.dev.env"

set -a
source "$DOCKERENV"
set +a

if [[ $DEBUG == "1" ]]; then
	APP_STARTUP_CMD="yarn dev-inspect-brk"
fi

if [[ $DEBUG_PRODUCTION == "1" ]]; then
	APP_STARTUP_CMD="yarn live"
fi

docker compose --file $DOCKERDIR/docker-compose.yml --project-name=freytag --project-directory $ROOTDIR $@