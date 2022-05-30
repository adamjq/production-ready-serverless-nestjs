# Production Ready Serverless NestJS

## Features
- GraphQL configuration (Code-first approach)
- Docker config
- Serverless Offline config
- Serverless warmup plugin config to avoid cold-starts

### Not included
- Database config

## Development

Launch the dev server in Docker:
```
yarn install
docker-compose up app
```

## Serverless Offline

Launches a local API Gateway server in a docker network. This is useful for connecting to other services in Docker, like a database. This option also tests Lambda packaging.

```
docker-compose up slsoffline
```

## Deployment

```
export AWS_PROFILE=<YOUR_PROFILE>
serverless deploy
```

Update [requests.http](./requests.http) with the output of the deployment to call the API.

## Resources

- [Serverless Framework](https://www.serverless.com/framework/docs)
- [NestJS](https://docs.nestjs.com/)
