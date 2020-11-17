import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(postData) {
    return this.http.post('/api/core/login', postData);
  }

  isLogin() {
    return this.http.get('/api/core/isLogin');
  }
}
