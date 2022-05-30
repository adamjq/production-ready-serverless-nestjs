# Production Ready Serverless NestJS

## Features
- GraphQL configuration (Code-first approach)
- Docker config
- Serverless Offline config
- Serverless warmup plugin config to avoid cold-starts

### Not included
- Database config

## Development

```
yarn install
docker-compose up
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
