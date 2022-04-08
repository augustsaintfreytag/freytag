FROM node:16.14
LABEL maintainer "August Saint Freytag <me@augustfreytag.com>"

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt update
RUN apt install -y tree sshpass yarn

RUN groupadd -r node && useradd -r -g node node
USER node

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["node"]