import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agency } from '../models/agency';
import { User } from '../models/user';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private service: RegistrationService, private router: Router) { }

  ngOnInit(): void {
  }

  selectedUserType: string = 'user';
  user = new User
  agency = new Agency

  image: string = ''
  isImageOK = true

  messageUser = []
  messageAgency = []

  onImageChange(event: any) {
    const img = document.createElement('img');
    const file = event.target.files[0];
    const reader = new FileReader();

    
    reader.onloadend = () => {
      img.src = reader.result as string
      img.onload = () => {
        console.log(`Width: ${img.width}, Height: ${img.height}`);
        if(img.width >= 100 && img.width <= 300 && img.height >= 100 && img.height <= 300) {
          this.image = reader.result as string
          this.isImageOK = true
        }
        else {
          this.isImageOK = false
        }
      }
    };
    
    reader.readAsDataURL(file);
  }
  
  checkUserFields() {
    let isOK = true

    this.messageUser = []

    // Check user's name validity
    if(!/^[A-Z][a-zA-Z]*$/.test(this.user.name)) {
      this.messageUser[0] = "Name does not contain only letters"
      isOK = false
    }

    // Check user's surname validity
    if(!/^[A-Z][a-zA-Z]*$/.test(this.user.surname)) {
      this.messageUser[1] = "Surname does not contain only letters"
      isOK = false
    }

    // Check user's username validity
    if(!/^(?=.*[a-zA-Z])(?=.*\d).+$/.test(this.user.username)) {
      this.messageUser[2] = "Username does not enforce the rules"
      isOK = false
    }

    
    // Check user's password validity
    if(!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(this.user.password)) {
      this.messageUser[3] = "Password does not enforce the rules"
      isOK = false
    }
    
    // Check user's telephone validity
    if(!/^(?:(?:\+|00)(?:\d{1,3})[\s-]?)?(?:\d{1,4}[\s-]?){1,5}\d{1,4}$/.test(this.user.tel)) {
      this.messageUser[4] = "Telephone is not in correct format"
      isOK = false
    }
    
    // Check user's email validity
    if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.user.email)) {
      this.messageUser[5] = "Email is not in correct format"
      isOK = false
    }
    
    if(!this.isImageOK && this.image == '') {
      this.messageUser[6] = "Image size is not correct between 100px and 300px!"
      isOK = false
    }
    
    return isOK
  }

  checkAgencyFields() {
    let isOK = true

    this.messageAgency = []

    // Check agency's name validity
    if(!/^[A-Z][a-zA-Z]*$/.test(this.agency.agencyName)) {
      this.messageAgency[0] = "Name does not contain only letters!"
      isOK = false
    }

    // Check agency's state validity
    if(!/^[A-Z][a-zA-Z]*$/.test(this.agency.state)) {
      this.messageAgency[1] = "State does not contain only letters!"
      isOK = false
    }

    // Check agency's city validity
    if(!/^[A-Z][a-zA-Z]*$/.test(this.agency.city)) {
      this.messageAgency[2] = "City does not contain only letters!"
      isOK = false
    }

    // Check agency's address validity
    if(!/^[a-zA-Z0-9\s]+$/.test(this.agency.adress)) {
      this.messageAgency[3] = "Address does not contain only letters and numbers!"
      isOK = false
    }

    // Check agency's PIB validity
    if(!/^[0-9]{10,10}$/.test(this.agency.pib.toString())) {
      this.messageAgency[4] = "PIB is not in right format!"
      isOK = false
    }

    // Check agency's username validity
    if(!/^(?=.*[a-zA-Z])(?=.*\d).+$/.test(this.agency.username)) {
      this.messageAgency[5] = "Username does not enforce the rules"
      isOK = false
    }

    

    // Check user's password validity
    if(!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(this.agency.password)) {
      this.messageAgency[6] = "Password does not enforce the rules"
      isOK = false
    }

    // Check user's telephone validity
    if(!/^(?:(?:\+|00)(?:\d{1,3})[\s-]?)?(?:\d{1,4}[\s-]?){1,5}\d{1,4}$/.test(this.agency.tel)) {
      this.messageAgency[7] = "Telephone is not in correct format"
      isOK = false
    }

    // Check user's email validity
    if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.agency.email)) {
      this.messageAgency[8] = "Email is not in correct format"
      isOK = false
    }

    if(!this.isImageOK && this.image == '') {
      this.messageAgency[9] = "Image size is not correct between 100px and 300px!"
      isOK = false
    }

    return isOK
  }

  register() {
    if(this.selectedUserType == 'user') {
      if(this.checkUserFields()) {
        // Check if username is Unique
        this.service.checkIsUsernameUnique(this.user.username, 'user').subscribe((resp) => {
          if(resp['msg'] == 'false') {
            this.messageUser[2] = "Username is not unique"
            return
          }

          // Username is OK, now check email
          this.service.checkIsEmailUnique(this.user.email, 'user').subscribe((resp) => {
            if(resp['msg'] == 'false') {
              this.messageUser[5] = "Email is not unique to username"
              return
            }

            // Email is unique, go on...
            if(this.isImageOK && this.image == '') {
              let img = document.getElementById('default-image')
              let imgURL = img.getAttribute('src')
              this.image = imgURL
            }
            this.user.image = this.image
            this.service.registerUser(this.user).subscribe((resp) => {
              if(resp['msg'] == 'OK') {
                if(localStorage.getItem('loggedAdmin')) {
                  this.service.changeUserField(
                    'status',
                    'ok',
                    this.user.username
                  ).subscribe((resp) => {
                    alert('User is added succesfuly by admin!')
                  })
                }
                else {
                  alert('User is added succesfuly!')
                }
              }
            })
          })
        })
      }
    }
    else {
      if(this.checkAgencyFields()) {
        this.service.checkIsUsernameUnique(this.agency.username, 'agency').subscribe((resp) => {
          if(resp['msg'] == 'false') {
            this.messageAgency[5] = "Username is not unique"
            return
          }

          // Username is ok, now check email
          this.service.checkIsEmailUnique(this.agency.email, 'agency').subscribe((resp) => {
            if(resp['msg'] == 'false') {
              this.messageAgency[8] = "Email is not unique to username"
              return
            }
            // Email is unique, go on...
            if(this.isImageOK && this.image == '') {
              let img = document.getElementById('default-image')
              let imgURL = img.getAttribute('src')
              this.image = imgURL
            }
            this.agency.image = this.image
            this.service.registerAgency(this.agency).subscribe((resp) => {
              if(resp['msg'] == 'OK') {
                if(localStorage.getItem('loggedAdmin')) {
                  this.service.changeAgencyField(
                    'status',
                    'ok',
                    this.agency.username
                  ).subscribe((resp) => {
                    alert('Agency is added succesfuly by admin!')
                  })
                }
                else {
                  alert('Agency is added succesfuly!')
                }
              }
            })
          })

        })

      }
    }
  }

}
