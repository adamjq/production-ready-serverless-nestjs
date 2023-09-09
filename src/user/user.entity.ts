import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';
import 'reflect-metadata';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  @MinLength(3)
  email: string;

  @Field(() => UserRole)
  role: UserRole;
}

registerEnumType(UserRole, {
  name: 'UserRole',
});
