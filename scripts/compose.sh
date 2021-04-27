#! /usr/bin/env zsh

BASEDIR=$(dirname "$0")
ROOTDIR=$(realpath "$BASEDIR/..")
DOCKERDIR="$ROOTDIR/server/docker"
ENVDIR="$ROOTDIR/server/docker/env"

docker compose --file $DOCKERDIR/docker-compose.yml --project-directory $ROOTDIR --env-file "$ENVDIR/parameters.dev.private.env" $@