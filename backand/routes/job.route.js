import express from "express";


import isAuthenticated from "../middlewares/isAuthenticated.js"
import { getAlljobs, getJobById, postjob, updateJob } from "../controllers/job.controller.js";
const router = express.Router();
router.route("/post").post(isAuthenticated,postjob);
router.route("/get").get(isAuthenticated,getAlljobs);
router.route("/getadminjobs").get(isAuthenticated,getAlljobs);
router.route("/get/:id").get(isAuthenticated,getJobById);
router.route("/update/:id").put(isAuthenticated, updateJob);
export default router;