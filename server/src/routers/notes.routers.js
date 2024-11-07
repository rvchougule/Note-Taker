import { Router } from "express";
import {
  createNote,
  updateNote,
  deleteNote,
  getNoteById,
  getAllNote,
} from "../controllers/notes.cotroller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/").get(getAllNote);
router.route("/:noteId").get(getNoteById);

router.route("/").post(createNote);
router.route("/:noteId").patch(updateNote);
router.route("/:noteId").delete(deleteNote);

export default router;
