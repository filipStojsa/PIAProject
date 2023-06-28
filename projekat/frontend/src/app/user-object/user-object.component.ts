import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Room } from '../models/rooms';
import { ObjectService } from '../object.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-object',
  templateUrl: './user-object.component.html',
  styleUrls: ['./user-object.component.css']
})
export class UserObjectComponent implements OnInit {

  constructor(private service: ObjectService, private router: Router) { }

  type: string
  address: string
  rooms: number
  area: number
  message: string

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;

  ngOnInit(): void {
  }

  checkValidity() {
    if(!/^[A-Z][a-zA-Z0-9\s]+$/.test(this.address)) {
      this.message = "Address does not contain only letters and numbers!"
    }
    else {
      this.message = ''
    }
  }

  updateCanvas() {
    let ctx = this.canvas.nativeElement.getContext('2d')
    let canvasWidth = this.canvas.nativeElement.width
    let canvasHeight = this.canvas.nativeElement.height

    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    
    if(this.rooms == 1) {
      // Draw one room
      ctx.rect(150, 100, 180, 120)
      ctx.stroke()
      this.drawDoor(ctx, 200, 190, 20, 30)      
    }
    else if (this.rooms == 2) {
      // Draw two rooms
      ctx.rect(250, 50, 150, 120)
      ctx.rect(150, 50, 100, 200)
      ctx.stroke()
      this.drawDoor(ctx, 300, 140, 20, 30)
    }
    else {
      // Draw three rooms
      ctx.rect(250, 50, 150, 120)
      ctx.rect(150, 50, 100, 200)
      ctx.rect(250, 170, 300, 80)
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

  submitObject() {
    if(
      this.type == '' || 
      this.address == '' ||
      this.rooms == undefined ||
      this.area == undefined || this.area == 0
    ) {
      this.message = '\nThere are some fields that are unfilled!'
      return
    }
    else {
      this.message = ''
    }

    let rooms = Array<Room>
    if(this.rooms == 1) {
      rooms[0] = this.createRoom(150, 100, 180, 120)
      // TODO...
    }
    else if (this.rooms == 2) {
      
    }
    else {
      
    }

  }

  createRoom(x: number, y: number, w: number, h: number) {
    let newRoom: Room
    newRoom.color = 'white'
    newRoom.heigth = h
    newRoom.width = w
    newRoom.x = x
    newRoom.y = y
    return newRoom
  }

  goBack() {
    this.router.navigate(['user']);
  }

}
