import {validarUsuarioPass} from "../services/Users.js";

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await validarUsuarioPass(email, password);

    return res.json({
      ok: true,
      token: result
    });

  } catch (err) {
    return res.status(400).json({
      ok: false,
      msg: err.message
    });
  }
}

