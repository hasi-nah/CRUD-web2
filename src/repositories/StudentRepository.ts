import { pool } from '../config/db.js';
import { Student } from '../models/student.js';

export class StudentRepository {
  async getAll(): Promise<Student[]> {
    const result = await pool.query(
      'SELECT id, last_name AS "lastName", first_name AS "firstName", age, email FROM students ORDER BY id ASC'
    );
    return result.rows;
  }

  async getById(id: number): Promise<Student | null> {
    const result = await pool.query(
      'SELECT id, last_name AS "lastName", first_name AS "firstName", age, email FROM students WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  }

  async create(student: Student): Promise<Student> {
    const { lastName, firstName, age, email } = student;
    const result = await pool.query(
      'INSERT INTO students (last_name, first_name, age, email) VALUES ($1, $2, $3, $4) RETURNING id, last_name AS "lastName", first_name AS "firstName", age, email',
      [lastName, firstName, age, email || null]
    );
    return result.rows[0];
  }

  async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM students WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
  }
}