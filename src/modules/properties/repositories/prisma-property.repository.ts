import { PrismaService } from "src/database/prisma.service";
import { PropertyUserModel } from "../models/property-user.model";
import { PropertyRepository } from "./property-repository.interface";
import { CreatePropertyUserData } from "./types/create-property-user.data";
import { CreatePropertyData } from "./types/create-property.data";
import { PropertyModel } from "../models/property.model";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaPropertyRepository implements PropertyRepository {
    constructor(private readonly prisma: PrismaService) {}

    async createProperty(data: CreatePropertyData): Promise<PropertyModel> {
        const property = await this.prisma.property.create({
           data: {
               name: data.name,
               description: data.description,
               email: data.email,
               domain: data.domain,
               type: data.type,
               createdByUserId: data.createdByUserId
           }
        })

        return property
    }

    async findPropertyUser(propertyId: string, userId: string): Promise<PropertyUserModel | null> {
        const user = await this.prisma.propertyUser.findFirst({
            where: {
                propertyId: propertyId,
                userId: userId
            }
        })

        return user
    }

    async createPropertyUser(data: CreatePropertyUserData): Promise<PropertyUserModel> {
        const propertyUser = await this.prisma.propertyUser.create({
            data: {
                property: {
                    connect: {
                        id: data.propertyId
                    }
                },
                userId: data.userId,
                role: data.role,
                assignedByUserId: data.assignedByUserId
            }
        })

        return propertyUser
    }

    async findUserProperty(propertyId: string, userId: string): Promise<PropertyModel | null> {
        const property = await this.prisma.property.findFirst({
            where: {
                id: propertyId,
                users: {
                    some: {
                        userId: userId
                    }
                }
            }
        })

        return property
    }

}