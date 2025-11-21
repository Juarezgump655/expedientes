import { Router } from "express";
import { getExpedientes, crearExpediente, actualizarARegistradoIndicioExpedienteController,getExpedienteForRevisionController, revExpeedienteController } from "../controllers/Expediente.controller.js";
import {loginController} from "../controllers/Auth.controller.js";
const router = Router();

router.get("/getExpedientes", getExpedientes);
router.post("/crear", crearExpediente);
router.put("/actualizarARegistrado/:noExpediente", actualizarARegistradoIndicioExpedienteController);
router.get("/getExpedientesRev", getExpedienteForRevisionController);
router.post("/revExpediente", revExpeedienteController);
export default router;
