import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { User } from '../models/user';

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
    this.service.login(this.username, this.password).subscribe((userFromDB: User) => {
      if(userFromDB!=null) {
        this.router.navigate(['user']);  
      }
      else {
        this.message="Error"
      }
    })
  }

}
