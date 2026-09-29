import { Injectable } from '@nestjs/common';
import { HealthIndicatorResult, HealthIndicatorService } from '@nestjs/terminus';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class DbHealthIndicator {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly healthIndicatorService: HealthIndicatorService,
    ) {}

    async isHealthy(key: string): Promise<HealthIndicatorResult> {
        return this.healthIndicatorService.check(key).attempt(async (): Promise<{ connected: boolean }> => {
            await this.prismaService.$queryRaw`SELECT 1`;
            return { connected: true };
        });
    }
}
