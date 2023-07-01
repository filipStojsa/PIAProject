import { Component, OnInit } from '@angular/core';
import { Agency } from '../models/agency';
import { Object } from '../models/object';
import { Router } from '@angular/router';
import { ObjectService } from '../object.service';
import { GeneralService } from '../general.service';
import { JobService } from '../job.service';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.css']
})
export class CreateJobComponent implements OnInit {

  constructor(
    private router: Router, 
    private objectService: ObjectService, 
    private serviceGeneral: GeneralService,
    private jobService: JobService
    ) { }

  agencies: any = [];
  objects: any = [];
  loggedUsername: string

  ngOnInit(): void {
    this.loggedUsername = JSON.parse(localStorage.getItem('loggedUser'))['username']
    this.objectService.getMyObjects(this.loggedUsername).subscribe((objects: Object[]) => {
      this.objects = objects
    })
    this.serviceGeneral.getAllAgencies().subscribe((agencies: Agency[]) => {
      this.agencies = agencies
      console.log(this.agencies)
    })
  }

  selectedAgency: string;
  selectedObject: string;
  startDate: string;
  endDate: string;

  message = []

  checkFields() {
    let isOk = true

    if(this.selectedAgency == undefined) {
      this.message[0] = 'No agency selected!'
      isOk = false
    }

    if(this.selectedObject == undefined) {
      this.message[1] = 'No object selected!'
      isOk = false
    }

    if(this.endDate == undefined || this.startDate == undefined) {
      this.message[2] = 'No dates entered!'
      isOk = false
    }
    else {
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);
  
      if(start > end) {
        this.message[3] = 'Startding date must be before ending date!'
        isOk = false
      }
    }
    return isOk
  }

  submit() {
    this.message = []
    if(this.checkFields()) {
      this.jobService.createJob(
        this.selectedAgency, 
        this.selectedObject,
        this.startDate,
        this.endDate,
        this.loggedUsername
      ).subscribe(resp => {
        if(resp['msg'] == 'ok') {
          alert('Succesfuly added new Job!')
        }
      })
    }
  }

}
