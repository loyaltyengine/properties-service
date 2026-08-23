import Joi from 'joi';
import { CreatePropertyRequest } from '@loyalty-engine/properties-v1-types';

export const createPropertySchema = Joi.object<CreatePropertyRequest>({
    name: Joi.string().required().messages({
        'any.required': 'Name of the property is required',
        'string.empty': 'Name of the property cannot be empty'
    }),
    createdByUserId: Joi.string().required().messages({ 
        'any.required': 'ID of the user who created the property is required',
        'string.empty': 'ID of the user who created the property cannot be empty'
    }),
    email: Joi.string().email().required().messages({
        'any.required': 'Email associated with the property is required',
        'string.email': 'Please provide a valid email address',
        'string.empty': 'Email associated with the property cannot be empty'
    }),
});