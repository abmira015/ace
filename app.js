const express = require('express'); 
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const courseRoutes = require('./routes/courseRoutes');
const studentsRoutes = require('./routes/studentsRoutes');


const app = express(); 
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.get('/', function (req, res) {
    res.send("Hello World");
});

app.use('/api/user', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/department', departmentRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/student', studentsRoutes);


const PORT = 5000;

app.listen(PORT, () => {

    console.log(`Server is running on port ${PORT}`);
});