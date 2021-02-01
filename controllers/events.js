const { response, json } = require("express");
const Evento = require("../models/Evento");

const getEventos = async (req, res = response) => {
  const eventos = await Evento.find().populate("user", "name"); //con el find se podría filtrar por diferentes parámetros

  res.json({
    ok: true,
    eventos,
  });
};
const crearEvento = async (req, res = response) => {
  const evento = new Evento(req.body);
  try {
    evento.user = req.uid;
    const eventoGuardado = await evento.save();
    res.json({ ok: true, eventoGuardado });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: "ERROOOOR get evento" });
  }

  res.json({
    ok: true,
    msg: "crearEvento",
  });
};
const actualizarEvento = async (req, res = response) => {
  const eventoId = req.params.id;
  const uid = req.uid;
  try {
    const evento = await Evento.findById(eventoId);
    if (!evento) {
      return res
        .status(404)
        .json({ ok: false, msg: "Evento inexistente para ese id" });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No es posible editar el evento de otro usuario",
      });
    }
    const nuevoEvento = { ...req.body, user: uid };
    const eventoActualizado = await Evento.findByIdAndUpdate(
      eventoId,
      nuevoEvento,
      { new: true }
    );
    res.json({
      ok: true,
      eventoActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: "ERROOOOR actualizar evento" });
  }
};
const eliminarEvento = async (req, res = response) => {
  const eventoId = req.params.id;
  const uid = req.uid;

  try {
    const evento = await Evento.findById(eventoId);
    if (!evento) {
      return res
        .status(404)
        .json({ ok: false, msg: "Evento inexistente con ese id" });
    }

    if (evento.user.toString() !== uid) {
      res.status(401).json({
        ok: false,
        msg: "No es posible eliminar el evento de otro usuario",
      });
    }

    await Evento.findByIdAndDelete(eventoId);
    res.json({
      ok: true,
      msg: "Evento eliminado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: "ERROOOOR eliminar evento" });
  }
  res.json({
    ok: true,
    msg: "eliminarEvento",
  });
};

module.exports = {
  getEventos,
  crearEvento,
  eliminarEvento,
  actualizarEvento,
};
