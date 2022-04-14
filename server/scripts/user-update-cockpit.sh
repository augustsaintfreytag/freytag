#! /usr/bin/env sh

# Cockpit Data Pull

BASEDIR=$(dirname "$0")
cd "$BASEDIR/../ansible" || (echo "Ansible directory not found." && exit 1)

ansible-playbook ./playbook-set-up-services.yml --connection=local --extra-vars="override_hosts=localhost" --tags="cockpit-update"