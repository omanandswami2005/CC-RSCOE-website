import { Router } from "express";
import { 
  createFAQ, 
  getFAQs, 
  updateFAQ, 
  deleteFAQ 
} from "../controllers/faqController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getFAQs);
router.post("/", authMiddleware, createFAQ);
router.put("/:id", authMiddleware, updateFAQ);
router.delete("/:id", authMiddleware, deleteFAQ);

export default router;