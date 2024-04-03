const express = require('express');
const app = express();
const port = 3000;
const facultyRoutes = require('./routes/facultyRoutes');
const pulpitRoutes = require('./routes/pulpitRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const auditoriumRoutes = require('./routes/auditoriumRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const auditoriumTypesRoutes = require('./routes/auditoriumTypesRoutes');


app.use(express.static('public'));


app.use(express.json());
app.use('/api', facultyRoutes);
app.use('/api', pulpitRoutes);
app.use('/api', subjectRoutes);
app.use('/api', auditoriumRoutes);
app.use('/api', teacherRoutes);
app.use('/api', auditoriumTypesRoutes);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
