# fullstack-graphql-app

An opinionated fullstack GraphQL Boilerplate using modern tech stack.

## Concepts

- 🛡type-safe
  - graphql-code-generator ()
  - prisma (type-safe orm)
  - ts-pattern (for type-safe error handling)
- 🛠customizable
  - envelop (plugin system for GraphQL)
  - urql (highty customizable GraphQL Client)
- 📈simple but scalable
  - a bit flavor of [clean architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

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
- radix ui

Authentication

- Auth0

Testing

- testing-library
- jest
- msw

# Getting Started

## Setting up auth0

As this project uses auth0 for authentication, you should first setup auth0 to make everything work. If you don't have auth0 account, then sign up and create account.

You need to create API, Application (Single Page Application) in the auth0 console. In Application, go to Application URIs section in the middle of the settings page and specify `http://localhost:3000` to Allowed Callback URLs, Allowed Logout URLs, Allowed Web Origins, Allowed Origins (CORS).

Once you have set up API and Application, collect credentials below which will be used in your application:

* Client Id: Your Auth0 application's Client ID. can be found on the Application setting page.
* Domain: Your Auth0 application's Domain. can be found on the Application setting page.
* Audience: API Identifier for an access token. can be found on the API setting page.

### Configure environment variables

In the backend root directory, Specify .env and .env.localhost file with the following environment variables:

.env

```
DATABASE_URL="mysql://fga:fga@db:3306/fga"
AUTH0_CLIENT_ID=<Client Id>
AUTH0_DOMAIN=<Domain>
AUTH0_AUDIENCE=<Audience>
GRAPHQL_END_POINT=http://localhost:5000/graphql
```

.env.localhost

```
DATABASE_URL="mysql://fga:fga@localhost:3306/fga"
AUTH0_CLIENT_ID=<Client Id>
AUTH0_DOMAIN=<Domain>
AUTH0_AUDIENCE=<Audience>
GRAPHQL_END_POINT=http://localhost:5000/graphql
```

And in the frontend root directory, Specify .env.local file with the following environment variables:

```
NEXT_PUBLIC_AUTH0_CLIENT_ID=<Client Id>
NEXT_PUBLIC_AUTH0_DOMAIN=<Domain>
NEXT_PUBLIC_AUTH0_AUDIENCE=<Audience>
NEXT_PUBLIC_GRAPHQL_END_POINT=http://localhost:5000/graphql
```

## Backend

### install deps

```
yarn install
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
