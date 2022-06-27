import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();

const app = express();

app.use(express.json());

// Get de todos
//------------------------------------------------------

app.get("/estudiantes", async (req, res) => {
  const estudiante = await prisma.estudiante.findMany();
  res.json({
    success: true,
    payload: estudiante,
    message: "Operation Successful",
  });
});

app.get("/materias", async (req, res) => {
  const materias = await prisma.materias.findMany();
  res.json({
    success: true,
    payload: materias,
    message: "Operation Successful",
  });
});

app.get("/facultad", async (req, res) => {
  const facultad = await prisma.facultad.findMany();
  res.json({
    success: true,
    payload: facultad,
    message: "Operation Successful",
  });
});

app.get("/profesores", async (req, res) => {
  const profesor = await prisma.profesor.findMany();
  res.json({
    success: true,
    payload: profesor,
    message: "Operation Successful",
  });
});

//GET muestra solo un dato
//-------------------------------------------------------

app.get(`/estudiante/:id`, async (req, res) => {
  const { id } = req.params;
  const estudiante = await prisma.estudiante.findMany({
    where: {
      id: Number(id),
    },
  });
  res.json(estudiante);
});

app.get(`/materia/:id`, async (req, res) => {
  const { id } = req.params;
  const materia = await prisma.materias.findMany({
    where: {
      id: Number(id),
    },
  });
  res.json(materia);
});

app.get(`/facultad/:id`, async (req, res) => {
  const { id } = req.params;
  const facultad = await prisma.facultad.findMany({
    where: {
      id: Number(id),
    },
  });
  res.json(facultad);
});

app.get(`/profesor/:id`, async (req, res) => {
  const { id } = req.params;
  const profesor = await prisma.profesor.findMany({
    where: {
      id: Number(id),
    },
  });
  res.json(profesor);
});

//Get con ID y sus referencias DE UN ARREGLO DE ESTUDIANTE A FACULTAD
//---------------------------------------------------------

app.get("/estudiante/facultads/:id", async (req, res) => {
  const { id } = req.params;
  // const id = req.params.id

  const facultads = await prisma.facultad.findMany({
    where: {
      estudiante_id: Number(id),
    },
  });

  res.json(facultads);
});

app.get("/estudiantess", async (req, res) => {
  let estudiantes = await prisma.estudiante.findMany();
  for (const estudiante of estudiantes) {
    const facultad = await prisma.facultad.findMany({
      where: {
        id: estudiante.estudiante_id,
      },
    });
    estudiante.facultad = facultad;
  }
  res.json(estudiantes);
});

//Get con ID y sus referencias DE UN ARREGLO DE MATERIA A PROFESOR
//---------------------------------------------------------

app.get("/materia/profesor/:id", async (req, res) => {
  const { id } = req.params;
  // const id = req.params.id

  const profesors = await prisma.profesor.findMany({
    where: {
      materiaa_id: Number(id),
    },
  });

  res.json(profesors);
});

app.get("/materiasss", async (req, res) => {
  let materias = await prisma.materias.findMany();
  for (const materia of materias) {
    const profesor = await prisma.profesor.findUnique({
      where: {
        id: materia.materiaa_id,
      },
    });
    materia.profesor = profesor;
  }
  res.json(materias);
});

//Get con ID y sus referencias DE UN ARREGLO DE MATERIA A FACULTAD
//---------------------------------------------------------

app.get("/materia/facultad/:id", async (req, res) => {
  const { id } = req.params;
  // const id = req.params.id

  const facultads = await prisma.facultad.findMany({
    where: {
      materiae_id: Number(id),
    },
  });

  res.json(facultads);
});

app.get("/matefacultad", async (req, res) => {
  let materias = await prisma.materias.findMany();
  for (const materia of materias) {
    const facultad = await prisma.facultad.findMany({
      where: {
        id: materia.materiae_id,
      },
    });
    materia.facultad = facultad;
  }
  res.json(materias);
});

