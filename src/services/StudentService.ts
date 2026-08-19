import { StudentRepository } from '../repositories/StudentRepository.js';
import { Student } from '../models/student.js';
import { Stats } from '../models/stats.js';

export class StudentService {
  private repository = new StudentRepository();

  // Validation email
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validation donnees
  validateStudentData(data: Partial<Student>): string | null {
    if (!data.nom || data.nom.trim() === '') return 'Le nom est obligatoire';
    if (!data.prenom || data.prenom.trim() === '') return 'Le prénom est obligatoire';
    if (data.age === undefined || data.age <= 0) return "L'âge doit être supérieur à 0";
    if (data.email && !this.validateEmail(data.email)) return "Format d'email invalide";
    return null;
  }

  // Calcul des statistiques
  async getStats(): Promise<Stats> {
    const students = await this.repository.getAll();
    const total = students.length;
    const avgAge = total > 0 ? students.reduce((sum, s) => sum + s.age, 0) / total : 0;

    return {
      totalEtudiants: total,
      ageMoyen: Number(avgAge.toFixed(2))
    };
  }

  async getAllStudents(): Promise<Student[]> {
    return await this.repository.getAll();
  }

  async getStudentById(id: number): Promise<Student | null> {
    return await this.repository.getById(id);
  }

  async createStudent(student: Student): Promise<Student> {
    const error = this.validateStudentData(student);
    if (error) throw new Error(error);
    return await this.repository.create(student);
  }

  async deleteStudent(id: number): Promise<boolean> {
    return await this.repository.delete(id);
  }
}