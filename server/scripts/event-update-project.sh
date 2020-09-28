#! /usr/bin/env bash

# Project Pull and Cycle
# Run through entire services playbook, use existing host-provided parameters.

BASEDIR=$(dirname "$0")

# Reset and Update Project
cd "$BASEDIR/../../"
git reset --hard && git pull

# Run Ansible Service Set-Up Playbook
cd "$BASEDIR/../ansible"
ansible-playbook ./playbook-set-up-services.yml --extra-vars="override_hosts=localhost" --skip-tags="requires_host, listener"