# fullstack-graphql-app

Fullstack GraphQL App Boilerplate using modern tech stack.

## Tech Stack

Common

- TypeScript
- GraphQL
- graphql-codegen

Backend

- Prisma
- fastify
- envelop
- graphql-helix
- graphql playground
- mysql

Frontend

- React
- Next.js
- urql
- tailwindcss
- twin.macro

Authentication

- Auth0

Testing

- testing-library
- jest
- msw

# Getting Started

## Backend

### install deps

```
yarn install
```

### set up auth0

As this project uses auth0 for authentication, you should setup auth0 to make whole app work.

You should create API, Application (Single Page Application) in the auth0 console.

### .env file

add .env and .env.localhost file to `backend/`

.env

```
DATABASE_URL="mysql://fga:fga@db:3306/fga"
AUTH0_CLIENT_ID=<client id>
AUTH0_DOMAIN=<domain>
AUTH0_AUDIENCE=<audience>
GRAPHQL_END_POINT=http://localhost:5000/graphql
```

.env.localhost

```
DATABASE_URL="mysql://fga:fga@localhost:3306/fga"
AUTH0_CLIENT_ID=<client id>
AUTH0_DOMAIN=<domain>
AUTH0_AUDIENCE=<audience>
GRAPHQL_END_POINT=http://localhost:5000/graphql
```

### start server

```
docker-compose up
```

[Graphql Playground](https://github.com/graphql/graphql-playground) will start on localhost:5000

### scripts

The scripts you might frequently use:

- **`db:migration:generate`**: Generates migration file (not apply automatically). Run this whenever you change your database schema.
- **`db:migration:run`**: Runs generated migration file. Run this after you generate the migration file.
- **`prisma-gen`**: Generates the Prisma clien
- **`prisma-studio`**: Starts Prisma Studio on localhost:5555 where you can inspect your local development database.

### connect to your mysql database

```
 docker exec -it backend_db_1 mysql -u root -p

 mysql> use fga
```

## Frontend

### install deps

```
yarn install
```

### start

```
yarn run dev
```
