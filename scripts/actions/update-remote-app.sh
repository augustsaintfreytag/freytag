#! /usr/bin/env sh

# Project Update
# Instructs live environment to pull project data from Git but skip content and infrastructure.

BASE_DIR=$(dirname "$0")
ANSIBLE_DIR="$BASE_DIR/../../server/ansible"

cd "$ANSIBLE_DIR" || (echo "Ansible directory not found." && exit 1)

ansible-playbook ./playbook-set-up-services.yml --skip-tags="certificates,cockpit,listener"