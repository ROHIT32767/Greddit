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

EXPOSE 3000

ENTRYPOINT ["./entrypoint.sh"]



# cd server
# docker build . -t server:v1