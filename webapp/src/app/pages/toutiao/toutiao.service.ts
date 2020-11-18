import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ToutiaoService {

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get('/api/toutiao');
  }

  pullData() {
    return this.http.get('/api/toutiao/pull');
  }
}
