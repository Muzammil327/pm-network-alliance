import express from "express";
import { CreateSubCategory, GetSubCategory, GetSingleSubCategory, DeleteSubCategory, UpdateSubCategory } from '../controller/SubCategoryController.js';

const router = express.Router();

router.post('/create', CreateSubCategory);
router.get('/get', GetSubCategory);
router.get('/get/:id', GetSingleSubCategory);
router.put('/update/:id', UpdateSubCategory);
router.delete('/delete/:id', DeleteSubCategory);

export default router;