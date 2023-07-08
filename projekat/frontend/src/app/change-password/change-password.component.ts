import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private router: Router, private service: AdminServiceService) { }

  ngOnInit(): void {
  }

  oldPassword: string;
  confirmOldPassword: string;
  newPassword: string;

  message: string

  changePassword() {
    let pass: string
    if(localStorage.getItem('loggedUser')) {
      pass = JSON.parse(localStorage.getItem('loggedUser'))['password']
    }
    else if(localStorage.getItem('loggedAgency')) {
      pass = JSON.parse(localStorage.getItem('loggedAgency'))['password']
    }
    if(!pass) return 
    if(this.oldPassword != pass) {
      this.message = 'You entered wrong old password!'
      return
    }

    if (this.oldPassword != this.confirmOldPassword) {
      this.message = 'Old and new password do not match!'
      return
    }

    // Old password confirmed, check new password policy
    if(!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(this.newPassword)) {
      this.message = "New Password does not enforce the rules"
      return
    }

    // New password OK, change it
    if(localStorage.getItem('loggedUser')) {
      let username = JSON.parse(localStorage.getItem('loggedUser'))['username']
      this.service.changeUserField(
        'password',
        this.newPassword,
        username
      ).subscribe((resp) => {
        if(resp['msg'] == 'ok') {
          alert('Password changed succesfuly, please log in with new credentials!')
          this.router.navigate(['/']);
        }
      })
    }
    else if(localStorage.getItem('loggedAgency')) {
      let username = JSON.parse(localStorage.getItem('loggedAgency'))['username']
      this.service.changeAgencyField(
        'password',
        this.newPassword,
        username
      ).subscribe((resp) => {
        if(resp['msg'] == 'ok') {
          alert('Password changed succesfuly, please log in with new credentials!')
          this.router.navigate(['/']);
        }
      })
    }
  }
}
