import { Component } from '@angular/core';
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent {
  student: Student = {
    firstName: '',
    lastName: '',
    idNumber: '',
    birthDate: '',
    address: '',
    phoneNumber: '',
    email: '',
    enrollmentDate: ''
  };

  constructor(private studentService: StudentService, private router: Router) { }

  addStudent(): void {
    this.studentService.addStudent(this.student).subscribe(() => {
      alert('תלמיד נוסף בהצלחה!');
      this.router.navigate(['/students']);
    });
  }
}
