import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, UserRole } from './user.entity';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    this.logger.log(`Fetching all Users`);
    return this.prismaService.user.findMany();
  }

  async create(email: string) {
    this.logger.log(`Fetching User ${email}`);
    const user = new User();
    user.email = email;
    user.role = UserRole.USER;
    await this.prismaService.user.create({
      data: user,
    });
  }
}
