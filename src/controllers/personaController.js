const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getPersonas = async (req, res) => {
  try {
    const personas = await prisma.persona.findMany();
    res.json(personas);
  } catch (error) {
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
  const { identificacion, nombre, apellido, email, telefono, direccion } = req.body;
  try {
    const nuevaPersona = await prisma.persona.create({
      data: { identificacion, nombre, apellido, email, telefono, direccion },
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
  const { identificacion, nombre, apellido, email, telefono, direccion } = req.body;
  try {
    const personaActualizada = await prisma.persona.update({
      where: { id: parseInt(id) },
      data: { identificacion, nombre, apellido, email, telefono, direccion },
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