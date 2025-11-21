import { Router } from "express";
import { getIndiciosExpediente,crearIndicioExpedienteController, actualizarARegistradoIndicioExpedienteController} from "../controllers/IndiciosExpediente.controller.js";
const router = Router();


router.get("/getDetalleExpediente/:noExpediente", getIndiciosExpediente);
router.post("/crearIndicioExpediente", crearIndicioExpedienteController);
router.post("/modificarIndicioExpediente", actualizarARegistradoIndicioExpedienteController);
export default router;
