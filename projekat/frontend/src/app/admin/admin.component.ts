import { Component, OnInit } from '@angular/core';
import { Admin } from '../models/admin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router) { }

  loggedAdmin: Admin

  ngOnInit(): void {
    this.loggedAdmin = JSON.parse(localStorage.getItem('loggedAdmin'))
  }

  gotoWorkWithUsers() {
    this.router.navigate(['admin/users']);
  }

  gotoWorkWithAgencies() {
    this.router.navigate(['admin/agencies']);
  }

  gotoWorkWithJobs() {
    this.router.navigate(['admin/jobs']);
  }

  gotoRegistration() {
    this.router.navigate(['register']);
  }

}
