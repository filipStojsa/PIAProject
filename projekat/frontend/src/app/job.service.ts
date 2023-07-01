import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  constructor(private http: HttpClient) { }
  uri = 'http://localhost:4000'
  
  createJob(selectedAgency: string, selectedObject: string, startDate: string, endDate: string, loggedUsername: string) {
    const data = {
      selectedAgency: selectedAgency,
      selectedObject: selectedObject,
      startDate: startDate,
      endDate: endDate,
      username: loggedUsername
    }

    return this.http.post(`${this.uri}/object/addJob`, data)
  }
}
