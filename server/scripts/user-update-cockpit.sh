#! /usr/bin/env bash

# Cockpit Data Pull

BASEDIR=$(dirname "$0")
cd "$BASEDIR/../ansible"

ansible-playbook ./playbook-set-up-services.yml --connection=local --extra-vars="override_hosts=localhost" --tags="cockpit-update"