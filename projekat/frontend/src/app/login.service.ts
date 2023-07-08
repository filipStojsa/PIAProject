import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room } from './models/rooms';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  login(usernameFromForm, passwordFromForm){
    const data = {
      username: usernameFromForm,
      password: passwordFromForm
    }

    return this.http.post(`${this.uri}/user/login`, data)
  }

  addObject(type: string, address: string, num: number, area: number, user: string, rooms: Array<Room>) {
    const data = {
      type: type,
      address: address,
      num: num,
      area: area,
      user: user,
      status: 'pending',
      rooms: rooms
    }

    return this.http.post(`${this.uri}/object/addObject`, data)
  }

}
