import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';
import 'reflect-metadata';

export enum UserRole {
  USER,
  ADMIN,
}

@ObjectType()
export class User {
  @Field((type) => Int)
  id: number;

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date)
  updatedAt: Date;

  @Field()
  @MinLength(3)
  email: string;

  @Field((type) => UserRole)
  role: UserRole;
}

registerEnumType(UserRole, {
  name: 'UserRole',
});
