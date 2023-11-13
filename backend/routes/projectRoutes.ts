import express from "express";
import {
  createProject,
  getAllProjects,
  getSingleProjectServer,
  editProject,
  deleteProject,
  addCollaborator,
  deleteCollaborator,
} from "../controllers/index.ts";
import { checkAuth } from "../middleware/check-auth.ts";

const router = express.Router();

router.route("/").get(checkAuth, getAllProjects).post(checkAuth, createProject);

router
  .route("/:id")
  .get(checkAuth, getSingleProjectServer)
  .put(checkAuth, editProject)
  .delete(checkAuth, deleteProject);


router.post("/add-collaborator/:id", checkAuth, addCollaborator);

router.post("/delete-collaborator/:id", checkAuth, deleteCollaborator);

export default router;
