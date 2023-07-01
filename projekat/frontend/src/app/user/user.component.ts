import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private router: Router) { }

  loggedUser : User

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'))
  }

  gotoDetails() {
    this.router.navigate(['user/details']);
  }
  
  gotoCreateObject() {
    this.router.navigate(['user/create_object']);
  }

  gotoGeneral() {
    this.router.navigate(['general']);
  }

  gotoCreateJob() {
    this.router.navigate(['user/create_job']);
  }

  gotoMyJobs() {
    this.router.navigate(['user/my_jobs']);
  }

}
