INSERT INTO FACULTY (FACULTY, FACULTY_NAME) VALUES ('SampleFaculty', 'Sample Faculty Name');

INSERT INTO PULPIT (PULPIT, PULPIT_NAME, FACULTY) VALUES ('SamplePulpit', 'Sample Pulpit Name', 'SampleFaculty');

INSERT INTO SUBJECT (SUBJECT, SUBJECT_NAME, PULPIT) VALUES ('SampleSubject', 'Sample Subject Name', 'SamplePulpit');

INSERT INTO TEACHER (TEACHER, TEACHER_NAME, PULPIT) VALUES ('SampleTeacher', 'Sample Teacher Name', 'SamplePulpit');

INSERT INTO AUDITORIUM_TYPE (AUDITORIUM_TYPE, AUDITORIUM_TYPENAME) VALUES ('SampleAuditoriumType', 'Sample Auditorium Type Name');

INSERT INTO AUDITORIUM (AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_CAPACITY, AUDITORIUM_TYPE) VALUES ('SampleAuditorium', 'Sample Auditorium Name', 100, 'SampleAuditoriumType');


delete from AUDITORIUM where ID = 7;