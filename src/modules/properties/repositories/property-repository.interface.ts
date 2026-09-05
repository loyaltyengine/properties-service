import { CreatePropertyData } from './types/create-property.data';
import { CreatePropertyUserData } from './types/create-property-user.data';
import { PropertyModel } from '../models/property.model';
import { PropertyUserModel } from '../models/property-user.model';

export interface PropertyRepository {
    createProperty(data: CreatePropertyData): Promise<PropertyModel>;
    createPropertyUser(data: CreatePropertyUserData): Promise<PropertyUserModel>;
    findPropertyUser(propertyId: string, userId: string): Promise<PropertyUserModel | null>;
}
