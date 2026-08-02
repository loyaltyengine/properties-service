import { Module } from '@nestjs/common';
import { PropertyServiceImpl } from './services/property.service';
import { PropertyController } from './controllers/property.controller';

@Module({
    controllers: [PropertyController],
    providers: [{ provide: 'PropertyService', useClass: PropertyServiceImpl }],
    exports: ['PropertyService'],
})
export class PropertiesModule {}
