import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  role: any;
  id: any;

  constructor(
    private router: Router,
    private authServive: AuthenticationService
  ) {}

  ngOnInit(): void {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log('Role', currentUser.role);
    this.role = currentUser.role;
    this.id = currentUser.id;
  }

  logout() {
    this.authServive.logout();
    this.router.navigate(['/login']);
  }
}
