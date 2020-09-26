#! /usr/bin/env bash

# Project Pull and Cycle
# Run through entire services playbook, use existing host-provided parameters.

BASEDIR=$(dirname "$0")
cd "$BASEDIR/../ansible"

ansible-playbook -i localhost -c local ./playbook-set-up-services.yml --skip-tags="requires_host"