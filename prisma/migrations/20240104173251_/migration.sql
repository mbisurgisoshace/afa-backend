/*
  Warnings:

  - The values [PRESIDENTE,SOCIO_GERENTE,DIRECTOR,APODERADO,REPRESENTANTE_LEGAL,SOCIO,EMPLEADO_EX_AFA,EX_EMPLEADO_ACTUAL_AFA,FAMILIAR_COMUN_AFA_ENTIDAD,PERSONAL_INTERES_ECONOMICO_AFA] on the enum `TipoPersonaInteres` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TipoPersonaInteres_new" AS ENUM ('Presidente', 'Socio Gerente', 'Director', 'Apoderado', 'Representante Legal', 'Socio', 'Empleado Ex AFA', 'Ex Empleado Actual AFA', 'Familiar Comun AFA Entidad', 'Personal Interes Economico AFA');
ALTER TABLE "PersonasInteres" ALTER COLUMN "tipo" TYPE "TipoPersonaInteres_new" USING ("tipo"::text::"TipoPersonaInteres_new");
ALTER TYPE "TipoPersonaInteres" RENAME TO "TipoPersonaInteres_old";
ALTER TYPE "TipoPersonaInteres_new" RENAME TO "TipoPersonaInteres";
DROP TYPE "TipoPersonaInteres_old";
COMMIT;
