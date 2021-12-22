FROM ubuntu:20.04

COPY ./docker/web/web-entrypoint.sh /
COPY ./package.json /django/package.json

WORKDIR /django

# RUN apt-get remove docker docker-engine docker.io containerd runc
RUN apt-get update && apt-get install -y curl
# # RUN -it --entrypoint "/bin/bash" ubuntu:20.04
RUN curl -fsSL https://deb.nodesource.com/setup_17.x | sudo -E bash -
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
RUN echo "deb http://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update && apt-get install -y nodejs
