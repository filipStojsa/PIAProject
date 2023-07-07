import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminServiceService } from '../admin-service.service';
import { User } from '../models/user';
import { LoginService } from '../login.service';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  
  constructor(private router: Router, private service: AdminServiceService, private registerService: RegistrationService) { }
  
  allUsers = []
  selectedUser: User
  newImage: string;

  ngOnInit(): void {
    this.service.getAllUsers().subscribe((users: User[]) => {
      this.allUsers = users
    })
  }

  acceptUser(username: string) {
    this.service.acceptUser(username).subscribe((resp) => {
      if(resp['msg'] == 'ok') {
        alert('Accepted Succesfuly')
        this.router.navigate(['admin']);
      }
    })
  }

  denyUser(username: string) {
    this.service.denyUser(username).subscribe((resp) => {
      if(resp['msg'] == 'ok') {
        alert('Denied Succesfuly')
        this.router.navigate(['admin']);
      }
    })
  }

  modifyUser(username: string) {
    this.selectedUser = this.allUsers.filter(function(node) {
      return node.username == username
    })[0]
  }

  modifyField(field: string) {
    let value = prompt('Enter new value for field ' + field)
    if(!value) return
    let isOK = true
    switch (field) {
      case 'name':
        if(!/^[A-Z][a-zA-Z]*$/.test(value)) {
          alert("Name does not contain only letters")
          isOK = false
          return
        }
        break

      case 'surname':
        if(!/^[A-Z][a-zA-Z]*$/.test(value)) {
          alert("Surname does not contain only letters")
          isOK = false
          return
        }
        break

      case 'username':
        if(!/^(?=.*[a-zA-Z])(?=.*\d).+$/.test(value)) {
          alert("Username does not enforce the rules")
          isOK = false
          return
        }

        this.registerService.checkIsUsernameUnique(value, 'user').subscribe((resp) => {
          if(resp['msg'] == 'false') {
            alert("Username is not unique")
            isOK = false
            return
          }
        })
        break

      case 'tel':
        if(!/^(?:(?:\+|00)(?:\d{1,3})[\s-]?)?(?:\d{1,4}[\s-]?){1,5}\d{1,4}$/.test(value)) {
          alert("Telephone is not in correct format")
          isOK = false
          return
        }
        break

      case 'email':
        if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
          alert("Email is not in correct format")
          isOK = false
          return
        }
        break

      default:
        break;
    }
    // Check is OK
    this.service.changeUserField(
      field,
      value,
      this.selectedUser.username
    ).subscribe((resp) => {
      if(resp['msg'] == 'ok') {
        alert(field + ' changed succesfuly!')
        this.router.navigate(['admin']);
      }
    })
  }

  onImageChange(event: any) {
    const img = document.createElement('img');
    const file = event.target.files[0];
    const reader = new FileReader();

    
    reader.onloadend = () => {
      img.src = reader.result as string
      img.onload = () => {
        console.log(`Width: ${img.width}, Height: ${img.height}`);
        if(img.width >= 100 && img.width <= 300 && img.height >= 100 && img.height <= 300) {
          this.newImage = reader.result as string
          this.service.changeUserField(
            'image',
            this.newImage,
            this.selectedUser.username
          ).subscribe((resp) => {
            if(resp['msg'] == 'ok') {
              alert('Image changed succesfuly!')
              this.router.navigate(['admin']);
            }
          })
        }
        else {
          alert('Image not in right format')
        }
      }
    };
    
    reader.readAsDataURL(file);
  }

  deleteUser() {
    let resp = confirm('Are you sure you want to delete ' + this.selectedUser.username + '?')
    if(resp) {
      this.service.deleteUser(this.selectedUser.username).subscribe((resp) => {
        if(resp['msg'] == 'ok') {
          alert('Deleted succefuly')
          this.router.navigate(['admin']);
        }
      })
    }
  }
}
