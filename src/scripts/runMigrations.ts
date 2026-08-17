import fs from 'fs';
import path from 'path';
import { pool } from '../config/db.js';

async function runMigrations() {
  try {
    const filePath = path.join(process.cwd(), 'migrations', '001_create_students_table.sql');
    const sql = fs.readFileSync(filePath, 'utf8');

    await pool.query(sql);
    console.log('Migration exécutée avec succès !');
  } catch (error) {
    console.error('Erreur de migration :', error);
  } finally {
    await pool.end();
  }
}

runMigrations();