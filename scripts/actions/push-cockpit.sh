#! /usr/bin/env sh

# Cockpit Push and Pull
# Prepares local changes from Cockpit, pushes them, and instructs live environment to pull data.

BASE_DIR=$(dirname "$0" | xargs -0 realpath)
ROOT_DIR=$(realpath "$BASE_DIR/../../..")		# Project fork directory (with freytag, utility, cockpit, analytics)
COCKPIT_UTILITY_DIR="$ROOT_DIR/utility/cockpit"

# Arguments

COMMIT_MESSAGE=$1
TRAILING_ARGS=$2

if [ "$COMMIT_MESSAGE" = "" ]
then
	echo "Can not prepare and push Cockpit data without a commit message."
	exit 1
fi

if [ "$TRAILING_ARGS" != "" ]
then
	echo "Found extraneous arguments, operation may not execute as expected. Push accepts only one parameter."
	exit 2
fi

# Save Data

cd "$COCKPIT_UTILITY_DIR" || (echo "Cockpit utility directory not found." && exit 1)
./run-save.sh || exit 1

# Commit and Push Data

cd archive || (echo "Cockpit archive directory not found, saved data but can not commit and push." && exit 1)

git add -A
git commit -m "$COMMIT_MESSAGE"
git push || exit 1
