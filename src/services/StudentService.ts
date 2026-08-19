import { StudentRepository } from '../repositories/StudentRepository.js';
import { Student } from '../models/student.js';
import { Stats } from '../models/stats.js';

export class StudentService {
  private repository = new StudentRepository();


  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

 
  validateStudentData(data: Partial<Student>): string | null {
    if (!data.lastName || data.lastName.trim() === '') return 'Last name is required';
    if (!data.firstName || data.firstName.trim() === '') return 'First name is required';
    if (data.age === undefined || data.age <= 0) return 'Age must be a positive number';
    if (data.email && !this.validateEmail(data.email)) return 'Invalid email format';
    return null;
  }

  
  async getStats(): Promise<Stats> {
    const students = await this.repository.getAll();
    const total = students.length;
    const avgAge = total > 0 ? students.reduce((sum, s) => sum + s.age, 0) / total : 0;

    return {
      totalStudents: total,
      averageAge: Number(avgAge.toFixed(2)),
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