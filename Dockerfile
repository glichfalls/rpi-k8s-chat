FROM node:12

WORKDIR /opt/chat

# install deps
COPY package.json /opt/chat
RUN npm install

# Setup workdir
COPY . /opt/chat
CMD ["node", "index.js"]