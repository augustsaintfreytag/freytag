FROM swift:slim
LABEL maintainer "August Saint Freytag <me@augustfreytag.com>"

# Color Theme Utility

ARG COLOR_THEME_UTILITY_URL
ADD ${COLOR_THEME_UTILITY_URL} /tmp/color-theme-utility.tar.gz
RUN tar -xzf /tmp/color-theme-utility.tar.gz -C /tmp
RUN rm /tmp/color-theme-utility.tar.gz
RUN mv /tmp/ColorThemeUtility /usr/local/bin/color-theme-utility

# SSH

RUN apt update
RUN apt install -y openssh-server sudo zip
RUN useradd -rm -d /home/server server -g root -G sudo
RUN echo "server:server" | chpasswd
RUN service ssh start

# Root

ADD entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT [ "/entrypoint.sh" ]
CMD ["/usr/sbin/sshd", "-D"]