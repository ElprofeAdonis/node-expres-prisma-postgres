import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const nuevoestudiante = await prisma.estudiante.create({
    data: {
      email_estd: "adonis@gmail.com",
      primer_nombre_estd: "Adonis",
      primer_apellido_estd: "Aleman",
      edad_estd: "29",
      pais_origen_estd: "Costa Rica",
      carrera_estd: "Ingenieria en sistemas",
      es_moroso_estd: "false",
      deuda_ciclo_actual_estd: "Al dia",
    },
  });
  console.log("Nuevo estudiante creado: ", nuevoestudiante);
  const todosEstudiantes = await prisma.estudiante.findMany();
  console.log("Todos los estudiantes: ");
  console.dir(todosEstudiantes, { depth: null });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
