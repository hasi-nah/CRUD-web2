import { Request, Response } from 'express';
import { StudentService } from '../services/StudentService.js';

const studentService = new StudentService();

export class StudentController {
  static async getAll(req: Request, res: Response) {
    try {
      const students = await studentService.getAllStudents();
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur' });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const student = await studentService.getStudentById(id);
      if (!student) return res.status(404).json({ message: 'Étudiant non trouvé' });
      res.status(200).json(student);
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur' });
    }
  }

  static async getStats(req: Request, res: Response) {
    try {
      const stats = await studentService.getStats();
      res.status(200).json(stats);
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur' });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const newStudent = await studentService.createStudent(req.body);
      res.status(201).json(newStudent);
    } catch (error: any) {
      res.status(400).json({ message: error.message || 'Données invalides' });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const deleted = await studentService.deleteStudent(id);
      if (!deleted) return res.status(404).json({ message: 'Étudiant non trouvé' });
      res.status(200).json({ message: 'Étudiant supprimé avec succès' });
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur' });
    }
  }
}