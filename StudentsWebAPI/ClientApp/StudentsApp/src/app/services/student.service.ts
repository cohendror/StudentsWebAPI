import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../models/student.model';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'https://localhost:7232/api/students';

  constructor(private http: HttpClient) { }

  
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/GetStudents`).pipe(
      catchError(error => {
        console.error(" API Error:", error);
        return of([]); // Return empty array on failure
      })
    );
  }

  
  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.apiUrl}/AddStudent`, student).pipe(
      catchError(error => {
        console.error(" Error adding student:", error);
        return of(student); // Prevents crashes
      })
    );
  }
}
