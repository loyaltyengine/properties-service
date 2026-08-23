import { Module } from '@nestjs/common';
import { PropertyServiceImpl } from './services/property.service';
import { PropertyController } from './controllers/property.controller';
import { PrismaPropertyRepository } from './repositories/prisma-property.repository';

@Module({
    controllers: [PropertyController],
    providers: [{ provide: 'PropertyService', useClass: PropertyServiceImpl }, {provide: 'PropertyRepository', useClass: PrismaPropertyRepository}],
    exports: ['PropertyService'],
})
export class PropertiesModule {}
