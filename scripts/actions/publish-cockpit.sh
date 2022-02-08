#! /usr/bin/env zsh

# Cockpit Push and Pull
# Prepares local changes from Cockpit, pushes them, and instructs live environment to pull data.

BASE_DIR=$(dirname "$0" | xargs -0 realpath)
COMMIT_MESSAGE=$1
TRAILING_ARGS=$2

COCKPIT_VOLUME_NAME="freytag_data-cockpit"
COCKPIT_ARCHIVE_DIR="$BASE_DIR/../../utility/cockpit/archive"
ANSIBLE_DIR="$BASE_DIR/../server/ansible"

if [[ $COMMIT_MESSAGE == "" ]]; then
	echo "Can not prepare and publish Cockpit data without a commit message."
	exit 1
fi

if [[ $TRAILING_ARGS != "" ]]; then
	echo "Found extraneous arguments, operation may not execute as expected. Publish accepts only one parameter."
	exit 2
fi

cd "$COCKPIT_ARCHIVE_DIR"
cockpit-sync save -v $COCKPIT_VOLUME_NAME -a .

git add -A
git commit -m "$COMMIT_MESSAGE"
git push

cd "$ANSIBLE_DIR"
ansible-playbook ./playbook-set-up-services.yml --tags="cockpit-update"