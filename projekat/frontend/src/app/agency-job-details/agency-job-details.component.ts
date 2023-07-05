import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobService } from '../job.service';
import { Job } from '../models/job';
import { Object } from '../models/object';

@Component({
  selector: 'app-agency-job-details',
  templateUrl: './agency-job-details.component.html',
  styleUrls: ['./agency-job-details.component.css']
})
export class AgencyJobDetailsComponent implements OnInit {

  constructor(
    private router: Router, 
    private jobService: JobService
  ) { }

  myJob: Job
  jobsObject: Object

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

  startJob() {
    this.jobService.changeJobStatus(
      'inProgress',
      localStorage.getItem('jobId')
    ).subscribe((resp) => {
      if(resp['msg'] == 'ok') {
        this.router.navigate(['agency/jobs']);
      }
    })
  }

  showStartJobButton() {
    if(this.myJob.jobStatus == 'accepted') {
      return true
    }
    return false
  }

}
