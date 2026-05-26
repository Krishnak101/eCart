import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../types/user-type';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  createUser(user: User): Observable<User> {
    const url: string = 'http://localhost:8080/signup';
    return this.http.post<User>(url, user);
  }
}
