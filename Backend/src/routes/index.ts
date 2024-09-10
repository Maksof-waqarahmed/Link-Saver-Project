import userRoutes from "./userRoute";
import contentRouter from './contentRoute'
import { Router } from "express";
const router = Router();

router.use("/content", contentRouter )
router.use("/user", userRoutes);
export default router;