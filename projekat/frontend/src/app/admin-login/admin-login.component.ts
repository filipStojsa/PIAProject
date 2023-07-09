import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { Admin } from '../models/admin';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private service: LoginService, private router: Router) { }

  ngOnInit(): void {
    localStorage.clear()
  }
  
  username: string
  password: string
  message: string

  login() {
    this.service.login(this.username, this.password).subscribe((resp) => {
      if(resp['type'] != 'error' && resp['type'] != 'notGranted') {
        if(resp['type'] == 'admin') {
          let admin: Admin = resp['admin']
          localStorage.setItem('loggedAdmin', JSON.stringify(admin))
          this.router.navigate(['admin']);
        }
      }
      else {
        if(resp['type'] == 'error')
          this.message = 'Wrong credentials!'
        else
          this.message = 'Account not granted by admin!'
      }

    })
  }

}
