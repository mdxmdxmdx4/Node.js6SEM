const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getAllTeachers() {
  return await prisma.TEACHER.findMany();
}

async function getPulpitsWithVladimir() {
  return await prisma.PULPIT.findMany({
    where: {
      TEACHER: {
        some: {
          TEACHER_NAME: {
            startsWith: "Владимир"
          }
        }
      }
    },
    select: {
      PULPIT: true,
      PULPIT_NAME: true,
      FACULTY_ID: true,
    }
  });
}


async function updateTeacher(teacherData) {
  const { ID, ...data } = teacherData;

  return await prisma.TEACHER.update({
    where: { ID },
    data
  });
}

async function deleteTeacher(id) {
  const teacher = await prisma.TEACHER.findUnique({
    where: { ID: id },
  });

  if (teacher) {
    await prisma.TEACHER.delete({
      where: { ID: id },
    });
  }

  return teacher;
}

async function addTeacher(data) {
  if (!data.TEACHER || !data.TEACHER_NAME || !data.PULPIT_ID) {
    throw new Error('All fields are required');
  }

  return await prisma.TEACHER.create({
    data: {
      TEACHER: data.TEACHER,
      TEACHER_NAME: data.TEACHER_NAME,
      PULPIT_ID: data.PULPIT_ID
    }
  });
}

module.exports = {
  getAllTeachers,
  getPulpitsWithVladimir,
  updateTeacher,
  deleteTeacher,
  addTeacher
};
