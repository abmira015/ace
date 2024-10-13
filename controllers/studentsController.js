const pool = require('../config/database');

const getAllStudent = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM students');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getStudentById = async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await pool.query('SELECT * FROM students WHERE student_id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Student not found!' });
        }

        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createStudent = async (req, res) => {
    const { student_firstname, student_lastname, student_sex, user_id, course_id } = req.body;

    try {
        const [result] = await pool.query('INSERT INTO students (student_firstname, student_lastname, student_sex, user_id, course_id) VALUES (?, ?, ?, ?, ?)', [student_firstname, student_lastname, student_sex, user_id, course_id]);

        res.status(201).json({ id: result.insertId, student_firstname, student_lastname, student_sex, user_id, course_id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateStudent = async (req, res) => {
    const { id } = req.params;
    const { student_firstname, student_lastname, student_sex, user_id, course_id } = req.body;

    try {
        const [result] = await pool.query(
            'UPDATE students SET student_firstname = ?, student_lastname = ?, student_sex = ?, user_id = ?  WHERE student_id = ?',
            [student_firstname, student_lastname, student_sex, user_id, course_id, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'students not found' });
        }

        res.json({ message: 'students updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteStudent = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query('DELETE FROM students WHERE student_id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.json({ message: 'Student deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAllStudent, getStudentById, createStudent, updateStudent, deleteStudent }