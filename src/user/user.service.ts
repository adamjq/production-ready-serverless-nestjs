import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    this.logger.log(`Fetching all Users`);
    return this.prismaService.user.findMany();
  }
}
