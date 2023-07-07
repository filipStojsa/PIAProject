import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminServiceService } from '../admin-service.service';
import { RegistrationService } from '../registration.service';
import { Job } from '../models/job';

@Component({
  selector: 'app-admin-jobs',
  templateUrl: './admin-jobs.component.html',
  styleUrls: ['./admin-jobs.component.css']
})
export class AdminJobsComponent implements OnInit {

  constructor(private router: Router, private service: AdminServiceService, private registerService: RegistrationService) { }

  allJobs = []

  ngOnInit(): void {
    this.service.getAllJobs().subscribe((jobs: Job[]) => {
      this.allJobs = jobs
    })
  }

}
