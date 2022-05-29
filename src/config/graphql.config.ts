import { ApolloDriverConfig } from '@nestjs/apollo';
import { Injectable, Logger } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { join } from 'path';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  private readonly logger = new Logger(GqlConfigService.name);

  createGqlOptions(): ApolloDriverConfig {
    return {
      autoSchemaFile: isLocalDev()
        ? join(process.cwd(), 'src/schema.gql')
        : false, // only auto-generate schema in dev
      buildSchemaOptions: { dateScalarMode: 'timestamp' },
      debug: isLocalDev(),
      playground: isLocalDev(),
      sortSchema: isLocalDev(),
      introspection: isLocalDev(),
      typePaths: !isLocalDev() ? ['src/schema.gql'] : [], // use generated graphql schema in prod
      cors: true, // TODO: { origin: FE_URL!, credentials: true} for production?
    };
  }
}

const isLocalDev = (): boolean => {
  return process.env.NODE_ENV !== 'production';
};
