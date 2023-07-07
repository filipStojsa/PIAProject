import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  constructor(private http: HttpClient) { }
  uri = 'http://localhost:4000'

  getAllUsers() {
    return this.http.get(`${this.uri}/user/get`)
  }

  acceptUser(username: string) {
    const data = {
      field: 'status',
      value: 'ok',
      username: username
    }
    return this.http.post(`${this.uri}/user/modifyUserField`, data)
  }

  denyUser(username: string) {
    const data = {
      field: 'status',
      value: 'denied',
      username: username
    }
    return this.http.post(`${this.uri}/user/modifyUserField`, data)
  }

  changeUserField(field: string, value: string, username: string) {
    const data = {
      field: field,
      value: value,
      username: username
    }
    return this.http.post(`${this.uri}/user/modifyUserField`, data)
  }

  deleteUser(username: string) {
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/user/deleteUser`, data)
  }

  // --- Agencies ---

  getAllAgencies() {
    return this.http.get(`${this.uri}/agency/getAllAgencies`)
  }

  acceptAgency(username: string) {
    const data = {
      field: 'status',
      value: 'ok',
      username: username
    }
    return this.http.post(`${this.uri}/agency/modifyAgencyField`, data)
  }

  denyAgency(username: string) {
    const data = {
      field: 'status',
      value: 'denied',
      username: username
    }
    return this.http.post(`${this.uri}/agency/modifyAgencyField`, data)
  }

  changeAgencyField(field: string, value: string, username: string) {
    const data = {
      field: field,
      value: value,
      username: username
    }
    return this.http.post(`${this.uri}/agency/modifyAgencyField`, data)
  }

  deleteAgency(username: string) {
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/agency/deleteAgency`, data)
  }

  // --- Jobs ---

  getAllJobs() {
    return this.http.get(`${this.uri}/object/getAllJobs`)
  }

}
