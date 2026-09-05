import { UserRole } from '../../../database/gen/enums';

export interface CreatePropertyUserDto{
    propertyId: string;
    userId: string;
    role?: UserRole;
    assignedByUserId: string;
}