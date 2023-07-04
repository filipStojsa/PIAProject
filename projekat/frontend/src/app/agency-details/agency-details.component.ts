import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../general.service';
import { Router } from '@angular/router';
import { Agency } from '../models/agency';
import {Comment} from "../models/comment"
import { User } from '../models/user';

@Component({
  selector: 'app-agency-details',
  templateUrl: './agency-details.component.html',
  styleUrls: ['./agency-details.component.css']
})
export class AgencyDetailsComponent implements OnInit {

  constructor(private router: Router, private service: GeneralService) { }

  agency: Agency
  comments: Comment[]

  ngOnInit(): void {
    this.agency = JSON.parse(localStorage.getItem('agency'))
    this.comments = this.agency.comments
    if(!JSON.parse(localStorage.getItem('loggedUser')) && !JSON.parse(localStorage.getItem('loggedAgency'))) {
      // A user is not logged in
      this.comments.forEach(com => {
        const firstLetter = com.user.charAt(0);
        const spaceIndex = com.user.indexOf(' ');
        const letterAfterSpace = com.user.charAt(spaceIndex + 1);
        com.user = firstLetter + '*** ' + letterAfterSpace + '***'
      });
    }
  }

  showButton(username) {
    let user: User = JSON.parse(localStorage.getItem('loggedUser'))
    if(user) {
      let loggedUsername = user.username
      if(username == loggedUsername) {
        return true
      }
    }

    return false
  }

  editComment(comIndex) {
    let newCommentText = prompt('Enter new comment:')
    let newRating = prompt('Enter new rating:')
    let agencyUsername = this.agency.username

    if(parseInt(newRating) > 5 || parseInt(newRating) < 1) {
      alert('New rating must be between 1 and 5!')
      return
    }

    this.service.editComment(
      agencyUsername,
      newCommentText,
      newRating,
      comIndex
    ).subscribe((resp) => {
      if(resp['msg'] == 'ok') {
        alert('Comment edited!')
        this.router.navigate(['general']);
      }
    })
  }

  goBack() {
    if(JSON.parse(localStorage.getItem('loggedAgency'))) {
      this.router.navigate(['agency']);
    }
    else {
      this.router.navigate(['general']);
    }
  }
}
