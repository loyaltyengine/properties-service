import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Param, Post, UsePipes } from '@nestjs/common';
import type { PropertyService } from '../services/property-service.interface';
import type {
    CreatePropertyRequest,
    CreatePropertyUserRequest,
    PropertyResponse,
    PropertyUserResponse,
} from '@loyalty-engine/properties';
import { JoiValidationPipe } from '../../../common/pipes/joi-validation.pipe';
import { createPropertySchema } from '../validations/create-property.schema';
import { PropertyMapper } from '../mappers/property.mapper';
import { UserRole } from '../../../database/gen/enums';

@Controller('properties-api/v1/')
export class PropertyController {
    constructor(@Inject('PropertyService') private readonly service: PropertyService) {}

    @Post('properties')
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new JoiValidationPipe(createPropertySchema))
    async createProperty(@Body() request: CreatePropertyRequest): Promise<PropertyResponse> {
        // Create a new property
        const property = await this.service.createProperty(PropertyMapper.toCreateDto(request));

        // API response
        return {
            status: {
                code: 201,
                message: 'Property created',
            },
            property: PropertyMapper.toClientProperty(property),
        };
    }

    @Get('properties/:propertyId/users/:userId/assignments')
    @HttpCode(HttpStatus.OK)
    async getUserProperty(
        @Param('propertyId') propertyId: string,
        @Param('userId') userId: string,
    ): Promise<PropertyUserResponse> {
        const propertyUser = await this.service.getPropertyUser(propertyId, userId);

        return {
            status: {
                code: 200,
                message: 'User property found',
            },
            propertyUser: PropertyMapper.toClientPropertyUser(propertyUser),
        };
    }

    @Post('properties/:propertyId/assignments')
    @HttpCode(HttpStatus.CREATED)
    async createUserProperty(
        @Param('propertyId') propertyId: string,
        @Body() request: CreatePropertyUserRequest,
    ): Promise<PropertyUserResponse> {
        const propertyUser = await this.service.createPropertyUser({
            propertyId: propertyId,
            userId: request.userId,
            role: request.role as UserRole,
            assignedByUserId: request.assignedByUserId,
        });

        return {
            status: {
                code: 201,
                message: 'Property user created',
            },
            propertyUser: PropertyMapper.toClientPropertyUser(propertyUser),
        };
    }
}
