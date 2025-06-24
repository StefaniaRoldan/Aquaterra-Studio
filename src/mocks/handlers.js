import * as msw from "msw";
export const handlers = [

  msw.rest.get("/api/clases", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
    { id: 1, dia: "Lunes", hora: "08:00", tipo: "Reformer", cupos: 3 },
    { id: 2, dia: "Lunes", hora: "09:00", tipo: "Reformer", cupos: 3 },
    { id: 3, dia: "Lunes", hora: "10:00", tipo: "Reformer", cupos: 3 },
    { id: 4, dia: "Lunes", hora: "11:00", tipo: "Reformer", cupos: 3 },
    { id: 5, dia: "Lunes", hora: "15:00", tipo: "Reformer", cupos: 3 },
    { id: 6, dia: "Lunes", hora: "16:00", tipo: "Reformer", cupos: 3 },
    { id: 7, dia: "Lunes", hora: "17:00", tipo: "Reformer", cupos: 3 },
    { id: 8, dia: "Lunes", hora: "18:00", tipo: "Reformer", cupos: 3 },
    { id: 9, dia: "Lunes", hora: "20:00", tipo: "Reformer", cupos: 3 },
      ])
    );
  }),

  // Endpoint para reservar una clase
  msw.rest.post("/api/reservar", (req, res, ctx) => {
    const { idClase } = req.body;
    return res(
      ctx.status(200),
      ctx.json({ message: `Reserva confirmada para clase ${idClase}` })
    );
  }),
];