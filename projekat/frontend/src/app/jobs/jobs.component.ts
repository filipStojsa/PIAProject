import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobService } from '../job.service';
import { Job } from '../models/job';
import { Object } from '../models/object';
import { ObjectService } from '../object.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  constructor(private router: Router, private jobService: JobService) { }

  loggedUsername: string
  myJobs = []

  ngOnInit(): void {
    let tmp = []
    this.loggedUsername = JSON.parse(localStorage.getItem('loggedUser'))['username']
    this.jobService.getMyJobs(this.loggedUsername).subscribe((jobs: Job[]) => {
      jobs.forEach(job => {
        this.jobService.getObject(job.object).subscribe((obj: Object) => {
          job.display = obj.type + ' at ' + obj.address
        })
      });

      this.myJobs = jobs
      localStorage.removeItem('jobId')
    })

  }

  showDetails(id) {
    localStorage.setItem('jobId', id)
    this.router.navigate(['user/job/details']);
  }

}
