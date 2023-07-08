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
    const data = {
      agencyName: agency.agencyName,
      state: agency.state,
      city: agency.city,
      adress: agency.adress,
      pib: agency.pib,
      description: agency.description,
      username: agency.username,
      password: agency.password,
      tel: agency.tel,
      email: agency.email,
      image: agency.image
    }
    return this.http.post(`${this.uri}/agency/register`, data)
  }
  
  checkIsUsernameUnique(usernameFromForm, type) {
    const data = {
      username: usernameFromForm
    }

    if(type == 'user') {
      return this.http.post(`${this.uri}/user/checkIsUsernameUnique`, data)
    }
    else {
      return this.http.post(`${this.uri}/agency/checkIsUsernameUnique`, data)
    }
  }

  checkIsEmailUnique(emailFromForm, type) {
    const data = {
      email: emailFromForm
    }
    if(type == 'user') {
      return this.http.post(`${this.uri}/user/checkIsEmailUnique`, data)
    }
    else {
      return this.http.post(`${this.uri}/agency/checkIsEmailUnique`, data)
    }
  }

  changeUserField(field: string, value: string, username: string) {
    const data = {
      field: field,
      value: value,
      username: username
    }
    return this.http.post(`${this.uri}/user/modifyUserField`, data)
  }

  changeAgencyField(field: string, value: string, username: string) {
    const data = {
      field: field,
      value: value,
      username: username
    }
    return this.http.post(`${this.uri}/agency/modifyAgencyField`, data)
  }
}
