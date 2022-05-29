import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  findAll() {
    this.logger.log(`Fetching all Users`);
    return [];
  }
}
