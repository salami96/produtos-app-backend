import { Router } from "express";
import { UserController } from "./controllers/user.controller";

const router = Router();
const error = Router();

router.get('/', UserController.get);
router.post('/user', UserController.getUser);
router.post('/new-user', UserController.saveNewUser);
router.put('/user', UserController.updateUser);

export { router, error };
