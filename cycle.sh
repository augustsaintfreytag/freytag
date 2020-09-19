#! /usr/bin/env bash

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

cd ./server/ansible
ansible-playbook -v -i ./inventory/inventory.private.yml ./playbook-dev-cycle-services.yml --extra-vars="state=$SERVICES_STATE"
