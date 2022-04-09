#! /usr/bin/env sh

BASE_DIR=$(dirname "$0")
ROOT_DIR=$(realpath "$BASE_DIR/..")

docker compose --file "$ROOT_DIR/server/docker/docker-compose.yml" --project-name freytag --project-directory "$ROOT_DIR" --env-file "$ROOT_DIR/server/docker/env/parameters.production.env" $@