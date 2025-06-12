import { Request, Response, NextFunction, RequestHandler } from "express";
import { Event } from "../models/Event";
import { uploadToCloudinary, deleteFromCloudinary } from "../config/cloudinary";
import { logError } from "../utils/logger";

export const createEvent: RequestHandler = async (req, res, next) => {
  try {
    const { title, date, description, content, category, location, registrationLink, maxParticipants, tags } = req.body;
    const files = req.files as any;
    
    const images = [];
    
    if (files && files.images) {
      const imageFiles = Array.isArray(files.images) ? files.images : [files.images];
      
      for (const file of imageFiles) {
        const result = await uploadToCloudinary(file.tempFilePath, 'events');
        images.push({
          url: result.secure_url,
          publicId: result.public_id,
          caption: file.caption || ''
        });
      }
    }

    const event = await Event.create({
      title,
      date: new Date(date),
      description,
      content,
      category,
      location,
      registrationLink,
      maxParticipants,
      tags: tags ? tags.split(',').map((tag: string) => tag.trim()) : [],
      images,
      createdBy: (req as any).user.userId,
    });

    res.status(201).json({ success: true, event });
  } catch (error: any) {
    logError(`Create event error: ${error.message}`);
    next(error);
  }
};

export const getEvents: RequestHandler = async (req, res, next) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      category, 
      status, 
      upcoming, 
      search 
    } = req.query;

    const filter: any = {};
    
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (upcoming === 'true') {
      filter.date = { $gte: new Date() };
      filter.status = 'upcoming';
    }
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search as string, 'i')] } }
      ];
    }

    const events = await Event.find(filter)
      .populate('createdBy', 'name email')
      .populate('organizers', 'name email')
      .sort({ date: -1 })
      .limit(Number(limit) * 1)
      .skip((Number(page) - 1) * Number(limit));

    const total = await Event.countDocuments(filter);

    res.status(200).json({
      success: true,
      events,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error: any) {
    logError(`Get events error: ${error.message}`);
    next(error);
  }
};

export const getEventById: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const event = await Event.findById(id)
      .populate('createdBy', 'name email')
      .populate('organizers', 'name email');

    if (!event) {
      res.status(404).json({ success: false, message: 'Event not found' });
      return;
    }

    res.status(200).json({ success: true, event });
  } catch (error: any) {
    logError(`Get event by ID error: ${error.message}`);
    next(error);
  }
};

export const updateEvent: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    const files = req.files as any;

    const event = await Event.findById(id);
    if (!event) {
      res.status(404).json({ success: false, message: 'Event not found' });
      return;
    }

    if (files && files.images) {
      const imageFiles = Array.isArray(files.images) ? files.images : [files.images];
      const newImages = [];
      
      for (const file of imageFiles) {
        const result = await uploadToCloudinary(file.tempFilePath, 'events');
        newImages.push({
          url: result.secure_url,
          publicId: result.public_id,
          caption: file.caption || ''
        });
      }
      
      updateData.images = [...event.images, ...newImages];
    }

    if (updateData.tags && typeof updateData.tags === 'string') {
      updateData.tags = updateData.tags.split(',').map((tag: string) => tag.trim());
    }

    const updatedEvent = await Event.findByIdAndUpdate(id, updateData, { 
      new: true, 
      runValidators: true 
    }).populate('createdBy', 'name email').populate('organizers', 'name email');

    res.status(200).json({ success: true, event: updatedEvent });
  } catch (error: any) {
    logError(`Update event error: ${error.message}`);
    next(error);
  }
};

export const deleteEvent: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const event = await Event.findById(id);
    if (!event) {
      res.status(404).json({ success: false, message: 'Event not found' });
      return;
    }

    // Delete images from Cloudinary
    for (const image of event.images) {
      await deleteFromCloudinary(image.publicId);
    }

    await Event.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: 'Event deleted successfully' });
  } catch (error: any) {
    logError(`Delete event error: ${error.message}`);
    next(error);
  }
};

export const removeEventImage: RequestHandler = async (req, res, next) => {
  try {
    const { id, imageId } = req.params;
    
    const event = await Event.findById(id);
    if (!event) {
      res.status(404).json({ success: false, message: 'Event not found' });
      return;
    }

    const imageIndex = event.images.findIndex(img => img.publicId === imageId);
    if (imageIndex === -1) {
      res.status(404).json({ success: false, message: 'Image not found' });
      return;
    }

    // Delete from Cloudinary
    await deleteFromCloudinary(event.images[imageIndex].publicId);

    // Remove from event
    event.images.splice(imageIndex, 1);
    await event.save();

    res.status(200).json({ success: true, message: 'Image removed successfully' });
  } catch (error: any) {
    logError(`Remove event image error: ${error.message}`);
    next(error);
  }
};