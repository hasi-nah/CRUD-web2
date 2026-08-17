import { StudentRepository } from '../repositories/StudentRepository.js';
import { Student } from '../models/student.js';

export class StudentService {
  private repository = new StudentRepository();

  async getAllStudents(): Promise<Student[]> {
    return await this.repository.getAll();
  }

  async getStudentById(id: number): Promise<Student | null> {
    return await this.repository.getById(id);
  }

  async createStudent(student: Student): Promise<Student> {
    return await this.repository.create(student);
  }

  async deleteStudent(id: number): Promise<boolean> {
    return await this.repository.delete(id);
  }
}