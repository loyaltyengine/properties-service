import { PropertyService } from './property-service.interface';
import { PropertyDto } from '../dtos/property.dto';
import { CreatePropertyDto } from '../dtos/create-proptery.dto';
import type { PropertyRepository } from '../repositories/property-repository.interface';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { PropertyMapper } from '../mappers/property.mapper';
import { UserRole } from 'src/database/gen/enums';
import { NotFoundException } from 'src/common/exceptions/not-found.exception';
import { ErrorType } from '@loyalty-engine/properties-v1-types';
import { PropertyUserDto } from '../dtos/property-user.dto';
import { CreatePropertyUserDto } from '../dtos/create-property-user.dto';
import { BadRequestException } from '../../../common/exceptions/bad-request.exception';

@Injectable()
export class PropertyServiceImpl implements PropertyService {
    private readonly logger = new Logger(PropertyServiceImpl.name);

    constructor(@Inject('PropertyRepository') private readonly propertyRepository: PropertyRepository) {}

    async createProperty(dto: CreatePropertyDto): Promise<PropertyDto> {
        this.logger.log('Creating new property by userId: ' + dto.userId);
        // Create new property
        const newProperty = await this.propertyRepository.createProperty({
            name: dto.name,
            description: dto.description,
            email: dto.email,
            domain: dto.domain,
            type: dto.type,
            createdByUserId: dto.userId,
        });

        // Create property user
        await this.propertyRepository.createPropertyUser({
            propertyId: newProperty.id,
            userId: dto.userId,
            role: UserRole.OWNER, // Property owner
            assignedByUserId: dto.userId,
        });

        return PropertyMapper.toDto(newProperty);
    }

    async getPropertyUser(propertyId: string, userId: string): Promise<PropertyUserDto> {
        this.logger.log('Getting property user by propertyId: ' + propertyId + ' and userId: ' + userId);
        const user = await this.propertyRepository.findPropertyUser(propertyId, userId);
        if (!user) {
            throw new NotFoundException(
                'Property not found',
                ErrorType.NOT_FOUND,
                'No user associated with this property',
            );
        }

        return PropertyMapper.toPropertyUserDto(user);
    }

    async createPropertyUser(dto: CreatePropertyUserDto): Promise<PropertyUserDto> {
        this.logger.log('Creating property user: ' + dto.userId + ' for property: ' + dto.propertyId);
        // Check if user already exists
        const property = await this.propertyRepository.findPropertyUser(dto.propertyId, dto.userId);
        if (property) {
            throw new BadRequestException(
                'User already exists',
                ErrorType.INVALID_REQUEST,
                'User already exists for this property',
            );
        }

        // Else create new
        const  newUser = this.propertyRepository.createPropertyUser({
            propertyId: dto.propertyId,
            userId: dto.userId,
            role: dto.role,
            assignedByUserId: dto.assignedByUserId,
        })

        return PropertyMapper.toPropertyUserDto(newUser);
    }
}
