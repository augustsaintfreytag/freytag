#! /usr/bin/env sh
# shellcheck disable=SC2068

# Cockpit Push and Pull
# Prepares local changes from Cockpit, pushes them, and instructs live environment to pull data.

BASE_DIR=$(dirname "$0" | xargs -0 realpath)
ANSIBLE_DIR="$BASE_DIR/../../server/ansible"

cd "$BASE_DIR" || (echo "Base directory '$BASE_DIR' not reachable." && exit 1)

./push-cockpit.sh "$1"

cd "$ANSIBLE_DIR" || (echo "Ansible directory not found." && exit 1)
ansible-playbook ./playbook-set-up-services.yml --tags="cockpit-update"