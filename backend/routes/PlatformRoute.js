import express from "express";
import { CreatePlatform, GetPlatform, DeletePlatform, UpdatePlatform, GetSinglePlatform } from '../controller/PlatformController.js';

const router = express.Router();

router.post('/create', CreatePlatform);
router.get('/get', GetPlatform);
router.get('/get/:id', GetSinglePlatform);
router.put('/update/:id', UpdatePlatform);
router.delete('/delete/:id', DeletePlatform);

export default router;