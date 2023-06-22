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

  image: string

  onImageChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      // this.user.image = reader.result as string;
      // this.agency.image = reader.result as string;
      console.log(reader.result as string)
      this.image = reader.result as string
    };
    reader.readAsDataURL(file);

    // console.log(this.user.image)
  }

  register() {
    if(this.selectedUserType == 'user') {
      this.user.image = this.image
      this.service.registerUser(this.user).subscribe((resp) => {
        // Handle response...
      })
    }
    else {

    }
  }

}
