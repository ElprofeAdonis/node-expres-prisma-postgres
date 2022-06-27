-- CreateTable
CREATE TABLE "estudiante" (
    "id" SERIAL NOT NULL,
    "email_estd" TEXT NOT NULL,
    "primer_nombre_estd" TEXT NOT NULL,
    "primer_apellido_estd" TEXT NOT NULL,
    "edad_estd" TEXT,
    "pais_origen_estd" TEXT,
    "carrera_estd" TEXT,
    "es_moroso_estd" BOOLEAN NOT NULL DEFAULT false,
    "deuda_ciclo_actual_estd" TEXT,
    "materia_id" INTEGER NOT NULL,

    CONSTRAINT "estudiante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Materias" (
    "id" SERIAL NOT NULL,
    "nombre_materia" TEXT NOT NULL,
    "codigo_materia" TEXT NOT NULL,
    "creditos" TEXT NOT NULL,
    "carrera" TEXT NOT NULL,

    CONSTRAINT "Materias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Facultad" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "nombre_decano" TEXT NOT NULL,
    "abreviacion" TEXT NOT NULL,
    "estudiante_id" INTEGER NOT NULL,
    "materiae_id" INTEGER NOT NULL,

    CONSTRAINT "Facultad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profesor" (
    "id" SERIAL NOT NULL,
    "nombre_prof" TEXT NOT NULL,
    "apellido_prof" TEXT NOT NULL,
    "iniciales_prof" TEXT NOT NULL,
    "materiaa_id" INTEGER NOT NULL,

    CONSTRAINT "Profesor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "estudiante_email_estd_key" ON "estudiante"("email_estd");

-- AddForeignKey
ALTER TABLE "estudiante" ADD CONSTRAINT "estudiante_materia_id_fkey" FOREIGN KEY ("materia_id") REFERENCES "Materias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Facultad" ADD CONSTRAINT "Facultad_estudiante_id_fkey" FOREIGN KEY ("estudiante_id") REFERENCES "estudiante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Facultad" ADD CONSTRAINT "Facultad_materiae_id_fkey" FOREIGN KEY ("materiae_id") REFERENCES "Materias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profesor" ADD CONSTRAINT "Profesor_materiaa_id_fkey" FOREIGN KEY ("materiaa_id") REFERENCES "Materias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
