import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction, RequestHandler } from 'express';


export const validateReview: RequestHandler[] = [
  body('userId')
    .isInt({ min: 1 })
    .withMessage('userId must be a positive integer'),
  body('productId')
    .isString()
    .notEmpty()
    .withMessage('productId is required'),
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('rating must be an integer between 1 and 5'),
  body('comment')
    .isString()
    .isLength({ min: 3 })
    .withMessage('comment must be at least 3 characters long'),
  ((req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  }) as RequestHandler
];

