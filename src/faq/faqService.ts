import { FaqModel } from "./faqModel"; 

interface FaqData {
   question: string;
   answer: string;
}

const addFaq = async ({ question, answer }: FaqData) => {
    return await FaqModel.create({
        question,
        answer
    });
}

const findAllFaqs = async (page: number, limit: number) => {
    const offset = (page - 1) * limit;

    const { count, rows } = await FaqModel.findAndCountAll({
        limit,
        offset,
        order: [['id', 'ASC']]
    });
    const totalPages = Math.ceil(count / limit);

    return {
        totalFaqs: count,
        totalPages,
        currentPage: page,
        faqs: rows
    };
}

const findFaqById = async (id: number) => {
    return await FaqModel.findOne({
        where: {
            id, 
        }
    });
}

export {
    addFaq,
    findAllFaqs,
    findFaqById,
};