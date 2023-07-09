import { Component, OnInit, ViewChild, ViewContainerRef, ElementRef, AfterViewInit, AfterContentInit, ComponentFactoryResolver } from '@angular/core';
import { Job } from '../models/job';
import { Object } from '../models/object';
import { Router } from '@angular/router';
import { JobService } from '../job.service';
import { User } from '../models/user';
import { Agency } from '../models/agency';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit  {

  constructor(
    private router: Router, 
    private jobService: JobService
  ) { }
  
  myJob: Job
  jobsObject: Object

  // For comment
  selectedScore: number
  comment: string


  ngOnInit(): void {
    this.jobService.getJob(localStorage.getItem('jobId')).subscribe((job: Job) => {
      this.myJob = job
      this.jobService.getObject(job.object).subscribe((obj: Object) => {
        this.jobsObject = obj
        this.fillCanvas()
      })
    })
  }

  fillCanvas() {
    const canvas: HTMLCanvasElement = document.querySelector('canvas');
    let ctx = canvas.getContext('2d')
    let canvasWidth = canvas.width
    let canvasHeight = canvas.height
    if(this.jobsObject.num == 1) {
      ctx.beginPath();
      ctx.rect(150, 100, 180, 120)
      ctx.fillStyle = this.jobsObject.rooms[0].color
      ctx.fill();
      ctx.stroke()
      
      this.drawDoor(ctx, 200, 190, 20, 30)
    }
    else if(this.jobsObject.num == 2) {
      ctx.beginPath();
      ctx.rect(250, 50, 150, 120)
      ctx.fillStyle = this.jobsObject.rooms[0].color
      ctx.fill();
      ctx.stroke()

      ctx.beginPath();
      ctx.rect(150, 50, 100, 200)
      ctx.fillStyle = this.jobsObject.rooms[1].color
      ctx.fill();
      ctx.stroke()
      this.drawDoor(ctx, 300, 140, 20, 30)
    }
    else {
      ctx.beginPath();
      ctx.rect(250, 50, 150, 120)
      ctx.fillStyle = this.jobsObject.rooms[0].color
      ctx.fill();
      ctx.stroke()

      ctx.beginPath();
      ctx.rect(150, 50, 100, 200)
      ctx.fillStyle = this.jobsObject.rooms[1].color
      ctx.fill();
      ctx.stroke()

      ctx.beginPath();
      ctx.rect(250, 170, 300, 80)
      ctx.fillStyle = this.jobsObject.rooms[2].color
      ctx.fill();
      ctx.stroke()


      this.drawDoor(ctx, 300, 140, 20, 30)
      this.drawDoor(ctx, 350, 220, 20, 30)
    }
  }

  drawDoor(ctx: CanvasRenderingContext2D, doorX: number, doorY: number, doorWidth: number, doorHeight: number) {
    ctx.beginPath();
    ctx.rect(doorX, doorY, doorWidth, doorHeight);
    ctx.fillStyle = "#deb887";
    ctx.fill();
    ctx.stroke();

    var handleRadius = 3;
    var handleX = doorX + doorWidth - handleRadius - 2;
    var handleY = doorY + doorHeight / 2;

    ctx.beginPath();
    ctx.arc(handleX, handleY, handleRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.stroke()
  }

  showButton() {
    let isAllFinished = true
    this.jobsObject.rooms.forEach(room => {
      if(room.color != 'green') {
        isAllFinished = false
      }
    });
    return this.myJob.jobStatus == 'inProgress' && isAllFinished
  }

  showComment() {
    if(this.myJob.jobStatus == 'finished') {
      return true
    }
    else {
      return false
    }
  }

  payJob() {
    this.jobService.payJob(localStorage.getItem('jobId')).subscribe((resp) => {
      if(resp['msg'] == 'ok') {

        this.jobService.getAgency(this.myJob.agencyUsername).subscribe((agency: Agency) => {
          let newWorkers = parseInt(agency.workers) + this.myJob.workers

          this.jobService.changeAgencyField(
            'workers',
            newWorkers+'',
            agency.username
          ).subscribe((resp) => {
            if(resp['msg'] == 'ok') {
              alert('Job payed succesfully!')
              this.router.navigate(['user/my_jobs'])
            }
          })
          
        })
      }
    })
  }

  submitComment() {
    let user: User = JSON.parse(localStorage.getItem('loggedUser'))
    this.jobService.addComment(
      this.selectedScore,
      this.comment, 
      user.username,
      user.name + ' ' + user.surname,
      this.myJob.agencyUsername
    ).subscribe((resp) => {
      if(resp['msg'] == 'ok') {
        alert('Comment succesfuly added!')
      }
    })
  }

  showAcceptDenyButtons() {
    if(this.myJob.jobStatus == 'pending' && this.myJob.offer != 0) {
      return true
    }
    else {
      return false
    }
  }

  acceptJob() {
    this.jobService.changeJobStatus(
      'accepted',
      localStorage.getItem('jobId')
    ).subscribe((resp) => {
      if(resp['msg'] == 'ok') {
        alert('Job succesfuly accepted!')
      }
    })
  }

  denyJob() {
    this.jobService.changeJobStatus(
      'denied',
      localStorage.getItem('jobId')
    ).subscribe((resp) => {
      if(resp['msg'] == 'ok') {
        alert('Job denied!')
      }
    })
  }

}
