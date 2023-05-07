# tse-clean

TypeScript-Express Clean Architecture

# Description

CRUD backend application made with simplified Clean Architecture and TypeScript-Express-Mongoose.

# How to Run

## Dependencies

1. Install all of the dependencies. Tested with NPM. `npm install`.
2. Add environment variables to `.env` file, as below.

```
PORT = <PORT>
MONGO_URL = <mongodb+srv://user:pass@cluster.mongodb.net/db?retryWrites=true&w=majority>
```

## Development Environment

The development environment uses `Nodemon` to hot-reload the application. To run the development environment, execute `npm run dev`.

## Production Environment

The production environment uses `Node`. To run the production environment, execute `npm start`.

## Unit Tests

The testing is done with Jest and Supertest. To add new unit tests, create new file in `src/tests` or add new testcases in the files. To test, execute `npm run test`.

## Docker

The application also provides dockerized version. The dockerized application exposes the application to Port 8000. To use Docker, run `docker-compose up`.

## Makefile

To simplify running process, a Makefile is provided, but only for Docker. To run with `make`, execute `make up`. This will result in a detached application in the container created with Docker.

# Things to Improve

1. Separation of environment variables for development, production, and test environment.
2. More complete and whole testcases for all components.
