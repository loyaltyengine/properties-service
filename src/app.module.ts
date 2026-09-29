import { Module } from '@nestjs/common';
import { PropertiesModule } from './modules/properties/properties.module';
import { PrismaModule } from './database/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './modules/health/health.module';
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        PropertiesModule, PrismaModule, HealthModule],
    controllers: [],
    providers: [],
})
export class AppModule { }
