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
  }

}
