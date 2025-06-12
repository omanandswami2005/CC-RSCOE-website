import { Request, Response, NextFunction, RequestHandler } from "express";
import { Testimonial } from "../models/Testimonial";
import { uploadToCloudinary, deleteFromCloudinary } from "../config/cloudinary";
import { logError } from "../utils/logger";

export const createTestimonial: RequestHandler = async (req, res, next) => {
  try {
    const { name, role, content, rating, order } = req.body;
    const files = req.files as any;
    
    let image;
    if (files && files.image) {
      const result = await uploadToCloudinary(files.image.tempFilePath, 'testimonials');
      image = {
        url: result.secure_url,
        publicId: result.public_id
      };
    }

    const testimonial = await Testimonial.create({
      name,
      role,
      content,
      rating,
      order,
      image,
      createdBy: (req as any).user.userId,
    });

    res.status(201).json({ success: true, testimonial });
  } catch (error: any) {
    logError(`Create testimonial error: ${error.message}`);
    next(error);
  }
};

export const getTestimonials: RequestHandler = async (req, res, next) => {
  try {
    const { active = 'true' } = req.query;
    
    const filter: any = {};
    if (active !== 'all') filter.isActive = active === 'true';

    const testimonials = await Testimonial.find(filter)
      .populate('createdBy', 'name email')
      .sort({ order: 1, createdAt: -1 });

    res.status(200).json({ success: true, testimonials });
  } catch (error: any) {
    logError(`Get testimonials error: ${error.message}`);
    next(error);
  }
};

export const updateTestimonial: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    const files = req.files as any;

    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      res.status(404).json({ success: false, message: 'Testimonial not found' });
      return;
    }

    if (files && files.image) {
      // Delete old image if exists
      if (testimonial.image?.publicId) {
        await deleteFromCloudinary(testimonial.image.publicId);
      }
      
      const result = await uploadToCloudinary(files.image.tempFilePath, 'testimonials');
      updateData.image = {
        url: result.secure_url,
        publicId: result.public_id
      };
    }

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(id, updateData, { 
      new: true, 
      runValidators: true 
    }).populate('createdBy', 'name email');

    res.status(200).json({ success: true, testimonial: updatedTestimonial });
  } catch (error: any) {
    logError(`Update testimonial error: ${error.message}`);
    next(error);
  }
};

export const deleteTestimonial: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      res.status(404).json({ success: false, message: 'Testimonial not found' });
      return;
    }

    // Delete image from Cloudinary if exists
    if (testimonial.image?.publicId) {
      await deleteFromCloudinary(testimonial.image.publicId);
    }

    await Testimonial.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: 'Testimonial deleted successfully' });
  } catch (error: any) {
    logError(`Delete testimonial error: ${error.message}`);
    next(error);
  }
};