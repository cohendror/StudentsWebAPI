import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from 'src/app/services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent {
  studentForm: FormGroup;
  isSubmitting = false; // למניעת שליחה כפולה

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router
  ) {
    this.studentForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      idNumber: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      birthDate: ['', Validators.required],
      address: [''],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.email]],
      enrollmentDate: ['', Validators.required]
    });
  }

  addStudent(): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched(); // סימון שדות לא תקינים
      return;
    }

    this.isSubmitting = true;
    this.studentService.addStudent(this.studentForm.value).subscribe(() => {
      alert('✅ התלמיד נוסף בהצלחה!');
      this.router.navigate(['/students']); // מעבר לרשימת התלמידים
    }, error => {
      console.error("❌ שגיאה בהוספת תלמיד:", error);
      alert('❌ אירעה שגיאה, נסה שוב.');
      this.isSubmitting = false;
    });
  }
}
