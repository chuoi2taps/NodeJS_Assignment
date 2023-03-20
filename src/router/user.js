import express from 'express'
import { getAll ,get,create,remove, put, update} from '../controllers/user'
const router = express.Router()

router.get("/users",getAll)
router.get("/users/:id",get)
router.post("/users",create)
router.delete("/users/:id",remove)
router.patch("/users/:id",update)
router.put("/users/:id",put)
export default router