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

  receivedJobs = []

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
      this.receivedJobs = jobs
      localStorage.removeItem('jobId')
    })

  }

  showDetails(id) {
    localStorage.setItem('jobId', id)
    this.router.navigate(['user/job/details']);
  }

  getRowColor(jobStatus: string): string {
    if (jobStatus === 'accepted') {
      return '#C8E6C9';
    } else if (jobStatus === 'denied') {
      return '#FFCDD2';
    } else {
      return '';
    }
  }

  goBack() {
    this.router.navigate(['user']);
  }
  
  active: boolean = false
  inProgress: boolean = false
  finished: boolean = false

  filter() {
    if(this.active) {
      this.myJobs = this.receivedJobs.filter(
        job => job.jobStatus == 'active'
      )
    }
    else if(this.inProgress) {
      this.myJobs = this.receivedJobs.filter(
        job => job.jobStatus == 'inProgress'
      )
    }
    else if(this.finished) {
      this.myJobs = this.receivedJobs.filter(
        job => job.jobStatus == 'finished'
      )
    }
    else {
      this.myJobs = this.receivedJobs
    }
  }

}
