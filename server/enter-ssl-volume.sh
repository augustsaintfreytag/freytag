BASE=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )

source "$BASE/env/provision-dev.env"
docker run -ti --rm -v $DOCKER_VOLUME:/etc/letsencrypt alpine /bin/sh