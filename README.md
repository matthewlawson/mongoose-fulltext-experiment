# Mongoose Restaurants
A port of https://github.com/matthewlawson/mongo-fulltext-experiment to use mongoose as an ORM
# Installation

## Start mongo docker container
`docker run --name some-mongo -p 27017:27017 -d mongo`
## Connect to docker container logs
`docker run -it --link some-mongo:mongo --rm mongo sh -c 'exec mongo "$MONGO_PORT_27017_TCP_ADDR:$MONGO_PORT_27017_TCP_PORT/test"'`

# Usage
`npm start` to Insert a Restaurant into the running