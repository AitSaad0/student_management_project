import { StudentList } from './components/student-list/student-list';
import { StudentForm } from './components/student-form/student-form';
import { StudentDetail } from './components/student-detail/student-detail';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'students', pathMatch: 'full' },
  { path: 'students', component: StudentList },
  { path: 'students/new', component: StudentForm },
  { path: 'students/:id', component: StudentDetail },
];