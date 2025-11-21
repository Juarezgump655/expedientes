import { Router } from "express";
import { getCatalogosByType } from "../controllers/Catalogo.controller.js";
const router = Router();

router.get("/catalogosbytipo/:tipo", getCatalogosByType);

export default router;

