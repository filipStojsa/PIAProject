import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Room } from './models/rooms';


@Injectable({
  providedIn: 'root'
})
export class ObjectService {

  constructor(private http: HttpClient) { }
  uri = 'http://localhost:4000'

  createObject(type: string, address: string, num: number, area:number, user: string, rooms: Array<Room>) {
    const data = {
      type: type,
      address: address,
      num: num,
      area: area,
      user: user,
      status: 'pending',
      rooms: rooms
    }

    console.log(data)
    return this.http.post(`${this.uri}/object/addObject`, data)
  }

  getMyObjects(username: string) {
    return this.http.get(`${this.uri}/object/getMyObjects/${username}`)
  }

  deleteObject(id: string) {
    const data = {
      _id: id
    }

    return this.http.post(`${this.uri}/object/deleteObject`, data)
  }
}
