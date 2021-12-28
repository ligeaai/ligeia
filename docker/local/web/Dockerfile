# [Choice] Node.js version: none, lts/*, 16, 14, 12, 10
ARG NODE_VERSION="none"
FROM node:${NODE_VERSION}

# RUN if [ "${NODE_VERSION}" != "none" ]; then su vscode -c "umask 0002 && . /usr/local/share/nvm/nvm.sh && nvm install ${NODE_VERSION} 2>&1"; fi

WORKDIR /django/web


# COPY ./web/package.json ./ 
RUN apt-get update && apt-get install -y curl
# RUN curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
# RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
# RUN echo "deb http://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

# RUN apt-get update && apt-get install -y nodejs yarn
