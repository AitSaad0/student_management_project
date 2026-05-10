import { Injectable } from '@angular/core';
import { Student } from '../models/student';
import { Note, MODULES } from '../models/note';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private students: Student[] = [
    { id: 1, firstName: 'Youssef', lastName: 'Alami', apogee: "12345" },
    { id: 2, firstName: 'Sara', lastName: 'Benali', apogee: "67890" },
  ];

  private notes: Note[] = [];
  private nextId = 3;
  

  getStudents(): Student[]{
    return this.students; 
  }

  getStudentById(id: number): Student | undefined{
    return this.students.find(student => student.id === id); 
  }

  addStudent(student : Omit<Student, 'id'>): void {
    this.students.push({...student, id: this.nextId++});  
  }

  deleteStudent(id: number): void{
    this.students = this.students.filter(student => student.id !== id);
  }

  getNotesByStudent(studentId: number): Note[] {
    return this.notes.filter(n => n.studentId === studentId);
  }

  setNote(studentId: number, moduleName: string, value: number): void {
    const existing = this.notes.find(
      n => n.studentId === studentId && n.moduleName === moduleName
    );
    if (existing) {
      existing.value = value;
    } else {
      this.notes.push({ id: Date.now(), studentId, moduleName, value });
    }
  }
}
