import express from 'express';
import { deleteReqStudentRouter, getReqStudentRouter, postReqStudentRouter, putReqStudentRouter } from '../controllers/studentController.js';
import user from "../models/user.js";

const studentRouter = express.Router();

studentRouter.get("/",getReqStudentRouter);

studentRouter.post("/",postReqStudentRouter);

studentRouter.put("/",putReqStudentRouter)

studentRouter.delete("/",deleteReqStudentRouter)

export default studentRouter;