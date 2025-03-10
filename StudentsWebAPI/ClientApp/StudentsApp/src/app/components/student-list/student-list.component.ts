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

 
  loadStudents(): void {
    this.studentService.getStudents().subscribe(response => {
      this.students = response;
      this.filteredStudents = [...this.students]; 
      this.totalStudents = response.length;
    }, error => {
      console.error(" שגיאה בטעינת תלמידים:", error);
    });
  }

  
  applyFilter(): void {
    this.filteredStudents = this.students.filter(student =>
      student.firstName.toLowerCase().includes(this.searchValue.toLowerCase())
    );
    this.currentPage = 1; 
  }

 
  getPaginatedStudents(): Student[] {
    if (!this.filteredStudents.length) return [];

    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    let paginatedStudents = this.filteredStudents.slice(start, end);

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

  
  goToFirstPage(): void {
    this.currentPage = 1;
  }

 
  goToLastPage(): void {
    this.currentPage = this.getTotalPages();
  }

  
  getTotalPages(): number {
    return Math.ceil(this.totalStudents / this.itemsPerPage);
  }

  
  sort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }
}
