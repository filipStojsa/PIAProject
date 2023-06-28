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
  allAgenciesReceived = []

  ngOnInit(): void {
    this.service.getAllAgencies().subscribe((agencies: Agency[]) => {
      this.allAgencies = agencies
      this.allAgenciesReceived = agencies
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

  searchStringName: String
  searchStringAddress: String

  searchByName() {
    if(this.searchStringName == '') {
      this.allAgencies = this.allAgenciesReceived
    }
    else {
      let s = this.searchStringName
      this.allAgencies = this.allAgenciesReceived.filter(function(node) {
        return node.agencyName == s
      })
    }
  }

  searchByAddress() {
    if(this.searchStringAddress == '') {
      this.allAgencies = this.allAgenciesReceived
    }
    else {
      let s = this.searchStringAddress
      this.allAgencies = this.allAgenciesReceived.filter(function(node) {
        return node.adress == s
      })
    }
  }

  sort(order: String) {
    if(order == 'asc') {
      this.allAgencies.sort((a, b) => {
        if (a.adress < b.adress) {
          return -1;
        }
        if (a.adress > b.adress) {
          return 1;
        }
      
        // If addresses are the same, compare names
        if (a.agencyName < b.agencyName) {
          return -1;
        }
        if (a.agencyName > b.agencyName) {
          return 1;
        }
      
        return 0; // addresses and names are equal
      })
    }
    else {
      this.allAgencies.sort((a, b) => {
        if (a.adress > b.adress) {
          return -1;
        }
        if (a.adress < b.adress) {
          return 1;
        }
      
        // If addresses are the same, compare names
        if (a.agencyName > b.agencyName) {
          return -1;
        }
        if (a.agencyName < b.agencyName) {
          return 1;
        }
      
        return 0; // addresses and names are equal
      })
    }
  }

}
