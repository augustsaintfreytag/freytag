#! /usr/bin/env bash

# Service Cycle Script
# Starts or stops services in a local development environment.

if [ "$1" == "start" ]; then
	SERVICES_STATE="present"
elif [ "$1" == "stop" ]; then
	SERVICES_STATE="absent"
fi

if [ "$SERVICES_STATE" == "" ]; then
	echo "Missing argument 'operation' for services (start|stop)."
	echo "Usage: cycle.sh <operation>"
	exit 1
fi

BASEDIR=$(dirname "$0")
cd "$BASEDIR/../server/ansible"

ansible-playbook ./playbook-dev-cycle-services.yml --extra-vars="state=$SERVICES_STATE"