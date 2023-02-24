FROM node:16-alpine

RUN apk add python3 make g++

# copy all the code inside docker container


# Removes permission errors
USER node

RUN mkdir -p /home/node/app

# ALl the commands in WORKDIR run inside the container
WORKDIR  /home/node/app

# changes owner
# moves code from our . (server) to containers .
COPY --chown=node:node package*.json .
RUN npm ci 

COPY --chown=node:node . .
# RUN npm install
EXPOSE 8000 

ENTRYPOINT ["./entrypoint.sh"]



# cd server
# docker build . -t server:v1


# To list the images type $ docker images
# $ docker run -e PORT=8000 -p 8000:8000 server:v1