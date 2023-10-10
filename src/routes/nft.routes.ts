import express from "express";
import {
  getCups,
  addCup,
  getAccessories,
  addAccessory,
  getCases,
  addCase,
} from "../controllers/nft.controller";

const router = express.Router();

// Cup Routes
router.get("/cups", getCups);
router.post("/cups", addCup);

// Accessory Routes
router.get("/accessories", getAccessories);
router.post("/accessories", addAccessory);

// Case Routes
router.get("/cases", getCases);
router.post("/cases", addCase);

export default router;
