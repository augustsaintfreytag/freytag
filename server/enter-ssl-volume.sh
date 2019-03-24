BASE=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )

source "$BASE/env/provision-dev.env"
docker run -ti --rm -v $VOLUME_SSL:/etc/letsencrypt -w /etc/letsencrypt alpine /bin/sh