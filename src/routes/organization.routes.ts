import { Router } from "express";
import * as OrganizationController from "../controllers/organization.controller";

const router = Router();

router.get("/", OrganizationController.getAllOrganizations);
router.get("/:id", OrganizationController.getOrganizationById);
router.post("/", OrganizationController.createOrganization);
router.put("/:id", OrganizationController.updateOrganization);
router.delete("/:id", OrganizationController.deleteOrganization);

export default router;
