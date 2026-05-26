import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../types/user-type';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  createUser(user: User): Observable<any> {
    const url: string = 'http://localhost:8080/api/auth/signup';
    console.log('result call in service', user);
    const result = this.http.post(url, user);
    console.log('result in service is: ', result);
    return result;
  }
}
