import { Router } from "express";
import { 
  createTestimonial, 
  getTestimonials, 
  updateTestimonial, 
  deleteTestimonial 
} from "../controllers/testimonialController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getTestimonials);
router.post("/", authMiddleware, createTestimonial);
router.put("/:id", authMiddleware, updateTestimonial);
router.delete("/:id", authMiddleware, deleteTestimonial);

export default router;