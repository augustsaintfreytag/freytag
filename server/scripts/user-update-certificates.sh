#! /usr/bin/env sh

BASEDIR=$(dirname "$0")
cd "$BASEDIR/../ansible"

ansible-playbook --connection=local --extra-vars="override_hosts=localhost" ./playbook-set-up-services.yml --tags=app-services,certificates