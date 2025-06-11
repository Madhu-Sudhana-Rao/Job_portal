import express from "express";
import isauthentication from "../middleware/isAuthenticated.js";
import { getAdminJob, getAllJobs, getJobById, post_job } from "../controllers/job_controllers.js";

const router = express.Router();

router.route("/post").post(isauthentication, post_job);
router.route("/get").get(isauthentication, getAllJobs);
router.route("/getadminjobs").get(isauthentication, getAdminJob);
router.route("/get/:id").get(isauthentication, getJobById);

export default router;
