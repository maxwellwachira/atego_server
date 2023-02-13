import { Request, Response } from 'express';

import {
    addFaq,
    findAllFaqs,
    findFaqById,
} from './faqService';

const createFaq = async (req: Request, res: Response) => {
    const { question, answer } = req.body;
    try {
        //Add faq 
        const record  = await addFaq({question, answer});
        return res.status(201).json({record, message:"success"});
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"error", error});
    }
}

const getAllFaqs = async (req: Request, res: Response) => {
    let page = req.query?.page as number | undefined;
    let limit = req.query?.limit as number | undefined;
    //if page is undefined set default to 1
    if(!page) page = 1;
    //if limit is undefined set default to 10
    if(!limit) limit = 10;

    try {
        //Find faqs with pagination
        const faqs = await findAllFaqs(page, limit);
        return res.status(200).json(faqs);
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }
}

const getOneFaq = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const faq = await findFaqById(Number(id));
        if (!faq) return res.status(404).json({message: `faq with id = ${id} does not exists`});
        return res.json(faq);
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }
}

const updateFaq =  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { question, answer } = req.body;

    try {
        const faq = await findFaqById(Number(id));
        if (!faq) return res.status(404).json({message: `faq with id = ${id} does not exists`});
        //get faq object
        faq.set({question, answer});
        await faq.save();
        return res.status(200).json({message:"success"});
        
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }

}

const removeFaq = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const faq = await findFaqById(Number(id));
        if (!faq) return res.status(404).json({message: `faq with id = ${id} does not exists`});

        const deletedfaq = await faq.destroy();
        return res.json({record: deletedfaq});
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }
}

export {
    createFaq,
    getAllFaqs,
    getOneFaq,
    removeFaq,
    updateFaq
};