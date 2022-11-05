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

  async delete(userId: number) {
    this.logger.log(`Deleting User ${userId}`);
    await this.prismaService.user.delete({
      where: {
        id: userId,
      },
    });
  }

  async deleteByEmail(email: string) {
    this.logger.log(`Deleting User ${email}`);
    await this.prismaService.user.delete({
      where: {
        email,
      },
    });
  }
}
