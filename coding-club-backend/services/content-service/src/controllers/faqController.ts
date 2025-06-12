import { Request, Response, NextFunction, RequestHandler } from "express";
import { FAQ } from "../models/FAQ";
import { logError } from "../utils/logger";

export const createFAQ: RequestHandler = async (req, res, next) => {
  try {
    const { question, answer, category, order } = req.body;
    
    const faq = await FAQ.create({
      question,
      answer,
      category,
      order,
      createdBy: (req as any).user.userId,
    });

    res.status(201).json({ success: true, faq });
  } catch (error: any) {
    logError(`Create FAQ error: ${error.message}`);
    next(error);
  }
};

export const getFAQs: RequestHandler = async (req, res, next) => {
  try {
    const { category, active = 'true' } = req.query;
    
    const filter: any = {};
    if (category) filter.category = category;
    if (active !== 'all') filter.isActive = active === 'true';

    const faqs = await FAQ.find(filter)
      .populate('createdBy', 'name email')
      .sort({ order: 1, createdAt: -1 });

    res.status(200).json({ success: true, faqs });
  } catch (error: any) {
    logError(`Get FAQs error: ${error.message}`);
    next(error);
  }
};

export const updateFAQ: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const faq = await FAQ.findByIdAndUpdate(id, req.body, { 
      new: true, 
      runValidators: true 
    }).populate('createdBy', 'name email');

    if (!faq) {
      res.status(404).json({ success: false, message: 'FAQ not found' });
      return;
    }

    res.status(200).json({ success: true, faq });
  } catch (error: any) {
    logError(`Update FAQ error: ${error.message}`);
    next(error);
  }
};

export const deleteFAQ: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const faq = await FAQ.findByIdAndDelete(id);
    if (!faq) {
      res.status(404).json({ success: false, message: 'FAQ not found' });
      return;
    }

    res.status(200).json({ success: true, message: 'FAQ deleted successfully' });
  } catch (error: any) {
    logError(`Delete FAQ error: ${error.message}`);
    next(error);
  }
};