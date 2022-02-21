#! /usr/bin/env sh

PATH=$PATH:/usr/local/bin
shell2http --form --no-index --port=80 /version 'color-theme-utility --version' /help 'color-theme-utility --help' /exec 'color-theme-utility $v_args'