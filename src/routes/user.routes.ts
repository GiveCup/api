import { Router } from "express";
import * as UserController from "../controllers/user.controller";

const router = Router();

router.get("/", UserController.getAllUsers);
router.post("/upsert", UserController.upsertUser);
router.get("/leaderboard", UserController.getLeaderboard);

export default router;
