FROM node:16.14
LABEL maintainer "August Saint Freytag <me@augustfreytag.com>"

RUN apt update
RUN apt install -y tree sshpass

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["node"]