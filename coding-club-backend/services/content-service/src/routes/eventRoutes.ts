import { Router } from "express";
import { 
  createEvent, 
  getEvents, 
  getEventById, 
  updateEvent, 
  deleteEvent,
  removeEventImage
} from "../controllers/eventController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getEvents);
router.get("/:id", getEventById);
router.post("/", authMiddleware, createEvent);
router.put("/:id", authMiddleware, updateEvent);
router.delete("/:id", authMiddleware, deleteEvent);
router.delete("/:id/images/:imageId", authMiddleware, removeEventImage);

export default router;