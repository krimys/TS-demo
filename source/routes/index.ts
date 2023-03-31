import express from "express";

import authRoute from "./auth.route";
import userRoute from "./user.route";
import apiDocsRoute from "./api.docs.route";

const router = express.Router();

router.use("/api-docs", apiDocsRoute);
router.use("/", authRoute);
router.use("/", userRoute);

export = router;
