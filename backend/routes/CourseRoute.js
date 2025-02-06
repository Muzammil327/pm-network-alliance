import express from "express";
import { CreateCourse, GetCourse, UpdateCourse, DeleteCourse, SingleCourse, GetCoursePlatform, GetCourseCatgeory } from '../controller/CourseController.js';

const router = express.Router();

router.post('/create', CreateCourse);
router.get('/get', GetCourse);
router.get('/get-platform', GetCoursePlatform);
router.get('/get-catgeory', GetCourseCatgeory);
router.get('/get/:id', SingleCourse);
router.put('/update/:id', UpdateCourse);
router.delete('/delete/:id', DeleteCourse);

export default router;