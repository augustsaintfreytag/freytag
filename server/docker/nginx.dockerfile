FROM nginx:latest

RUN apt update
RUN apt install -y python3 python3-dev python3-pip build-essential libssl-dev musl-dev libffi-dev certbot
RUN pip3 install pip --upgrade
RUN pip3 install certbot-nginx