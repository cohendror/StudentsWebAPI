import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  filteredStudents: Student[] = [];
  searchValue: string = '';

  // נתונים עבור עימוד (Pagination)
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe(data => {
      this.students = data;
      this.filteredStudents = data;
      console.log("📥 Students Loaded:", this.students);
      console.log("📄 Total Students After Load:", this.filteredStudents.length);
      console.log("📌 Current Page:", this.currentPage);
    }, error => {
      console.error("Error fetching students:", error);
    });
  }

  // 🔍 פונקציה לסינון לפי שם פרטי
  applyFilter(): void {
    
    this.filteredStudents = this.students.filter(student =>
      student.firstName.toLowerCase().includes(this.searchValue.toLowerCase())
    );
    this.currentPage = 1; // התחלה מחדש בעמוד הראשון לאחר חיפוש
  }

  // 📄 פונקציות למעבר בין דפים
  getPaginatedStudents(): Student[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    console.log(`Pagination - Page: ${this.currentPage}, Start Index: ${start}, End Index: ${end}`);
    console.log("Students in this page: ", this.filteredStudents.slice(start, end)); // ✅ הדפסת הנתונים בפועל

    return this.filteredStudents.slice(start, end);

  }

  nextPage(): void {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
      console.log(`📄 Next Page Clicked - New Page: ${this.currentPage}`);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.filteredStudents.length / this.itemsPerPage);
  }
}
