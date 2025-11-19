import { Router } from "express";
import { getExpedientes, crearExpediente } from "../controllers/Expediente.controller.js";

const router = Router();

router.get("/getExpedientes", getExpedientes);
router.post("/crear", crearExpediente);

export default router;
