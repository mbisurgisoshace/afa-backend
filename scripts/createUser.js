import bcrypt from 'bcrypt';
import minimist from 'minimist';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const args = minimist(process.argv);

/**
 * Crear usuarios
 * @param --email
 * @param --nombre
 * @param --apellido
 * @param --password
 * @param --userRole (USER | ADMIN)
 */
async function crearUsuario(email, nombre, apellido, password, userRole = 'USER') {
    if (!email || !nombre || !apellido || !password) throw new Error('No se ha especificado un email, nombre, apellido o password.');

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
        data: {
            email,
            nombre,
            apellido,
            rol: userRole,
            password: hashedPassword,
        }
    });
}

crearUsuario(args.email, args.nombre, args.apellido, args.password, args.userRole?.toUpperCase());