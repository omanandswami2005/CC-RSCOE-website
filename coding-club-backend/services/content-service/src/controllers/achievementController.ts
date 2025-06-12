import { Request, Response, NextFunction, RequestHandler } from "express";
import { Achievement } from "../models/Achievement";
import { uploadToCloudinary, deleteFromCloudinary } from "../config/cloudinary";
import { logError } from "../utils/logger";

export const createAchievement: RequestHandler = async (req, res, next) => {
  try {
    const { title, description, date, category, participants, isHighlighted } = req.body;
    const files = req.files as any;
    
    const images = [];
    
    if (files && files.images) {
      const imageFiles = Array.isArray(files.images) ? files.images : [files.images];
      
      for (const file of imageFiles) {
        const result = await uploadToCloudinary(file.tempFilePath, 'achievements');
        images.push({
          url: result.secure_url,
          publicId: result.public_id,
          caption: file.caption || ''
        });
      }
    }

    const achievement = await Achievement.create({
      title,
      description,
      date: new Date(date),
      category,
      participants: JSON.parse(participants || '[]'),
      isHighlighted: isHighlighted === 'true',
      images,
      createdBy: (req as any).user.userId,
    });

    res.status(201).json({ success: true, achievement });
  } catch (error: any) {
    logError(`Create achievement error: ${error.message}`);
    next(error);
  }
};

export const getAchievements: RequestHandler = async (req, res, next) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      category, 
      highlighted,
      search 
    } = req.query;

    const filter: any = {};
    
    if (category) filter.category = category;
    if (highlighted === 'true') filter.isHighlighted = true;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const achievements = await Achievement.find(filter)
      .populate('createdBy', 'name email')
      .populate('participants.userId', 'name email')
      .sort({ date: -1, isHighlighted: -1 })
      .limit(Number(limit) * 1)
      .skip((Number(page) - 1) * Number(limit));

    const total = await Achievement.countDocuments(filter);

    res.status(200).json({
      success: true,
      achievements,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error: any) {
    logError(`Get achievements error: ${error.message}`);
    next(error);
  }
};

export const getAchievementById: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const achievement = await Achievement.findById(id)
      .populate('createdBy', 'name email')
      .populate('participants.userId', 'name email');

    if (!achievement) {
      res.status(404).json({ success: false, message: 'Achievement not found' });
      return;
    }

    res.status(200).json({ success: true, achievement });
  } catch (error: any) {
    logError(`Get achievement by ID error: ${error.message}`);
    next(error);
  }
};

export const updateAchievement: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    const files = req.files as any;

    const achievement = await Achievement.findById(id);
    if (!achievement) {
      res.status(404).json({ success: false, message: 'Achievement not found' });
      return;
    }

    if (files && files.images) {
      const imageFiles = Array.isArray(files.images) ? files.images : [files.images];
      const newImages = [];
      
      for (const file of imageFiles) {
        const result = await uploadToCloudinary(file.tempFilePath, 'achievements');
        newImages.push({
          url: result.secure_url,
          publicId: result.public_id,
          caption: file.caption || ''
        });
      }
      
      updateData.images = [...achievement.images, ...newImages];
    }

    if (updateData.participants && typeof updateData.participants === 'string') {
      updateData.participants = JSON.parse(updateData.participants);
    }

    const updatedAchievement = await Achievement.findByIdAndUpdate(id, updateData, { 
      new: true, 
      runValidators: true 
    }).populate('createdBy', 'name email').populate('participants.userId', 'name email');

    res.status(200).json({ success: true, achievement: updatedAchievement });
  } catch (error: any) {
    logError(`Update achievement error: ${error.message}`);
    next(error);
  }
};

export const deleteAchievement: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const achievement = await Achievement.findById(id);
    if (!achievement) {
      res.status(404).json({ success: false, message: 'Achievement not found' });
      return;
    }

    // Delete images from Cloudinary
    for (const image of achievement.images) {
      await deleteFromCloudinary(image.publicId);
    }

    await Achievement.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: 'Achievement deleted successfully' });
  } catch (error: any) {
    logError(`Delete achievement error: ${error.message}`);
    next(error);
  }
};