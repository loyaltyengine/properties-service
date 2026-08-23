import { PropertyType } from 'src/database/gen/enums';

export interface CreatePropertyDto {
    name: string;
    description: string | null;
    email: string;
    domain: string | null;
    type: PropertyType;
    userId: string;
}
