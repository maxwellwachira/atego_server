import express, { NextFunction, Request, Response } from 'express';

import {
    createFaq,
    getAllFaqs,
    getOneFaq,
    removeFaq,
    updateFaq
} from './faqController';

import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

//Get all faqs
router.get('/', getAllFaqs);

//protect routes
router.use(authMiddleware);

//only access if user is Admin
const authorization = (req: Request, res: Response, next: NextFunction) => {
    const role = res.locals.role;
    if(role !== "admin") return res.status(403).json({message:"unauthorized"});
    return next();
}

router.use(authorization);
//create faq
router.post('/', createFaq);
//get one faq
router.get('/:id', getOneFaq);
//update faq
router.put('/:id', updateFaq);
//delete faq
router.delete('/:id', removeFaq);

export default router;