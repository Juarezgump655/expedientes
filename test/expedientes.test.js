import { jest } from '@jest/globals';
import request from "supertest";
import express from "express";

jest.unstable_mockModule("../services/Expedientes.js", () => ({
  getExpedientesService: jest.fn(),
  crearExpedienteService: jest.fn(),
  actualizarARegistradoIndicioExpediente: jest.fn(),
  getExpedienteForRevision: jest.fn(),
  revExpeediente: jest.fn(),
  getExpedienteByFechas: jest.fn(),
  __esModule: true,
}));


const { getExpedientes, crearExpediente } = await import("../controllers/Expediente.controller.js");
const expedienteService = await import("../services/Expedientes.js");


const app = express();
app.use(express.json());

app.use((req, res, next) => {
  req.user = { dpi: "1234567890101" }; // DPI simulado del token
  next();
});

// Rutas
app.get("/expedientes", getExpedientes);
app.post("/expedientes", crearExpediente);

describe("Expedientes Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });


  describe("GET /expedientes", () => {
    it("Debe retornar lista de expedientes y status 200", async () => {
      const mockData = [
        { no_expediente: "EXP-001", descripcion: "Caso Prueba 1" },
        { no_expediente: "EXP-002", descripcion: "Caso Prueba 2" }
      ];

      expedienteService.getExpedientesService.mockResolvedValue(mockData);

      const res = await request(app).get("/expedientes");

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockData);
      expect(expedienteService.getExpedientesService).toHaveBeenCalledTimes(1);
    });

    it("Debe retornar 500 si el servicio falla", async () => {
      expedienteService.getExpedientesService.mockRejectedValue(new Error("DB Error"));

      const res = await request(app).get("/expedientes");

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ error: "Error al obtener expedientes" });
    });
  });

  describe("POST /expedientes", () => {
    it("Debe crear expediente exitosamente y retornar 200", async () => {
      const inputData = { descripcion: "Robo de vehiculo" };
      const mockResponse = {
        message: "Expediente creado exitosamente",
        expediente: "EXP-2025-001"
      };

      expedienteService.crearExpedienteService.mockResolvedValue(mockResponse);

      const res = await request(app)
        .post("/expedientes")
        .send(inputData);

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockResponse);

      expect(expedienteService.crearExpedienteService).toHaveBeenCalledWith(
        inputData, 
        "1234567890101" 
      );
    });

    it("Debe retornar 500 si falla la creación", async () => {
      expedienteService.crearExpedienteService.mockRejectedValue(new Error("Error SQL"));

      const res = await request(app)
        .post("/expedientes")
        .send({ descripcion: "Fallo intencional" });

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ msgError: "No se pudo crear el expediente" });
    });
  });
});