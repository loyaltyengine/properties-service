import { PropertyStatus, PropertyType } from '../../../database/gen/enums';

export interface PropertyDto {
    propertyId: string;
    createdByUserId: string;
    name: string;
    description: string | null;
    type: PropertyType;
    domain: string | null;
    email: string | null;
    status: PropertyStatus;
    createdAt: Date;
    updatedAt: Date;
}
