import { Component } from '@angular/core';
import { StudentService } from '../../service/student-service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './student-form.html',
  styleUrl: './student-form.css',
})
export class StudentForm {
  firstName: string = '';
  lastName: string = '';
  apogee: string = '';  

  constructor(private studentService: StudentService, private router: Router) {}

  submit(): void {
    if(!this.firstName || !this.lastName || !this.apogee) return ; 
    this.studentService.addStudent({
      firstName: this.firstName,
      lastName: this.lastName,
      apogee: this.apogee
    });
    this.router.navigate(['/students']);

  }

  cancel(): void {
    this.router.navigate(['/students']);
  }
}
