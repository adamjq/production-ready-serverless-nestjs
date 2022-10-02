# Production Ready Serverless NestJS

## Features
- GraphQL configuration (Code-first approach)
- Prisma Database config with migrations
- Docker database for local development
- AWS Deployment with [Serverless Framework](https://www.serverless.com/)
- AWS Lambda NodeJS 16x configuration and optimizations

### Not included:
- Authentication/Authorization
- CI/CD

Note - this solution uses [CockroachDB Serverless](https://www.cockroachlabs.com/lp/serverless/) for the database layer as it is a free Postgres-compatible
hosted service. CockroachDB can easily be replace with a regular PostgreSQL database with minimal changes.

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

2. Launch the CockroachDB database with Docker with `docker-compose up`

3. Install dependencies with:
    ```
    nvm use 16
    yarn install
    ```

4. Run database migrations locally in a separate terminal if it's a first time setup with `yarn prisma migrate dev`

5. Start the NestJS server in a separate terminal:
    ```
    nvm use 16
    yarn start
    ```

6. Call the endpoints in [requests.http](./requests.http) to test the API.

### AWS Deployment

**Note** - create all AWS and CockroachDB resources in the `us-east-1` AWS region.

1. Setup your AWS Credentials for deployments

2. Create a [free-tier Cockroach DB Serverless cluster](https://www.cockroachlabs.com/lp/serverless/). Note down the connection string URL during cluster creation.

3. Create an AWS SSM Parameter in the AWS console named `/dev/database/url` with the secure string type
and save the Cockroach DB connection string.

    Confirm it exists with:
    ```
    aws ssm get-parameter --name /dev/database/url --with-decryption
    ```

4. Install dependencies:
    ```
    nvm use 16
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
yarn prisma migrate dev --name <MIGRATION_NAME>

# run migration
yarn prisma migrate dev

# reset development database
yarn prisma migrate reset
```

### Production Database Migrations

Production database migrations should be run in a CI/CD pipeline but can also be run locally with:

```
yarn prisma migrate deploy
```

See [the Prisma docs](https://www.prisma.io/docs/concepts/components/prisma-migrate/migrate-development-production#production-and-testing-environments) for more information.

## Resources

- [Serverless Framework](https://www.serverless.com/framework/docs)
- [NestJS](https://docs.nestjs.com/)
- [Prisma](https://www.prisma.io/docs/)
- [CockroachDB](https://www.cockroachlabs.com/)