// Pos de todos
//-----------------------------------------------------

app.post("/crear_estudiante", async (req, res) => {
  const result = await prisma.estudiante.create({
    data: req.body,
  });
  res.json(result);
});

//Delete estudiante

app.delete(`/estudiante/:id`, async (req, res) => {
  const { id } = req.params;
  const estudiante = await prisma.estudiante.delete({
    where: {
      id: Number(id),
    },
  });
  res.json(`La estudiante con el id ${id} fue eliminada exitosamente`);
});

// put para estudiante

app.put("/estudiante/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const datosActualizados = await prisma.estudiante.update({
      where: { id: Number(id) },
      // req.body es la info que manda el usuario para actualizar
      data: req.body,
    });
    res.json({
      datos: datosActualizados,
      mensaje: `La estudainte con el id ${id} fue actulizado exitosamente`,
    });
  } catch (e) {
    res.json({ error: `La estudiante con el id ${id} no existe` });
  }
});

app.post("/crear_materias", async (req, res) => {
  const result = await prisma.Materias.create({
    data: req.body,
  });
  res.json(result);
});

//Delete materia

app.delete(`/materia/:id`, async (req, res) => {
  const { id } = req.params;
  const materia = await prisma.Materias.delete({
    where: {
      id: Number(id),
    },
  });
  res.json(`La materia con el id ${id} fue eliminada exitosamente`);
});

// put para materia

app.put("/materia/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const datosActualizados = await prisma.Materias.update({
      where: { id: Number(id) },
      // req.body es la info que manda el usuario para actualizar
      data: req.body,
    });
    res.json({
      datos: datosActualizados,
      mensaje: `La materias con el id ${id} fue actulizado exitosamente`,
    });
  } catch (e) {
    res.json({ error: `La materias con el id ${id} no existe` });
  }
});

app.post("/crear_facultad", async (req, res) => {
  const result = await prisma.facultad.create({
    data: req.body,
  });
  res.json(result);
});

//Delete facultad

app.delete(`/facultad/:id`, async (req, res) => {
  const { id } = req.params;
  const facultad = await prisma.facultad.delete({
    where: {
      id: Number(id),
    },
  });
  res.json(`La facultad con el id ${id} fue eliminada exitosamente`);
});

// put para facultad

app.put("/facultad/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const datosActualizados = await prisma.facultad.update({
      where: { id: Number(id) },
      // req.body es la info que manda el usuario para actualizar
      data: req.body,
    });
    res.json({
      datos: datosActualizados,
      mensaje: `La facultad con el id ${id} fue actulizado exitosamente`,
    });
  } catch (e) {
    res.json({ error: `La facultad con el id ${id} no existe` });
  }
});

app.post("/crear_profesor", async (req, res) => {
  const result = await prisma.profesor.create({
    data: req.body,
  });
  res.json(result);
});

//Delete profesor

app.delete(`/profesor/:id`, async (req, res) => {
  const { id } = req.params;
  const profesor = await prisma.profesor.delete({
    where: {
      id: Number(id),
    },
  });
  res.json(`La profesor con el id ${id} fue eliminada exitosamente`);
});

// put para profesor

app.put("/profesor/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const datosActualizados = await prisma.profesor.update({
      where: { id: Number(id) },
      // req.body es la info que manda el usuario para actualizar
      data: req.body,
    });
    res.json({
      datos: datosActualizados,
      mensaje: `La profesor con el id ${id} fue actulizado exitosamente`,
    });
  } catch (e) {
    res.json({ error: `La profesor con el id ${id} no existe` });
  }
});

app.use((req, res, next) => {
  res.status(404);
  return res.json({
    success: false,
    payload: null,
    message: `API SAYS: Endpoint not found for path: ${req.path}`,
  });
});

app.listen(3000, () =>
  console.log("REST API server ready at: http://localhost:3000")
);
