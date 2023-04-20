import { ApolloDriverConfig } from '@nestjs/apollo';
import { Injectable, Logger } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { join } from 'path';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  private readonly logger = new Logger(GqlConfigService.name);

  createGqlOptions(): ApolloDriverConfig {
    return {
      autoSchemaFile: this.isLocalDev()
        ? join(process.cwd(), this.getGraphQLSchemaPath())
        : false, // only auto-generate schema in dev
      buildSchemaOptions: { dateScalarMode: 'timestamp' },
      playground: this.isLocalDev(),
      sortSchema: this.isLocalDev(),
      introspection: this.isLocalDev(),
      typePaths: !this.isLocalDev()
        ? [join(__dirname, this.getGraphQLSchemaPath())]
        : [], // use generated graphql schema in prod
      // cors: true, // TODO: { origin: FE_URL!, credentials: true} for production?
      persistedQueries: false,
    };
  }

  getGraphQLSchemaPath(): string {
    const schemaPath = this.isRunningInLambda()
      ? 'schema.gql'
      : 'src/schema.gql';
    return schemaPath;
  }

  isLocalDev(): boolean {
    return process.env.NODE_ENV !== 'production';
  }

  isRunningInLambda(): boolean {
    const runningInLambda =
      process.env.AWS_LAMBDA_FUNCTION_NAME &&
      process.env.AWS_LAMBDA_FUNCTION_NAME != '';
    if (runningInLambda) {
      this.logger.debug('Service is Running in AWS lambda');
    }
    return runningInLambda;
  }
}
