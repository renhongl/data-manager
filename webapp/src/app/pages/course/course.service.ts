import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get('/api/course');
  }

  pullData() {
    return this.http.get('/api/course/pull');
  }
}
