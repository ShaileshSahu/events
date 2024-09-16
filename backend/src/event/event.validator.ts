import {body,validationResult} from 'express-validator';
import { sendError } from '../utils/response.utils';
import { Request, Response } from 'express';

const isValidDate = (dateStr: string) => {
    const regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
    if (!regex.test(dateStr)) return false;
    const [day, month, year] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
  };

export const eventValidationRules = [
    body('name').isLength({min:3}).withMessage("Event name should be minimum 3"),
    body('dates').isArray().withMessage('Dates must be an array'),
    body('dates.*').custom(isValidDate).withMessage('Each date must be in dd-mm-yyyy format and be a valid date')
]

export const voteValidationRules = [
    body('name').isLength({min:1}).withMessage("Event name should be minimum 3"),
    body('dates').isArray().withMessage('Dates must be an array'),
    body('dates.*').custom(isValidDate).withMessage('Each date must be in dd-mm-yyyy format and be a valid date')
]

export const validate = (req:Request, res:Response, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendError(400,res,({ errors: errors.array() }));
    }
    next();
};


