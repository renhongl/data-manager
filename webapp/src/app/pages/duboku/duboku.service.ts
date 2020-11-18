import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DubokuService {

  constructor(private http: HttpClient) { }

  getData() {
      return this.http.get('/api/duboku');
  }

  pullData() {
    return this.http.get('/api/duboku/pull');
  }
}
