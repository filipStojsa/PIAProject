import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private http: HttpClient) { }
  uri = 'http://localhost:4000'

  getAllAgencies() {
    return this.http.get(`${this.uri}/agency/getAllAgencies`)
  }

  editComment(agencyUsername: string, comment: string, rating: string, index: number) {
    const data = {
      agencyUsername: agencyUsername,
      comment: comment,
      rating: rating,
      index: index
    }

    return this.http.post(`${this.uri}/agency/editComment`, data)
  }

  deleteComment(agencyUsername: string, index: number) {
    const data = {
      agencyUsername: agencyUsername,
      index: index
    }
    return this.http.post(`${this.uri}/agency/deleteComment`, data)
  }
}
