import express from 'express';
import { UserController } from './user.controller';
const router = express.Router();

//users
router.post('/api/users', UserController.createUser);
router.get('/api/users', UserController.getAllUsers);
router.get('/api/users/:userId', UserController.getSingleUser);
router.put('/api/users/:userId', UserController.updateUser);
router.delete('/api/users/:userId', UserController.deleteUser);

//orders
router.put('/api/users/:userId/orders', UserController.addOrder);
router.get('/api/users/:userId/orders', UserController.getSingleUserOrder);
router.get('/api/users/:userId/orders/total-price', UserController.TotalPrice);

export const UserRoutes = router;