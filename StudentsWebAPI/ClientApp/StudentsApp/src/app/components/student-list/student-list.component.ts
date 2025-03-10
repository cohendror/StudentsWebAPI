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
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalStudents: number = 0;
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.loadStudents();
  }

  /**
   * ✅ טוען את כל הרשומות ומאפשר עימוד מקומי
   */
  loadStudents(): void {
    this.studentService.getStudents().subscribe(response => {
      this.students = response;
      this.filteredStudents = [...this.students]; // העתקת הנתונים
      this.totalStudents = response.length; // ספירת כל התלמידים
    }, error => {
      console.error("❌ שגיאה בטעינת תלמידים:", error);
    });
  }

  /**
   * 🔍 סינון לפי שם פרטי
   */
  applyFilter(): void {
    this.filteredStudents = this.students.filter(student =>
      student.firstName.toLowerCase().includes(this.searchValue.toLowerCase())
    );
    this.currentPage = 1; // חזרה לדף הראשון לאחר חיפוש
  }

  /**
   * 📄 מחזירה את הרשומות לעמוד הנוכחי בלבד עם מיון
   */
  getPaginatedStudents(): Student[] {
    if (!this.filteredStudents.length) return [];

    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    let paginatedStudents = this.filteredStudents.slice(start, end);

    // ✅ ממיין **רק את הרשומות בדף הנוכחי**
    if (this.sortColumn) {
      paginatedStudents.sort((a, b) => {
        const valueA = a[this.sortColumn as keyof Student] ?? '';
        const valueB = b[this.sortColumn as keyof Student] ?? '';

        return this.sortDirection === 'asc'
          ? String(valueA).localeCompare(String(valueB), undefined, { numeric: true })
          : String(valueB).localeCompare(String(valueA), undefined, { numeric: true });
      });
    }

    return paginatedStudents;
  }

  /**
   * 📌 בקרת עימוד - דפים קדימה ואחורה
   */
  nextPage(): void {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  /**
   * ⏮ מעבר לדף הראשון
   */
  goToFirstPage(): void {
    this.currentPage = 1;
  }

  /**
   * ⏭ מעבר לדף האחרון
   */
  goToLastPage(): void {
    this.currentPage = this.getTotalPages();
  }

  /**
   * 🔄 מחשב את כמות הדפים
   */
  getTotalPages(): number {
    return Math.ceil(this.totalStudents / this.itemsPerPage);
  }

  /**
   * 🔃 מיון רק של העמוד הנוכחי
   */
  sort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }
}
