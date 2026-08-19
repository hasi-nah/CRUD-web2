import { pool } from '../config/db.js';
import { Student } from '../models/student.js';

export class StudentRepository {
  async getAll(): Promise<Student[]> {
    const result = await pool.query('SELECT * FROM students ORDER BY id ASC');
    return result.rows;
  }

  async getById(id: number): Promise<Student | null> {
    const result = await pool.query('SELECT * FROM students WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  async create(student: Student): Promise<Student> {
    const { nom, prenom, age, email } = student;
    const result = await pool.query(
      'INSERT INTO students (nom, prenom, age, email) VALUES ($1, $2, $3, $4) RETURNING *',
      [nom, prenom, age, email || null]
    );
    return result.rows[0];
  }

  async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM students WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
  }
}