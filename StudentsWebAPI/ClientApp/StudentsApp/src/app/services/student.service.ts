import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Student } from '../models/student.model';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'https://localhost:7232/api/students';

  constructor(private http: HttpClient) { }

  /**
   * ✅ Fetch students (pagination not supported by API, so we handle it on the frontend)
   */
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/GetStudents`).pipe(
      catchError(error => {
        console.error("❌ API Error:", error);
        return of([]); // Return empty array to prevent crashes
      })
    );
  }

  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student).pipe(
      catchError(error => {
        console.error("❌ Error adding student:", error);
        return of(student); // Prevent crash
      })
    );
  }
}
