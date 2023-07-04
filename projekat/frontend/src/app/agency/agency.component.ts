import { Component, OnInit } from '@angular/core';
import { Agency } from '../models/agency';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.css']
})
export class AgencyComponent implements OnInit {

  constructor(private router: Router) { }

  loggedAgency: Agency

  ngOnInit(): void {
    this.loggedAgency = JSON.parse(localStorage.getItem('loggedAgency'))
    localStorage.removeItem('agency')
  }

  gotoDetails() {
    localStorage.setItem('agency', JSON.stringify(this.loggedAgency))
    this.router.navigate(['general/details']);
  }

  gotoMyJobs() {
    this.router.navigate(['agency/jobs']);
  }
}
