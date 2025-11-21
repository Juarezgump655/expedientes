import { jest } from '@jest/globals';
import request from "supertest";
import express from "express";


jest.unstable_mockModule("../services/Users.js", () => ({
  validarUsuarioPass: jest.fn(),
  __esModule: true, 
}));

const { loginController } = await import("../controllers/Auth.controller.js");
const userService = await import("../services/Users.js");

const app = express();
app.use(express.json());
app.post("/login", loginController);

describe("Login API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns token, nombre, roles y pantallas", async () => {
    userService.validarUsuarioPass.mockResolvedValue({
      token: "fake-jwt",
      nombre: "Angel Enrique Juarez Castellanos",
      roles: [{ rol: "4" }],
      pantallas: [
        { name: "Expedientes", path: "/dashboard/expedientes" },
        { name: "Reportes", path: "/dashboard/reportes" }
      ]
    });

    const res = await request(app)
      .post("/login")
      .send({ email: "ajuarezcastellanos45@gmail.com", password: "123456" });

    expect(res.statusCode).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.token).toBeDefined();
  });

  it("returns 400 si hay error", async () => {
    userService.validarUsuarioPass.mockRejectedValue(new Error("Contraseña incorrecta"));

    const res = await request(app)
      .post("/login")
      .send({ email: "ajuarezcastellanos45@gmail.com", password: "wrongpassword" });

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({
      ok: false,
      msgError: "Error al validar usuario y contraseña"
    });
  });
});