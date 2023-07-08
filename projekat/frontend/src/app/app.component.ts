import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PIA Rocks';

  showLogout() {
    if(localStorage.getItem('loggedUser') || localStorage.getItem('loggedAgency') || localStorage.getItem('loggedAdmin')) {
      return true
    }
    else {
      return false
    }
  }
}
