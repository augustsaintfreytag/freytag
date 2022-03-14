FROM alpine:latest
LABEL maintainer "August Saint Freytag <me@augustfreytag.com>"

# Expect crontabs mounted at /etc/cron.d
# COPY crontab /etc/cron/crontab
# COPY custom-config /etc/cron.d/custom-config

# Dependencies

RUN apk update && apk upgrade
RUN apk add --no-cache curl

# Init

RUN touch /etc/crontab
RUN mkdir /etc/cron.d

# Root

ADD entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT [ "/entrypoint.sh" ]
CMD ["crond", "-f"]