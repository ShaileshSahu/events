"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.voteValidationRules = exports.eventValidationRules = void 0;
const express_validator_1 = require("express-validator");
const response_utils_1 = require("../utils/response.utils");
const isValidDate = (dateStr) => {
    const regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
    if (!regex.test(dateStr))
        return false;
    const [day, month, year] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
};
exports.eventValidationRules = [
    (0, express_validator_1.body)('name').isLength({ min: 3 }).withMessage("Event name should be minimum 3"),
    (0, express_validator_1.body)('dates').isArray().withMessage('Dates must be an array'),
    (0, express_validator_1.body)('dates.*').custom(isValidDate).withMessage('Each date must be in dd-mm-yyyy format and be a valid date')
];
exports.voteValidationRules = [
    (0, express_validator_1.body)('name').isLength({ min: 1 }).withMessage("Event name should be minimum 3"),
    (0, express_validator_1.body)('dates').isArray().withMessage('Dates must be an array'),
    (0, express_validator_1.body)('dates.*').custom(isValidDate).withMessage('Each date must be in dd-mm-yyyy format and be a valid date')
];
const validate = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return (0, response_utils_1.sendError)(400, res, ({ errors: errors.array() }));
    }
    next();
};
exports.validate = validate;
