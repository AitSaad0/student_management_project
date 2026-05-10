import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Student } from '../../models/student';
import { Note, MODULES } from '../../models/note';
import { StudentService } from '../../service/student-service';

@Component({
  selector: 'app-student-detail',
  imports: [FormsModule],
  templateUrl: './student-detail.html',
  styleUrl: './student-detail.css',
})
export class StudentDetail implements OnInit {
  student : Student | undefined;
  notes: Note[] = [];
  modules = MODULES ; 


  noteInputs: Record<string, number> = {};


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.student = this.studentService.getStudentById(id);

    if (!this.student) {
      this.router.navigate(['/students']);
      return;
    }
    this.loadNotes(); 
  }

  loadNotes(): void {
    this.notes = this.studentService.getNotesByStudent(this.student!.id);
    for( const mod of this.modules){
      const existing = this.notes.find(n => n.moduleName === mod);
      this.noteInputs[mod] = existing ? existing.value : 0;
    }
  }

  saveNote(moduleName : string): void {
    const value = this.noteInputs[moduleName];
    if (value < 0 || value > 20) return;
    this.studentService.setNote(this.student!.id, moduleName, value);
    this.loadNotes();

  }
  getNote(moduleName: string): number | null {
    const note = this.notes.find(n => n.moduleName === moduleName);
    return note ? note.value : null;
  }


  getAverage(): string {
    if (this.notes.length === 0) return 'N/A';
    const sum = this.notes.reduce((acc, n) => acc + n.value, 0);
    return (sum / this.notes.length).toFixed(2);
  }

  goBack(): void {
    this.router.navigate(['/students']);
  }

  
}
