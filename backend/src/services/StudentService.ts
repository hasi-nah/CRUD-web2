import { StudentRepository } from '../repositories/StudentRepository.js'; 
import { Student } from '../models/Student.js'; 
import { Stats } from '../models/Stats.js'; 

export class StudentService {
  private repository = new StudentRepository(); 

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email); 
  }

  private validateStudentData(data: Partial<Student>): string | null {
    if (!data.lastName || !data.lastName.trim()) return 'Last name is required';
    if (!data.firstName || !data.firstName.trim()) return 'First name is required';
    if (data.age === undefined || data.age <= 0) return 'Age must be a positive number';
    if (!data.email || !this.validateEmail(data.email)) return 'Invalid email format';
    return null; 
  }

  async getAllStudents(): Promise<Student[]> {
    return await this.repository.getAll();
  }

  // Récupération d'un étudiant unique par ID
  async getStudentById(id: number): Promise<Student | null> {
    return await this.repository.getById(id);
  }

  async getStats(): Promise<Stats> {
    const students = await this.repository.getAll();
    const totalStudents = students.length;
    const totalAge = students.reduce((sum, s) => sum + s.age, 0);
    const averageAge = totalStudents > 0 ? Number((totalAge / totalStudents).toFixed(2)) : 0;

    return { totalStudents, averageAge };
  }

  async createStudent(data: Omit<Student, 'id'>): Promise<Student> {
    const validationError = this.validateStudentData(data);
    if (validationError) {
      throw new Error(validationError); 
    }
    return await this.repository.create(data);
  }

  async deleteStudent(id: number): Promise<boolean> {
    return await this.repository.delete(id);
  }
}