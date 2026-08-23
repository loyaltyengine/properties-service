import { CreatePropertyDto } from '../dtos/create-proptery.dto';
import { PropertyUserDto } from '../dtos/property-user.dto';
import { PropertyDto } from '../dtos/property.dto';
import { CreatePropertyUserDto } from '../dtos/create-property-user.dto';

export interface PropertyService {
    createProperty(dto: CreatePropertyDto): Promise<PropertyDto>;
    getPropertyUser(propertyId: string, userId: string): Promise<PropertyUserDto>;
    createPropertyUser(dto: CreatePropertyUserDto): Promise<PropertyUserDto>;
}
