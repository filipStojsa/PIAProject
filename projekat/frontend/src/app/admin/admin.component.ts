import { Component, OnInit } from '@angular/core';
import { Admin } from '../models/admin';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }

  loggedAdmin: Admin

  ngOnInit(): void {
    this.loggedAdmin = JSON.parse(localStorage.getItem('loggedAdmin'))
  }

  gotoWorkWithUsers() {

  }

  gotoWorkWithAgencies() {
    
  }

  gotoWorkWithJobs() {
    
  }

}
