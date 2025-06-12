import { Router } from "express";
import { 
  createAchievement, 
  getAchievements, 
  getAchievementById, 
  updateAchievement, 
  deleteAchievement 
} from "../controllers/achievementController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getAchievements);
router.get("/:id", getAchievementById);
router.post("/", authMiddleware, createAchievement);
router.put("/:id", authMiddleware, updateAchievement);
router.delete("/:id", authMiddleware, deleteAchievement);

export default router;