import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import type { Schema } from 'joi';
import { ErrorType } from '@loyalty-engine/properties';
import { BadRequestException } from '../exceptions/bad-request.exception';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
    constructor(private readonly schema: Schema) {}
    transform(value: any, metadata: ArgumentMetadata) {
        const { error } = this.schema.validate(value, {
            abortEarly: false,
            stripUnknown: true,
        });

        if (error) {
            const validationErrors = error.details.map((detail) => ({
                field: detail.path.join('.'),
                issue: detail.message,
            }));
            throw new BadRequestException(
                'Validation failed',
                ErrorType.VALIDATION_ERROR,
                'Input data validation failed',
                validationErrors,
            );
        }
        return value;
    }
}
