import express from "express";
import {
  create,
  get,
  getAll,
  remove,
  updatePatch,update
} from "../controllers/category.js";
import { checkPermission } from "../middleware/checkPermission.js";
const router = express.Router();

router.get("/", getAll);
router.get("/:id", get);
router.post("/",checkPermission,create);
router.put("/:id",checkPermission,update);
router.delete("/:id",checkPermission, remove);

export default router;
