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

  getMyJobs(username: string) {
    return this.http.get(`${this.uri}/object/getMyJobs/${username}`)
  }

  getAgencyJobs(agencyUsername: string) {
    return this.http.get(`${this.uri}/object/getAgencyJobs/${agencyUsername}`)
  }

  getObject(id) {
    return this.http.get(`${this.uri}/object/getObject/${id}`)
  }

  getJob(id) {
    return this.http.get(`${this.uri}/object/getJob/${id}`)
  }

  payJob(id) {
    const data = {
      _id: id
    }
    return this.http.post(`${this.uri}/object/payJob`, data)
  }

  addComment(rating: number, comment: string, username: string, user: string, agencyId: string) {
    const data = {
      rating: rating,
      comment: comment,
      username: username,
      user: user,
      agencyId: agencyId
    }
    return this.http.post(`${this.uri}/agency/addComment`, data)
  }

  makeAnOffer(offer: number, _id: string) {
    const data = {
      offer: offer,
      _id: _id
    }
    return this.http.post(`${this.uri}/object/makeAnOffer`, data)
  }

  changeJobStatus(status: string, _id: string) {
    const data = {
      _id: _id,
      status: status
    }
    return this.http.post(`${this.uri}/object/changeJobStatus`, data)
  }

  changeObjectsColor(objectID: string, index: number, color: string) {
    const data = {
      objectID: objectID, 
      index: index,
      color: color
    }

    return this.http.post(`${this.uri}/object/changeObjectsColor`, data)
  }

  addJobWorkers(_id: string, workers: number) {
    const data = {
      _id: _id,
      workers: workers
    }
    return this.http.post(`${this.uri}/object/addJobWorkers`, data)
    
  }

  changeAgencyField(field: string, value: string, username: string) {
    const data = {
      field: field,
      value: value,
      username: username
    }
    return this.http.post(`${this.uri}/agency/modifyAgencyField`, data)
  }

  getAgency(username) {
    return this.http.get(`${this.uri}/agency/getAgency/${username}`)
  }
}
