const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getPersonas = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search ? String(req.query.search).trim() : '';

    const where = search
      ? {
          OR: [
            { nombre: { contains: search, mode: 'insensitive' } },
            { apellido: { contains: search, mode: 'insensitive' } },
            { identificacion: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {};

    // Si se especifica paginación o búsqueda
    const skip = (page - 1) * limit;
    const [personas, total] = await Promise.all([
      prisma.persona.findMany({
        where,
        skip,
        take: limit,
        orderBy: { id: 'asc' },
      }),
      prisma.persona.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit) || 1;

    res.json({
      data: personas,
      total,
      page,
      limit,
      totalPages,
    });
  } catch (error) {
    console.error('Error obteniendo personas:', error);
    res.status(500).json({ error: 'Error obteniendo personas' });
  }
};

const getPersonaById = async (req, res) => {
  const { id } = req.params;
  try {
    const persona = await prisma.persona.findUnique({ where: { id: parseInt(id) } });
    if (!persona) return res.status(404).json({ error: 'Persona no encontrada' });
    res.json(persona);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo la persona' });
  }
};

const createPersona = async (req, res) => {
  const { identificacion, nombre, apellido, email, telefono, direccion, foto } = req.body;
  try {
    const nuevaPersona = await prisma.persona.create({
      data: { identificacion, nombre, apellido, email, telefono, direccion, foto },
    });
    res.status(201).json(nuevaPersona);
  } catch (error) {
    if (error.code === 'P2002') {
      const campo = error.meta?.target?.[0] || 'campo';
      return res.status(409).json({ error: `Ya existe una persona con ese ${campo}` });
    }
    res.status(500).json({ error: 'Error creando la persona' });
  }
};

const updatePersona = async (req, res) => {
  const { id } = req.params;
  const { identificacion, nombre, apellido, email, telefono, direccion, foto } = req.body;
  try {
    const personaActualizada = await prisma.persona.update({
      where: { id: parseInt(id) },
      data: { identificacion, nombre, apellido, email, telefono, direccion, foto },
    });
    res.json(personaActualizada);
  } catch (error) {
    if (error.code === 'P2002') {
      const campo = error.meta?.target?.[0] || 'campo';
      return res.status(409).json({ error: `Ya existe una persona con ese ${campo}` });
    }
    if (error.code === 'P2025') return res.status(404).json({ error: 'Persona no encontrada' });
    res.status(500).json({ error: 'Error actualizando la persona' });
  }
};

const deletePersona = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.persona.delete({ where: { id: parseInt(id) } });
    res.json({ mensaje: 'Persona eliminada correctamente' });
  } catch (error) {
    if (error.code === 'P2025') return res.status(404).json({ error: 'Persona no encontrada' });
    res.status(500).json({ error: 'Error eliminando la persona' });
  }
};

module.exports = { getPersonas, getPersonaById, createPersona, updatePersona, deletePersona };