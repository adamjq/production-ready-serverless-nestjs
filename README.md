# Production Ready Serverless NestJS

This project contains a backend starter template for running NestJS GraphQL APIs on AWS Lambda with security and performance best practices.

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![GraphQL](https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

## Features
- GraphQL configuration (Code-first approach)
- Prisma Database config with migrations
- Docker database for local development
- AWS Deployment with [Serverless Framework](https://www.serverless.com/)
- AWS Lambda NodeJS 18x configuration and optimizations
- GitHub actions for CI/CD

### Not included
- Authentication/Authorization

## Technology Choices

### NestJS
- Opinionated, mature backend framework with active community
- Supports dependency injection out of the box
- First-class typescript support

### GraphQL
- Provides a query language that lets clients specify the data they need
- Strong support in frontend frameworks like React

### AWS Lambda
- Pay-per-use pricing is ideal for early-stage startups where traffic and access patterns are unknown
- Cold starts can be minimized by keeping package bundles small, caching server between invocations and keeping lambdas warm

### Serverless framework
- Strong community of plugins and supports for NodeJS/Typescript

### Prisma
- ORM with great developer experience
- Excellent Typescript support

### Supabase
- Hosted serverless Postgres database

## Dependencies

- NodeJS
- NVM `brew install nvm`
- Yarn
- Docker
- VSCode
- AWS Account

## Setup

### Local Development

1. Create a `.env` file using [.env.example](./.env.example) as an example

2. `nvm use`

3. `yarn install`

4. Launch Supabase in Docker with `npx supabase start`

5. Run database migrations locally in a separate terminal if it's a first time setup with `npx prisma migrate dev`

6. Seed the database with `npx prisma db seed`

7. Start the NestJS server with `yarn start:dev`

8. Call the endpoints in [requests.http](./requests.http) to test the API.

### Integration tests

```
yarn test:e2e
```

### Webpack bundling

```shell
yarn build # with webpack

# run binary locally
node dist/main.js
```

### Serverless Offline

Test AWS Lambda packaging and run locally with:
```
npx serverless offline
```

### AWS Deployment

**Note** - create all AWS and Supabase resources in the `us-east-1` AWS region.

1. Setup your AWS Credentials for deployments

2. Create [a free-tier Supabase database](https://supabase.com/).

3. Create an AWS SSM Parameter in the AWS console named `/dev/database/url` with the secure string type
and save the DB connection string.

    Confirm it exists with:
    ```
    aws ssm get-parameter --name /dev/database/url --with-decryption
    ```

4. Install dependencies:
    ```
    nvm use 18
    yarn install
    ```

5. Deploy the app to AWS:
    ```
    npx serverless deploy
    ```

Update [requests.http](./requests.http) with the output of the deployment to call the API.

## Database Migrations

```
# create migrations
npx prisma migrate dev --name <MIGRATION_NAME>

# run migration
npx prisma migrate dev

# reset development database
npx prisma migrate reset
```

Note - an ERD diagram for the database schema will be generated under `/docs` - [see diagram](./docs/README.md).

### Production Database Migrations

Production database migrations should be run in a CI/CD pipeline but can also be run locally with:

```
npx prisma migrate deploy
```

See [the Prisma docs](https://www.prisma.io/docs/concepts/components/prisma-migrate/migrate-development-production#production-and-testing-environments) for more information.

## Resources

- [Serverless Framework](https://www.serverless.com/framework/docs)
- [NestJS](https://docs.nestjs.com/)
- [Prisma](https://www.prisma.io/docs/)
- [Supabase](https://supabase.com/)
- [GraphQL](https://graphql.org/)

## Suggested SaaS integrations

### Auth
- [Auth0](https://auth0.com/)

### Monitoring
- [Lumigo](https://lumigo.io/)
