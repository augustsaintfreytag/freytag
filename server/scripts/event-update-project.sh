#! /usr/bin/env sh

# Project Pull and Cycle
# Run through entire services playbook, use existing host-provided parameters.

BASEDIR=$(dirname "$0")
cd "$BASEDIR/../ansible" || (echo "Ansible directory not found." && exit 1)

# Run Ansible Service Set-Up Playbook
ansible-playbook ./playbook-set-up-services.yml --connection=local --extra-vars="override_hosts=localhost" --skip-tags="requires_host,listener"