import fs from 'fs';
import path from 'path';
import { pool } from '../config/db.js';

async function runMigrations() {
  try {
    const filePath = path.join(process.cwd(), 'migrations', '001_create_students_table.sql');
    const sql = fs.readFileSync(filePath, 'utf8');

    await pool.query(sql);
    console.log('Migration executed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await pool.end();
  }
}

runMigrations();