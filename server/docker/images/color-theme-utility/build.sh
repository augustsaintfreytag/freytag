#! /usr/bin/env zsh

# May be updated by moving out the build argument or the utility version number.

docker build -t color-theme-utility --build-arg UTILITY_URL=https://drop.app.intra/color-theme-utility-0.7.1-linux-x86-64.tar.gz .