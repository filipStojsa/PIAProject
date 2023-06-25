import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { User } from '../models/user';
import { Agency } from '../models/agency';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: LoginService, private router: Router) { }

  ngOnInit(): void {
  }
  
  username: string
  password: string
  message: string

  login() {
    this.service.login(this.username, this.password).subscribe((resp) => {
      if(resp['type'] != 'error') {
        if(resp['type'] == 'user') {
          let user: User = resp['user']
          this.router.navigate(['user']);
        }
        else {
          let agency: Agency = resp['agency']
          this.router.navigate(['agency']);
        }
      }
      else {
        this.message = 'Wrong credentials!'
      }

    })
  }

}
