CREATE TABLE FACULTY
(
ID INTEGER PRIMARY KEY AUTOINCREMENT,
FACULTY TEXT(10) NOT NULL,
FACULTY_NAME TEXT(50)
);

CREATE TABLE PULPIT
(
ID INTEGER PRIMARY KEY AUTOINCREMENT,
PULPIT TEXT(10) NOT NULL,
PULPIT_NAME TEXT(100),
FACULTY TEXT(10) NOT NULL,
FOREIGN KEY(FACULTY) REFERENCES FACULTY(FACULTY)
);

CREATE TABLE TEACHER
(
ID INTEGER PRIMARY KEY AUTOINCREMENT,
TEACHER TEXT(10) NOT NULL,
TEACHER_NAME TEXT(50),
PULPIT TEXT(10) NOT NULL,
FOREIGN KEY(PULPIT) REFERENCES PULPIT(PULPIT)
);

CREATE TABLE SUBJECT
(
ID INTEGER PRIMARY KEY AUTOINCREMENT,
SUBJECT TEXT(10) NOT NULL,
SUBJECT_NAME TEXT(50) NOT NULL,
PULPIT TEXT(10) NOT NULL,
FOREIGN KEY(PULPIT) REFERENCES PULPIT(PULPIT)
);

CREATE TABLE AUDITORIUM_TYPE
(
ID INTEGER PRIMARY KEY AUTOINCREMENT,
AUDITORIUM_TYPE TEXT(10) NOT NULL,
AUDITORIUM_TYPENAME TEXT(30) NOT NULL
);

CREATE TABLE AUDITORIUM
(
ID INTEGER PRIMARY KEY AUTOINCREMENT,
AUDITORIUM TEXT(10) NOT NULL,
AUDITORIUM_NAME TEXT(200),
AUDITORIUM_CAPACITY INTEGER,
AUDITORIUM_TYPE TEXT(10) NOT NULL,
FOREIGN KEY(AUDITORIUM_TYPE) REFERENCES AUDITORIUM_TYPE(AUDITORIUM_TYPE)
);

-- Вставка данных в таблицу FACULTY
INSERT INTO FACULTY (FACULTY, FACULTY_NAME) VALUES ('ФИТ', 'Факультет информационных технологий');
INSERT INTO FACULTY (FACULTY, FACULTY_NAME) VALUES ('ФЭ', 'Факультет экономики');

-- Вставка данных в таблицу PULPIT
INSERT INTO PULPIT (PULPIT, PULPIT_NAME, FACULTY) VALUES ('КИТ', 'Кафедра информационных технологий', 'ФИТ');
INSERT INTO PULPIT (PULPIT, PULPIT_NAME, FACULTY) VALUES ('ЭКО', 'Кафедра экономики', 'ФЭ');

commit;

INSERT into SUBJECT (SUBJECT, SUBJECT_NAME, PULPIT) VALUES ('ПвИ', 'Программирование в Интернет', 'КИТ');
INSERT into SUBJECT (SUBJECT, SUBJECT_NAME, PULPIT) VALUES ('ЭТ', 'Экономическая теория', 'ФЭ');

commit;

-- Вставка данных в таблицу TEACHERS
INSERT INTO TEACHERS (TEACHER, TEACHER_NAME, PULPIT) VALUES ('Иванов', 'Иван Иванович', 'КИТ');
INSERT INTO TEACHERS (TEACHER, TEACHER_NAME, PULPIT) VALUES ('Петров', 'Петр Петрович', 'ЭКО');

-- Вставка данных в таблицу AUDITORIUM_TYPES
INSERT INTO AUDITORIUM_TYPES (AUDITORIUM_TYPE, AUDITORIUM_TYPENAME) VALUES ('Л', 'Лекционная');
INSERT INTO AUDITORIUM_TYPES (AUDITORIUM_TYPE, AUDITORIUM_TYPENAME) VALUES ('П', 'Практическая');

-- Вставка данных в таблицу AUDITORIUM
INSERT INTO AUDITORIUM (AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_CAPACITY, AUDITORIUM_TYPE) VALUES ('101', 'Аудитория 101', 100, 'Л');
INSERT INTO AUDITORIUM (AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_CAPACITY, AUDITORIUM_TYPE) VALUES ('102', 'Аудитория 102', 50, 'П');

commit;

commit;

select * from faculty;
