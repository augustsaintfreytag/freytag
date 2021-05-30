#! /usr/bin/env sh

BASEDIR=$(dirname "$0")
cd "$BASEDIR/../ansible"

ansible-playbook --connection=local -i localhost, ./playbook-set-up-services.yml --tags=app-services,certificates