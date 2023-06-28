import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  constructor(private router: Router) {}
  loggedUser: User;
  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  }
  goBack() {
    this.router.navigate(['user']);
  }
}
