const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getAllAuditoriumTypes() {
  return await prisma.AUDITORIUM_TYPE.findMany();
}

async function getAuditoriumsByType(auditoriumTypeCode) {
  const auditoriumType = await prisma.AUDITORIUM_TYPE.findUnique({
    where: { AUDITORIUM_TYPE: auditoriumTypeCode },
    include: { AUDITORIUM: true }
  });

  return {
    auditorium_type: auditoriumType.AUDITORIUM_TYPE,
    auditorium_typename: auditoriumType.AUDITORIUM_TYPENAME,
    Auditoriums: auditoriumType.AUDITORIUM.map(auditorium => ({
      auditorium: auditorium.AUDITORIUM
    }))
  };
}

async function updateAuditoriumType(auditoriumTypeData) {
  const { ID, ...data } = auditoriumTypeData;

  return await prisma.AUDITORIUM_TYPE.update({
    where: { ID },
    data
  });
}

async function deleteAuditoriumType(id) {
  const auditoriumType = await prisma.AUDITORIUM_TYPE.findUnique({
    where: { ID: id },
  });

  if (auditoriumType) {
    await prisma.AUDITORIUM_TYPE.delete({
      where: { ID: id },
    });
  }

  return auditoriumType;
}

async function addAuditoriumType(data) {
  if (!data.AUDITORIUM_TYPE || !data.AUDITORIUM_TYPENAME) {
    throw new Error('All fields are required');
  }

  return await prisma.AUDITORIUM_TYPE.create({
    data: {
      AUDITORIUM_TYPE: data.AUDITORIUM_TYPE,
      AUDITORIUM_TYPENAME: data.AUDITORIUM_TYPENAME
    }
  });
}

module.exports = {
  getAllAuditoriumTypes,
  getAuditoriumsByType,
  updateAuditoriumType,
  deleteAuditoriumType,
  addAuditoriumType
};
