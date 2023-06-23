import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agency } from './models/agency';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }
  uri = 'http://localhost:4000'

  registerUser(user: User) {
    const data = {
      name: user.name,
      surname: user.surname,
      username: user.username,
      password: user.password,
      tel: user.tel,
      email: user.email,
      image: user.image
    }
    return this.http.post(`${this.uri}/user/register`, data)
  }

  registerAgency(agency: Agency) {
    // TODO: First add models in backend
    return this.http.post(`${this.uri}/users/register`, agency)
  }
  
  checkIsUsernameUnique(usernameFromForm) {
    const data = {
      username: usernameFromForm
    }

    return this.http.post(`${this.uri}/user/checkIsUsernameUnique`, data)
  }

  checkIsEmailUnique(emailFromForm) {
    const data = {
      email: emailFromForm
    }

    return this.http.post(`${this.uri}/user/checkIsEmailUnique`, data)
  }
}
