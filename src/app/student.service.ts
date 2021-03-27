import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable()
export class StudentService {

  private _studentUrl = "http://localhost:3000/api/students/"

  constructor(private http: HttpClient) {}

  fetchStudents(): Observable<Object> {
    return this.http.get<any>(this._studentUrl)
  }

  saveStudent(student:any) {
    return this.http.post<any>(this._studentUrl,student)
  }

  deleteStudent(id:any) {
    return this.http.delete<any>(this._studentUrl+id)
  }

}
