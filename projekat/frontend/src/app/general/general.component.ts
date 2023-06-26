import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../general.service';
import { Router } from '@angular/router';
import { Agency } from '../models/agency';


@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {

  constructor(private router: Router, private service: GeneralService) { }

  allAgencies = []

  ngOnInit(): void {
    this.service.getAllAgencies().subscribe((agencies: Agency[]) => {
      this.allAgencies = agencies
    })
    localStorage.clear()
  }

  seeMore(username: String) {
    let agency = this.allAgencies.filter(function(node) {
      return node.username == username
    })[0]

    localStorage.setItem('agency', JSON.stringify(agency))
    this.router.navigate(['general/details']);
  }

}
