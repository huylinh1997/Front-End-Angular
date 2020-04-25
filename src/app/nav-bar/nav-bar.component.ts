import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  
  constructor(private router: Router) { }

  logoutNavbar = false;
  private username : any
  ngOnInit() {
  }

  ShowLogout() {
    if (localStorage.getItem('token')) {
      this.logoutNavbar = true;
      this.username = localStorage.getItem('username')
    }

    return this.logoutNavbar
  }

  HiddenLogin() {
    return !this.ShowLogout()
  }

  Admin() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['admin'])
    }
    else {
      this.router.navigate(['loginForm'])
    }
  }

  logout() {
    localStorage.clear();
  }

}
