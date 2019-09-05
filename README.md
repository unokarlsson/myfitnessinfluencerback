# myfitnessincluencerback
Backend for myfitnessinfluencer

Nodejs REST web service using MySQL as database.

Can be run in dev and test mode by npm and in docker-dev and docker-test mode using docker-compose.

To run docker-dev
$ docker-compose up

To run docker-test
$ docker-compose -f docker-compose-test.yml up

Initial setup after cloning:
1. Make sure the lineendings in wait-for-it.sh is unix style (\n)
2. Run npm install
3. Run docker-compose up
