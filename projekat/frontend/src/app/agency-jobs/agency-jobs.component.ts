import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobService } from '../job.service';
import { Job } from '../models/job';
import { Object } from '../models/object';

@Component({
  selector: 'app-agency-jobs',
  templateUrl: './agency-jobs.component.html',
  styleUrls: ['./agency-jobs.component.css']
})
export class AgencyJobsComponent implements OnInit {

  constructor(private router: Router, private jobService: JobService) { }

  pendingJobs = []
  inProgressJobs = []
  otherJobs = []
  loggedAgencyUsername: string
  myOffer: number

  ngOnInit(): void {
    this.loggedAgencyUsername = JSON.parse(localStorage.getItem('loggedAgency'))['username']
    this.jobService.getAgencyJobs(this.loggedAgencyUsername).subscribe((jobs: Job[]) => {
      jobs.forEach(job => {
        this.jobService.getObject(job.object).subscribe((obj: Object) => {
          job.display = obj.type + ' at ' + obj.address
        })
      });
      
      jobs.forEach(job => {
        if(job.jobStatus == 'pending') {
          this.pendingJobs.push(job)
        }
        else if(job.jobStatus == 'inProgress'){
          this.inProgressJobs.push(job)
        }
        else if(job.jobStatus == 'accepted' || job.jobStatus == 'denied'){
          this.otherJobs.push(job)
        }
      });
    })
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

  makeAnOffer(_id) {
    if(this.myOffer) {
      this.jobService.makeAnOffer(
        this.myOffer,
        _id
      ).subscribe((resp) => {
        if(resp['msg'] == 'ok') {
          alert('Offer succesfully sent!')
        }
      })
    }
    else {
      alert('You must make an offer!')
    }
  }

  showDetails(id) {
    localStorage.setItem('jobId', id)
    this.router.navigate(['agency/job/details']);
  }
}
