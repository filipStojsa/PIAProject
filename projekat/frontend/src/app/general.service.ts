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
}
