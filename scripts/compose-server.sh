#! /usr/bin/env sh
# shellcheck disable=SC2068

BASE_DIR=$(dirname "$0")
ROOT_DIR=$(realpath "$BASE_DIR/..")

DOCKER_DIR="$ROOT_DIR/server/docker"
DOCKER_ENV="$DOCKER_DIR/env/parameters.production.env"

docker compose --file "$ROOT_DIR/server/docker/docker-compose.yml" --project-name freytag --project-directory "$ROOT_DIR" --env-file "$DOCKER_ENV" $@