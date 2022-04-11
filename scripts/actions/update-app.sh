#! /usr/bin/env zsh

# Project Update
# Instructs live environment to pull project data from Git but skip content and infrastructure.

BASEDIR=$(dirname "$0")
cd "$BASEDIR/../../server/ansible"

ansible-playbook ./playbook-set-up-services.yml --skip-tags="certificates,cockpit,listener"