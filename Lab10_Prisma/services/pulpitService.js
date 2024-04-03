const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getAllPulpits() {
  return await prisma.PULPIT.findMany();
}

async function getPulpitsWithoutTeachers() {
  return await prisma.PULPIT.findMany({
    where: {
      TEACHER: {
        none: {}
      }
    }
  });
}

async function updatePulpit(pulpitData) {
  const { ID, ...data } = pulpitData;

  return await prisma.PULPIT.update({
    where: { ID },
    data
  });
}

async function deletePulpit(id) {
  const pulpit = await prisma.PULPIT.findUnique({
    where: { ID: id },
  });

  if (pulpit) {
    await prisma.PULPIT.delete({
      where: { ID: id },
    });
  }

  return pulpit;
}

async function addPulpitWithFaculty(data) {
  if (!data.PULPIT || !data.PULPIT_NAME || !data.FACULTY || !data.FACULTY_NAME) {
    throw new Error('All fields are required');
  }
  let faculty = await prisma.FACULTY.findUnique({
    where: { FACULTY: data.FACULTY },
  });
  if (!faculty) {
    faculty = await prisma.FACULTY.create({
      data: {
        FACULTY: data.FACULTY,
        FACULTY_NAME: data.FACULTY_NAME
      }
    });
  }

  const pulpit = await prisma.PULPIT.create({
    data: {
      PULPIT: data.PULPIT,
      PULPIT_NAME: data.PULPIT_NAME,
      FACULTY_ID: faculty.ID
    }
  });

  return pulpit;
}


async function getPulpitsWithTeachersCount(page = 1, limit = 10) {
  page = Number(page);
  limit = Number(limit);
  let skip = (page - 1) * limit;
  const pulpits = await prisma.PULPIT.findMany({
    skip: skip,
    take: limit,
    select: {
      PULPIT: true,
      PULPIT_NAME: true,
      FACULTY_ID: true,
      TEACHER: {
        select: {
          ID: true
        }
      },
      _count: {
        select: { TEACHER: true }
      }
    }
  });

  return pulpits;
}




async function getPulpitsCount() {
  return await prisma.PULPIT.count();
}




module.exports = {
  getAllPulpits,
  getPulpitsWithoutTeachers,
  updatePulpit,
  deletePulpit,
  addPulpitWithFaculty,
  getPulpitsWithTeachersCount,
  getPulpitsCount
};
