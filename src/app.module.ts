import { Module } from '@nestjs/common';
import { PropertiesModule } from './modules/properties/properties.module';
import { PrismaModule } from './database/prisma.module';
import { ConfigModule } from '@nestjs/config';
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        PropertiesModule, PrismaModule],
    controllers: [],
    providers: [],
})
export class AppModule { }
