import { Router } from "express";
import { StoreController } from "./controllers/store.controller";
import { UserController } from "./controllers/user.controller";

const router = Router();

// User Routes
router.get('/', UserController.get);
router.get('/user/:uid', UserController.getUser);
router.post('/user', UserController.saveNewUser);
router.put('/user', UserController.updateUser);
router.put('/address', UserController.address2User);
router.delete('/address/:uid/:name', UserController.rmAddress);

// Store Routes
router.get('/store/:id', StoreController.getStore);
router.post('/store', StoreController.saveNewStore);
router.put('/store', StoreController.updateStore);
router.put('/store/address', StoreController.address2Store);
router.delete('/store/address/:id/:uid/:name', StoreController.rmAddress);

export { router };
