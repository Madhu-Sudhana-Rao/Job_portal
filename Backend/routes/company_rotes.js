import express from "express";
import isauthentication from "../middleware/isAuthenticated.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company_controllers.js";

const router = express.Router();

router.route("/register").post(isauthentication,registerCompany);
router.route("/getcompany").get(isauthentication,getCompany);
router.route("/get/:id").get(isauthentication,getCompanyById);
router.route("/update/:id").put(isauthentication, updateCompany);

export default router;
