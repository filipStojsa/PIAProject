import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { User } from '../models/user';
import { Agency } from '../models/agency';
import { Admin } from '../models/admin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: LoginService, private router: Router) { }

  ngOnInit(): void {
    localStorage.clear()
  }
  
  username: string
  password: string
  message: string

  login() {
    this.service.login(this.username, this.password).subscribe((resp) => {
      if(resp['type'] != 'error') {
        if(resp['type'] == 'user') {
          let user: User = resp['user']
          localStorage.setItem('loggedUser', JSON.stringify(user))
          this.router.navigate(['user']);
        }
        else if(resp['type'] == 'agency') {
          let agency: Agency = resp['agency']
          localStorage.setItem('loggedAgency', JSON.stringify(agency))
          this.router.navigate(['agency']);
        }
        else {
          let admin: Admin = resp['admin']
          localStorage.setItem('loggedAdmin', JSON.stringify(admin))
          this.router.navigate(['admin']);
        }
      }
      else {
        this.message = 'Wrong credentials!'
      }

    })
  }

}
