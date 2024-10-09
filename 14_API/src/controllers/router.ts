import { Router } from "express";
import testControllerRouter from "./TestController/TestController";

const router = Router();

router.use("/test", testControllerRouter);

export default router;