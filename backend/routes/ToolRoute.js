import express from "express";
import { CreateTool, GetTool, UpdateTool, DeleteTool, SingleTool, GetToolSubCatgeory, GetToolCatgeory } from '../controller/ToolController.js';

const router = express.Router();

router.post('/create', CreateTool);
router.get('/get', GetTool);
router.get('/get-subcatgeory', GetToolSubCatgeory);
router.get('/get-catgeory', GetToolCatgeory);
router.get('/get/:id', SingleTool);
router.put('/update/:id', UpdateTool);
router.delete('/delete/:id', DeleteTool);

export default router;