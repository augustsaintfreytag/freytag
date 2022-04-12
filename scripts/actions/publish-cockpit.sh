#! /usr/bin/env sh

# Cockpit Push and Pull
# Prepares local changes from Cockpit, pushes them, and instructs live environment to pull data.

BASE_DIR=$(dirname "$0" | xargs -0 realpath)
ANSIBLE_DIR="$BASE_DIR/../../server/ansible"

cd "$BASE_DIR" || exit 1

./push-cockpit.sh $@

cd "$ANSIBLE_DIR" || echo "Ansible directory not found." && exit 1
ansible-playbook ./playbook-set-up-services.yml --tags="cockpit-update"