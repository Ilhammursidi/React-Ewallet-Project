FROM ubuntu:resolute

RUN apt update && apt install openssh-server -y

RUN useradd -m -s /bin/bash ilham
RUN mkdir -p /home/ilham/.ssh
RUN chmod 700 /home/ilham/.ssh

COPY rsa_key.pub /home/ilham/.ssh/authorized_keys

RUN chown -R ilham:ilham /home/ilham/.ssh
RUN chmod 600 /home/ilham/.ssh/authorized_keys

RUN sed -i 's/#PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config
RUN sed -i 's/#PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
RUN sed -i 's/#PubkeyAuthentication.*/PubkeyAuthentication yes/' /etc/ssh/sshd_config

EXPOSE 22

CMD ["/usr/sbin/sshd","-D"]