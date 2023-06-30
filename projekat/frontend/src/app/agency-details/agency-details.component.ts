import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../general.service';
import { Router } from '@angular/router';
import { Agency } from '../models/agency';
import {Comment} from "../models/comment"

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
    if(!JSON.parse(localStorage.getItem('loggedUser'))) {
      // A user is not logged in
      this.comments.forEach(com => {
        const firstLetter = com.user.charAt(0);
        const spaceIndex = com.user.indexOf(' ');
        const letterAfterSpace = com.user.charAt(spaceIndex + 1);
        com.user = firstLetter + '*** ' + letterAfterSpace + '***'
      });
    }
  }

}
