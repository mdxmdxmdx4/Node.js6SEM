const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getAllSubjects() {
  return await prisma.SUBJECT.findMany();
}

async function updateSubject(subjectData) {
  const { ID, ...data } = subjectData;

  return await prisma.SUBJECT.update({
    where: { ID },
    data
  });
}

async function deleteSubject(id) {
  const subject = await prisma.SUBJECT.findUnique({
    where: { ID: id },
  });

  if (subject) {
    await prisma.SUBJECT.delete({
      where: { ID: id },
    });
  }

  return subject;
}

async function addSubject(data) {
  if (!data.SUBJECT || !data.SUBJECT_NAME || !data.PULPIT_ID) {
    throw new Error('All fields are required');
  }

  return await prisma.SUBJECT.create({
    data: {
      SUBJECT: data.SUBJECT,
      SUBJECT_NAME: data.SUBJECT_NAME,
      PULPIT_ID: data.PULPIT_ID
    }
  });
}


module.exports = {
  getAllSubjects,
  updateSubject,
  deleteSubject,
  addSubject
};
