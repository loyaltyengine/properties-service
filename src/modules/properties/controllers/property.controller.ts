import { Controller } from '@nestjs/common';

@Controller('v1/')
export class PropertyController {
    private readonly PROPERTIES_URL = 'properties';
    private readonly PROPERTY_URL = 'properties/:propertyId';
    private readonly PROPERTY_USER_URL = 'properties/:propertyId/users/:userId';
    private readonly PROPERTY_USERS_URL = 'properties/:propertyId/users';
}
