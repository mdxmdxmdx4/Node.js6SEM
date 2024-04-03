const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getAllFaculties() {
  return await prisma.FACULTY.findMany();
}

async function getFacultyWithSubjects(facultyCode) {
  const faculty = await prisma.FACULTY.findUnique({
    where: { FACULTY: facultyCode },
    include: { PULPIT: { include: { SUBJECT: true } } }
  });

   if (!faculty) {
    throw new Error(`Факультет с кодом ${facultyCode} не найден`);
  }

  return {
    faculty: faculty.FACULTY,
    faculty_name: faculty.FACULTY_NAME,
    Pulpits: faculty.PULPIT.map(pulpit => ({
      pulpit: pulpit.PULPIT,
      Subjects: pulpit.SUBJECT.map(subject => ({ subject_name: subject.SUBJECT_NAME }))
    }))
  };
}

async function addFacultyWithPulpits(data) {
  if (!data.FACULTY || !data.FACULTY_NAME || !data.PULPITS) {
    throw new Error('All fields are required');
  }

  // Создаем новый факультет
  const faculty = await prisma.FACULTY.create({
    data: {
      FACULTY: data.FACULTY,
      FACULTY_NAME: data.FACULTY_NAME,
      // Создаем связанные кафедры
      PULPIT: {
        create: data.PULPITS.map(pulpit => ({
          PULPIT: pulpit.PULPIT,
          PULPIT_NAME: pulpit.PULPIT_NAME
        }))
      }
    }
  });

  return faculty;
}

async function updateFaculty(facultyData) {
  const { ID, ...data } = facultyData;

  return await prisma.FACULTY.update({
    where: { ID },
    data
  });
}

async function deleteFaculty(id) {
  const faculty = await prisma.FACULTY.findUnique({
    where: { ID: id },
  });

  if (faculty) {
    await prisma.FACULTY.delete({
      where: { ID: id },
    });
  }

  return faculty;
}



module.exports = {
  getAllFaculties,
  getFacultyWithSubjects,
  addFacultyWithPulpits,
  updateFaculty,
  deleteFaculty
};
