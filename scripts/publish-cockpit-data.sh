#! /usr/bin/env bash

# Cockpit Data Pull
# Instructs live environment to pull previously pushed Cockpit data.

BASEDIR=$(dirname "$0")
cd "$BASEDIR/../server/ansible"

ansible-playbook ./playbook-set-up-services.yml --tags="cockpit-update"