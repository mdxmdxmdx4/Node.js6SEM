const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getAllAuditoriums() {
  return await prisma.AUDITORIUM.findMany();
}

async function getComputerClassesInBuilding1() {
  const auditoriumType = await prisma.AUDITORIUM_TYPE.findUnique({
    where: { AUDITORIUM_TYPE: 'ЛБ-К' },
  });

  if (!auditoriumType) {
    return [];
  }
  const auditoriums = await prisma.AUDITORIUM.findMany({
    where: {
      AUDITORIUM_TYPE_ID: auditoriumType.ID,
      AUDITORIUM: {
        endsWith: '1'
      }
    },
    select: {
      AUDITORIUM: true,
      AUDITORIUM_NAME: true,
      AUDITORIUM_CAPACITY: true,
      Auditorium_Type: {
        select: {
          AUDITORIUM_TYPE: true,
          AUDITORIUM_TYPENAME: true
        }
      }
    }
  });

  return auditoriums;
}

async function getAuditoriumsSameCount() {
  const auditoriums = await prisma.AUDITORIUM.findMany({
    include: {
      Auditorium_Type: true
    }
  });

  const count = {};

  auditoriums.forEach(auditorium => {
    const key = `${auditorium.Auditorium_Type.AUDITORIUM_TYPE}-${auditorium.AUDITORIUM_CAPACITY}`;
    if (!count[key]) {
      count[key] = 0;
    }
    count[key]++;
  });

  return count;
}


async function updateAuditorium(auditoriumData) {
  const { ID, ...data } = auditoriumData;

  return await prisma.AUDITORIUM.update({
    where: { ID },
    data
  });
}

async function deleteAuditorium(id) {
  const auditorium = await prisma.AUDITORIUM.findUnique({
    where: { ID: id },
  });

  if (auditorium) {
    await prisma.AUDITORIUM.delete({
      where: { ID: id },
    });
  }

  return auditorium;
}

async function addAuditorium(data) {
  if (!data.AUDITORIUM || !data.AUDITORIUM_NAME || !data.AUDITORIUM_CAPACITY || !data.AUDITORIUM_TYPE_ID) {
    throw new Error('All fields are required');
  }

  return await prisma.AUDITORIUM.create({
    data: {
      AUDITORIUM: data.AUDITORIUM,
      AUDITORIUM_NAME: data.AUDITORIUM_NAME,
      AUDITORIUM_CAPACITY: data.AUDITORIUM_CAPACITY,
      AUDITORIUM_TYPE_ID: data.AUDITORIUM_TYPE_ID
    }
  });
}


async function getSpecificAuditoriums() {
  return await prisma.AUDITORIUM.findMany({
    where: {
      AUDITORIUM_CAPACITY: {
        gte: 30
      },
      AUDITORIUM_TYPE_ID: {
        equals: 4
      }
    },
    select: {
      AUDITORIUM: true,
      AUDITORIUM_NAME: true,
      AUDITORIUM_CAPACITY: true
    },
    orderBy: {
      AUDITORIUM_CAPACITY: 'desc'
    }
  });
}

async function incrementCapacity() {
  try {
    const result = await prisma.$transaction(async (prisma) => {
      const auditoriums = await prisma.AUDITORIUM.findMany({
        where: {
          AUDITORIUM_CAPACITY: {
            gte: 100
          }
        }
      });

      const updates = auditoriums.map(auditorium => {
        return prisma.AUDITORIUM.update({
          where: { ID: auditorium.ID },
          data: { AUDITORIUM_CAPACITY: { increment: 100 } }
        });
      });

      await Promise.all(updates);
      console.log('Capacity incremented successfully');

      // Откатываем изменения
      throw new Error('Rolling back transaction');
    });
  } catch (error) {
    console.error('Error while processing the transaction', error);
  }
}


module.exports = {
  getAllAuditoriums,
  getComputerClassesInBuilding1,
  getAuditoriumsSameCount,
  updateAuditorium,
  deleteAuditorium,
  addAuditorium,
  getSpecificAuditoriums,
  incrementCapacity
};
