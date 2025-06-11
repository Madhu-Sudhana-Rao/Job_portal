import express from "express";
import isauthentication from "../middleware/isAuthenticated.js";
import { applyjob, getapplicants, getApplication, updateStatus } from "../controllers/application_controller.js";


const router = express.Router();

router.route("/apply/:id").get(isauthentication, applyjob);
router.route("/get").get(isauthentication, getApplication);
router.route(":id/applicants").get(isauthentication, getApplication);
router.route("/status/:id/update").get(isauthentication, updateStatus);


export default router;
