import { Router } from "express";
import { OrderController } from "./controllers/order.controller";
import { ProductController } from "./controllers/product.controller";
import { StoreController } from "./controllers/store.controller";
import { UserController } from "./controllers/user.controller";
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

const router = Router();

// User Routes
router.get('/', UserController.get);
router.get('/user/:uid', UserController.getUser);
router.post('/user', UserController.saveNewUser);
router.put('/user-avatar', upload.single('avatar'), UserController.updateUserPhoto);
router.put('/user', UserController.updateUser);
router.put('/address', UserController.address2User);
router.delete('/address/:uid/:name', UserController.rmAddress);

// Store Routes
router.get('/stores', StoreController.getStores);
router.get('/stores-by-owner/:id', StoreController.getStoresByOwner);
router.get('/categories', StoreController.getCategories);
router.get('/store/:id', StoreController.getStore);
router.post('/category', StoreController.saveNewCategory);
router.post('/store', StoreController.saveNewStore);
router.post('/data-to-store', StoreController.addData2Store);
router.put('/store', StoreController.updateStore);
router.put('/store/address', StoreController.address2Store);
router.delete('/store/address/:id/:uid/:name', StoreController.rmAddress);

// Product Routes
router.get('/products/:store', ProductController.getProducts);
router.get('/product/:store/:cod', ProductController.getProduct);
router.post('/product', ProductController.saveNewProduct);
router.put('/product', ProductController.updateProduct);
router.delete('/product/:store/:uid/:cod', ProductController.deleteProduct);

// Order Routes
router.get('/orders/:store', OrderController.getOrders);
router.get('/orders-by-client/:store/:client', OrderController.getOrdersByClient);
router.get('/order/:cod', OrderController.getOrder);
router.post('/order', OrderController.saveNewOrder);
router.put('/order', OrderController.updateOrder);

export { router };
