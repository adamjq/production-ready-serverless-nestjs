import { Controller, Get, Logger } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { PrismaHealthIndicator } from './prismaHealthIndicator';

@Controller('health')
export class HealthController {
  private readonly logger = new Logger(HealthController.name);

  constructor(
    private healthCheckService: HealthCheckService,
    private prismaHealthIndicator: PrismaHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    this.logger.log('Checking health');
    return this.healthCheckService.check([
      () => this.prismaHealthIndicator.isHealthy('database'),
    ]);
  }
}
