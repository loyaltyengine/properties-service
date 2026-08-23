import { UserRole } from 'src/database/gen/enums';

export interface PropertyUserDto {
    propertyId: string;
    userId: string;
    role: UserRole;
    assignedAt: Date;
    assignedByUserId: string;
}
