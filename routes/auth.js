const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearUsuario,
  loginUsuario,
  revalidarToken,
} = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validarJWT");
const router = Router();

router.post(
  "/new",
  [
    check("name", "Nombre obligatorio").not().isEmpty(),
    check("email", "Email obligatorio").isEmail(),
    check("password", "Password obligatorio de más de 5 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  crearUsuario
);
router.post(
  "/",
  [
    check("email", "Email obligatorio").isEmail(),
    check("password", "Password obligatorio de más de 5 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  loginUsuario
);
router.get("/renew", validarJWT, revalidarToken);

module.exports = router;
