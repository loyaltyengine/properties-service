import { CreatePropertyDto } from '../dtos/create-proptery.dto';
import { PropertyDto } from '../dtos/property.dto';
import { PropertyModel } from '../models/property.model';
import type { CreatePropertyRequest, Property, PropertyUser } from '@loyalty-engine/properties';
import { PropertyType } from '../../../database/gen/enums';
import { PropertyUserModel } from '../models/property-user.model';
import { PropertyUserDto } from '../dtos/property-user.dto';

export class PropertyMapper {
    static toDto(model: PropertyModel): PropertyDto {
        return {
            name: model.name,
            description: model.description,
            propertyId: model.id,
            createdByUserId: model.createdByUserId,
            type: model.type,
            domain: model.domain,
            email: model.email,
            status: model.status,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt,
        };
    }

    static toCreateDto(request: CreatePropertyRequest): CreatePropertyDto {
        return {
            name: request.name,
            email: request.email,
            description: request.description || null,
            userId: request.createdByUserId,
            domain: request.domain || null,
            type: PropertyType.OTHER,
        };
    }

    static toClientProperty(dto: PropertyDto): Property {
        return {
            name: dto.name,
            propertyId: dto.propertyId,
            description: dto.description || undefined,
            createdByUserId: dto.createdByUserId,
            domain: dto.domain || undefined,
            email: dto.email || undefined
        };
    }

    static toPropertyUserDto(model: PropertyUserModel): PropertyUserDto {
        return {
            propertyId: model.propertyId,
            userId: model.userId,
            role: model.role,
            assignedAt: model.assignedAt,
            assignedByUserId: model.assignedByUserId,
        };
    }

    static toClientPropertyUser(dto: PropertyUserDto): PropertyUser {
        return {
            propertyId: dto.propertyId,
            userId: dto.userId,
            role: dto.role,
            assignedAt: dto.assignedAt,
            assignedByUserId: dto.assignedByUserId,
        };
    }
}
