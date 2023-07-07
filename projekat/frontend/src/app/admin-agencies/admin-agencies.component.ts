import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminServiceService } from '../admin-service.service';
import { RegistrationService } from '../registration.service';
import { Agency } from '../models/agency';

@Component({
  selector: 'app-admin-agencies',
  templateUrl: './admin-agencies.component.html',
  styleUrls: ['./admin-agencies.component.css']
})
export class AdminAgenciesComponent implements OnInit {

  constructor(private router: Router, private service: AdminServiceService, private registerService: RegistrationService) { }

  allAgencies = []
  selectedAgency: Agency
  newImage: string

  ngOnInit(): void {
    this.service.getAllAgencies().subscribe((agencies: Agency[]) => {
      this.allAgencies = agencies
    })
  }

  modifyAgency(username: string) {
    this.selectedAgency = this.allAgencies.filter(function(node) {
      return node.username == username
    })[0]
  }

  acceptAgency(username: string) {
    this.service.acceptAgency(username).subscribe((resp) => {
      if(resp['msg'] == 'ok') {
        alert('Accepted Succesfuly')
        this.router.navigate(['admin']);
      }
    })
  }

  denyAgency(username: string) {
    this.service.denyAgency(username).subscribe((resp) => {
      if(resp['msg'] == 'ok') {
        alert('Accepted Succesfuly')
        this.router.navigate(['admin']);
      }
    })
  }

  modifyField(field: string) {
    let value = prompt('Enter new value for field ' + field)

    if(!value) return

    let isOK = true
    switch (field) {
      case 'agencyName':
        if(!/^[A-Z][a-zA-Z]*$/.test(value)) {
          alert("Name does not contain only letters")
          isOK = false
          return
        }
        break

      case 'state':
        if(!/^[A-Z][a-zA-Z]*$/.test(value)) {
          alert("State does not contain only letters!")
          isOK = false
          return
        }
        break

      case 'city':
        if(!/^[A-Z][a-zA-Z]*$/.test(value)) {
          alert("City does not contain only letters!")
          isOK = false
          return
        }
        break

      case 'adress':
        if(!/^[a-zA-Z0-9\s]+$/.test(value)) {
          alert("Address does not contain only letters and numbers!")
          isOK = false
          return
        }
        break

      case 'pib':
        if(!/^[0-9]{10,10}$/.test(value)) {
          alert("PIB is not in right format!")
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

        this.registerService.checkIsUsernameUnique(value, 'agency').subscribe((resp) => {
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

    this.service.changeAgencyField(
      field,
      value,
      this.selectedAgency.username
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
          this.service.changeAgencyField(
            'image',
            this.newImage,
            this.selectedAgency.username
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

  deleteAgency() {
    let resp = confirm('Are you sure you want to delete ' + this.selectedAgency.username + '?')
    if(resp) {
      this.service.deleteAgency(this.selectedAgency.username).subscribe((resp) => {
        if(resp['msg'] == 'ok') {
          alert('Deleted succefuly')
          this.router.navigate(['admin']);
        }
      })
    }
  }

  setWorkers(username: string) {
    let value = prompt('How many users to add?')
    
    if(!/^[0-9]*$/.test(value)) {
      alert('Number of workers must be number!')
      return
    }

    this.service.changeAgencyField(
      'workers',
      value,
      username
    ).subscribe((resp) => {
      if(resp['msg'] == 'ok') {
        alert('Agency now has ' + value + ' workers!')
        this.router.navigate(['admin']);
      }
    })
  }

}
