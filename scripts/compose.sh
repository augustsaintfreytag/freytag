#! /usr/bin/env zsh

BASE_DIR=$(dirname "$0")
ROOT_DIR=$(realpath "$BASE_DIR/..")

# Environment

DOCKER_DIR="$ROOT_DIR/server/docker"
DOCKER_ENV="$DOCKER_DIR/env/parameters.local.env"

set -a
source "$DOCKER_ENV"
set +a

# Modifier: Node Inspector

if [[ $DEBUG == "1" ]]; then
	APP_STARTUP_CMD="yarn dev-inspect-brk"
fi

# Modifier: Simulated Production

if [[ $DEBUG_PRODUCTION == "1" ]]; then
	APP_STARTUP_CMD="yarn live"
fi

# Execution

docker compose --file $DOCKER_DIR/docker-compose.yml --project-name=freytag --project-directory $ROOT_DIR $@