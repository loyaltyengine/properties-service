import { UserRole } from 'src/database/gen/client';

export interface CreatePropertyUserData {
    propertyId: string;
    userId: string;
    role?: UserRole;
    assignedByUserId: string;
}
