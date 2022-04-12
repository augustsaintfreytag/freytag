#! /usr/bin/env sh

# Cockpit Data Pull
# Instructs live environment to pull previously pushed Cockpit data.

BASEDIR=$(dirname "$0")
cd "$BASEDIR/../../server/ansible" || echo "Ansible directory not found." && exit 1

ansible-playbook ./playbook-set-up-services.yml --tags="cockpit-update"