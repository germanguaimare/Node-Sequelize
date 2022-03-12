# PINFLAG NODE JS CHALLENGE

1) Run npm install to get all dependencies
2) Get the database files running:

docker pull postgres && docker run --name pinflag_challenge_db -e POSTGRES_DB=pinflag_challenge -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

3) Navigate to src files running: cd src
4) Start the server runing: node index.mjs
5) Make sure ports 5432 and 5000 are public so you can do your requests
6) Do your requests using Postman

After running the server you can check the API documentation on localhost:5000/api/docs
