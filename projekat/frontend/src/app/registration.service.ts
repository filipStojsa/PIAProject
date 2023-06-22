import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }
  uri = 'http://localhost:4000'

  registerUser(user: User) {
    JSON.stringify(user)
    return this.http.post(`${this.uri}/users/login`, user)
  }
}
