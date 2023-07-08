import { Component, OnInit } from '@angular/core';
import { ObjectService } from '../object.service';
import { Router } from '@angular/router';
import { Object } from '../models/object';
import { JobService } from '../job.service';
import { Room } from '../models/rooms';

@Component({
  selector: 'app-user-object-details',
  templateUrl: './user-object-details.component.html',
  styleUrls: ['./user-object-details.component.css']
})
export class UserObjectDetailsComponent implements OnInit {

  constructor(private service: JobService, private router: Router) { }

  objectId: string
  myObject: Object

  ngOnInit(): void {
    this.objectId = localStorage.getItem('object')
    this.service.getObject(this.objectId).subscribe((obj: Object) => {
      this.myObject = obj
      this.fillCanvas()
    })
  }

  fillCanvas() {
    const canvas: HTMLCanvasElement = document.querySelector('canvas');
    let ctx = canvas.getContext('2d')
    let canvasWidth = canvas.width
    let canvasHeight = canvas.height
    if(this.myObject.num == 1) {
      ctx.beginPath();
      ctx.rect(150, 100, 180, 120)
      ctx.fillStyle = this.myObject.rooms[0].color
      ctx.fill();
      ctx.stroke()
      
      this.drawDoor(ctx, 200, 190, 20, 30)
    }
    else if(this.myObject.num == 2) {
      ctx.beginPath();
      ctx.rect(250, 50, 150, 120)
      ctx.fillStyle = this.myObject.rooms[0].color
      ctx.fill();
      ctx.stroke()

      ctx.beginPath();
      ctx.rect(150, 50, 100, 200)
      ctx.fillStyle = this.myObject.rooms[1].color
      ctx.fill();
      ctx.stroke()
      this.drawDoor(ctx, 300, 140, 20, 30)
    }
    else {
      ctx.beginPath();
      ctx.rect(250, 50, 150, 120)
      ctx.fillStyle = this.myObject.rooms[0].color
      ctx.fill();
      ctx.stroke()

      ctx.beginPath();
      ctx.rect(150, 50, 100, 200)
      ctx.fillStyle = this.myObject.rooms[1].color
      ctx.fill();
      ctx.stroke()

      ctx.beginPath();
      ctx.rect(250, 170, 300, 80)
      ctx.fillStyle = this.myObject.rooms[2].color
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

  modifyAddress() {
    let newAddress = prompt('Enter new address')
    this.service.changeObjectField(
      'address',
      newAddress,
      this.objectId
    ).subscribe((resp) => {
      if(resp['msg'] == 'ok') {
        alert('Address changed succesfuly!')
        this.router.navigate(['user/create_object']);
      }
    })
  }

  modifyType() {
    let newType = prompt('Flat or House?')
    this.service.changeObjectField(
      'type',
      newType,
      this.objectId
    ).subscribe((resp) => {
      if(resp['msg'] == 'ok') {
        alert('Type changed succesfuly!')
        this.router.navigate(['user/create_object']);
      }
    })
  }

  modifyArea() {
    let newArea = prompt('New area?')
    this.service.changeObjectField(
      'area',
      newArea,
      this.objectId
    ).subscribe((resp) => {
      if(resp['msg'] == 'ok') {
        alert('Area changed succesfuly!')
        this.router.navigate(['user/create_object']);
      }
    })
  }

  modifyCanvas() {
    let newNum = parseInt(prompt('New number of rooms?'))
    let rooms: Array<Room> = []
    if(newNum == 1) {
      rooms[0] = this.createRoom(150, 100, 180, 120)
    }
    else if (newNum == 2) {
      rooms[0] = this.createRoom(250, 50, 150, 120)
      rooms[1] = this.createRoom(150, 50, 100, 200)
    }
    else {
      rooms[0] = this.createRoom(250, 50, 150, 120)
      rooms[1] = this.createRoom(150, 50, 100, 200)
      rooms[2] = this.createRoom(250, 170, 300, 80)
    }
    this.service.changeObjectNum( 
      newNum,
      this.objectId
    ).subscribe((resp) => {
      if(resp['msg'] == 'ok') {
        // Change room layout
        this.service.changeObjectRooms(
          rooms,
          this.objectId
        ).subscribe((resp) => {
          alert('New rooms changed succesfuly!')
          this.router.navigate(['user/create_object']);
        })
      }
    })
  }

  createRoom(x: number, y: number, w: number, h: number) {
    let newRoom: Room = new Room
    newRoom.color = 'white'
    newRoom.height = h
    newRoom.width = w
    newRoom.x = x
    newRoom.y = y
    return newRoom
  }

}
