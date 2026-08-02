import { Module } from '@nestjs/common';
import { PropertiesModule } from './modules/properties/properties.module';
import { PrismaModule } from './prisma/prisma.module';
@Module({
    imports: [PropertiesModule, PrismaModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
