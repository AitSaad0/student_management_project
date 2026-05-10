import { Component, OnInit } from '@angular/core';
import { Student } from '../../models/student';
import { StudentService } from '../../service/student-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css',
})
export class StudentList implements OnInit {
  students: Student[] = [];
  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit(): void {
    this.students = this.studentService.getStudents();
  }

  goToDetail(id: number): void {
    this.router.navigate(['/students', id]);
  }

  deleteStudent(id: number): void {
    this.studentService.deleteStudent(id);
    this.students = this.studentService.getStudents();
  }

}
