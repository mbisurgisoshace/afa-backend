-- CreateEnum
CREATE TYPE "TipoPersonaInteres" AS ENUM ('PRESIDENTE', 'SOCIO_GERENTE', 'DIRECTOR', 'APODERADO', 'REPRESENTANTE_LEGAL', 'SOCIO', 'EMPLEADO_EX_AFA', 'EX_EMPLEADO_ACTUAL_AFA', 'FAMILIAR_COMUN_AFA_ENTIDAD', 'PERSONAL_INTERES_ECONOMICO_AFA');

-- CreateEnum
CREATE TYPE "TipoDocumento" AS ENUM ('DNI', 'DU', 'CI', 'LIBRETA_ENROLAMIENTO', 'PASAPORTE');

-- CreateEnum
CREATE TYPE "TipoDocumentoAfip" AS ENUM ('CUIT', 'CUIL');

-- CreateEnum
CREATE TYPE "TipoRelacion" AS ENUM ('PROVEDOOR', 'SPONSOR', 'AGENTE_COMERCIAL', 'CLUB');

-- CreateEnum
CREATE TYPE "TipoActividad" AS ENUM ('COMERCIAL', 'INDUSTRIAL');

-- CreateEnum
CREATE TYPE "CondicionIva" AS ENUM ('RESPONSABLE_INSCRIPTO');

-- CreateEnum
CREATE TYPE "TipoEntidad" AS ENUM ('HUMANA', 'JURIDICA', 'ORGANISMO_PUBLICO', 'OTROS');

-- CreateEnum
CREATE TYPE "TipoCuentaBancaria" AS ENUM ('CAJA_AHORRO_PESOS', 'CUENTA_CORRIENTE_PESOS', 'CUENTA_UNICA', 'CAJA_AHORRO_DOLARES', 'CUENTA_CORRIENTE_DOLARES', 'OTRA');

-- CreateEnum
CREATE TYPE "TipoSocietario" AS ENUM ('SOCIEDAD_ANONIMA');

-- CreateEnum
CREATE TYPE "Sexo" AS ENUM ('MASCULINO', 'FEMENINO');

-- CreateEnum
CREATE TYPE "EstadoCivil" AS ENUM ('SOLTERO_A');

-- CreateTable
CREATE TABLE "Entidades" (
    "id" SERIAL NOT NULL,
    "codigoEntidad" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "tipoRelacion" "TipoRelacion" NOT NULL,
    "tipoActividad" "TipoActividad" NOT NULL,
    "condicionIva" "CondicionIva" NOT NULL,
    "codigoActividadAfip" TEXT NOT NULL,
    "tipoIndustria" TEXT NOT NULL,
    "ingresosEnPesos" DECIMAL(65,30) NOT NULL,
    "fechaCierrePesos" TIMESTAMP(3) NOT NULL,
    "tipoEntidad" "TipoEntidad" NOT NULL,
    "direccion" TEXT NOT NULL,
    "ciudad" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "codigoPostal" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contactoAfa" TEXT NOT NULL,
    "bancoCuentaBancaria" TEXT NOT NULL,
    "titularCuentaBancaria" TEXT NOT NULL,
    "sucursalCuentaBancaria" TEXT NOT NULL,
    "numeroCuentaBancaria" TEXT NOT NULL,
    "tipoCuentaBancaria" "TipoCuentaBancaria" NOT NULL,
    "cbu" TEXT NOT NULL,
    "alias" TEXT,
    "tieneOficinasExterior" BOOLEAN NOT NULL,
    "oficinasExterior" TEXT[],
    "tieneOperacionesExterior" BOOLEAN NOT NULL,
    "operacionesExterior" TEXT[],
    "montoOperacionesExterior" DECIMAL(65,30),
    "fechaCierrePesosExterior" TIMESTAMP(3),
    "porcentajeExportacionVsTotal" DECIMAL(65,30),
    "nombre" TEXT,
    "segundoNombre" TEXT,
    "apellido" TEXT,
    "nacionalidad" TEXT,
    "tipoDocumento" "TipoDocumento",
    "dni" TEXT,
    "tipoDocumentoAfip" "TipoDocumentoAfip",
    "sexo" "Sexo",
    "estadoCivil" "EstadoCivil",
    "fechaNacimiento" TIMESTAMP(3),
    "paisNacimiento" TEXT,
    "profesion" TEXT,
    "expuestaPoliticamente" BOOLEAN NOT NULL,
    "archivoDDJJPep" TEXT,
    "cuit" TEXT,
    "conflictoInteresEmpleadosAfa" BOOLEAN NOT NULL,
    "descripcionConflictoInteresEmpleadosAfa" TEXT,
    "empleadoActualExAfa" BOOLEAN NOT NULL,
    "exEmpleadoActualAfa" BOOLEAN NOT NULL,
    "familiarComunAfaEntidad" BOOLEAN NOT NULL,
    "personalConInteresEconomicoAfa" BOOLEAN NOT NULL,
    "razonSocial" TEXT,
    "tipoSocietario" "TipoSocietario",
    "fechaConstitucionSociedad" TIMESTAMP(3),
    "fechaInscripcionRpc" TIMESTAMP(3),
    "datosInscripcionRegistrales" TEXT,
    "archivoEstatuto" TEXT,
    "cotizaEnBolsa" BOOLEAN,
    "dondeCotiza" TEXT[],
    "esSujetoObligado" BOOLEAN,
    "razonSujetoObligado" TEXT,
    "tieneProgramaPrevencion" BOOLEAN NOT NULL,
    "archivoProgramaPrevencion" TEXT,
    "tieneProgramaIntegridad" BOOLEAN NOT NULL,
    "archivoProgramaIntegridad" TEXT,
    "archivoFormularioDDJJ" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Entidades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonasInteres" (
    "id" SERIAL NOT NULL,
    "tipo" "TipoPersonaInteres" NOT NULL,
    "nombreApellido" TEXT NOT NULL,
    "tipoDocumento" "TipoDocumento" NOT NULL,
    "documento" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "email" TEXT,
    "porcentajeAccionario" DECIMAL(65,30),
    "expuestaPoliticamente" BOOLEAN NOT NULL,
    "archivoDDJJPep" TEXT,
    "archivoPoder" TEXT,
    "cargoEnAfa" TEXT,
    "fechaCargoEnAfa" TIMESTAMP(3),
    "tipoInteresAfa" TEXT NOT NULL,
    "entidadId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PersonasInteres_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PersonasInteres" ADD CONSTRAINT "PersonasInteres_entidadId_fkey" FOREIGN KEY ("entidadId") REFERENCES "Entidades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
