#! /usr/bin/env zsh

BASEDIR=$(dirname "$0")
ROOTDIR=$(realpath "$BASEDIR/..")
DOCKERDIR="$ROOTDIR/server/docker"
DOCKERENV="$DOCKERDIR/env/parameters.dev.private.env"

set -a
source "$DOCKERENV"
set +a

set +e
mkdir "$SERVER_CERTIFICATE_DIRECTORY" &> /dev/null
mkdir "$SERVER_CERTIFICATE_LOG_DIRECTORY" &> /dev/null
set -e

docker compose --file $DOCKERDIR/docker-compose.yml --project-directory $ROOTDIR $@