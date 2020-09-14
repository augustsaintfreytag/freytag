FROM nginx:latest

RUN apt update
RUN apt install -y python3 python3-dev python3-pip build-essential libssl-dev linux-musl-dev libffi-dev
RUN pip3 install pip --upgrade
RUN pip3 install certbot-nginx

ENTRYPOINT ["/docker-entrypoint.sh"]

EXPOSE 80

STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]