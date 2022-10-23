import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { PrismaHealthIndicator } from './prismaHealthIndicator';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule, TerminusModule],
  controllers: [HealthController],
  providers: [PrismaHealthIndicator],
})
export class HealthModule {}
