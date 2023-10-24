import express from "express";
import { confirmSession, login, recoverPasssword, register, updatePassword, verifyToken } from "../controllers/userController";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/confirm/:token", confirmSession);
router.post("/recover-password", recoverPasssword);
router.route("/recover-password/:token").get(verifyToken).post(updatePassword);



export default router;