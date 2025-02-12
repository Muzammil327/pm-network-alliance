import express from "express";
import { CreateCategory, GetCategory, DeleteCategory, UpdateCategory, GetSingleCategory } from '../controller/CategoryController.js';

const router = express.Router();

router.post('/create', CreateCategory);
router.get('/get', GetCategory);
router.get('/get/:id', GetSingleCategory);
router.put('/update/:id', UpdateCategory);
router.delete('/delete/:id', DeleteCategory);

export default router;