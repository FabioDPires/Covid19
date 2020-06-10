import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user: User;
  requests: number;

  constructor(
    public rest: RestService,
    private route: ActivatedRoute,
    private router: Router,
    private authServive: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getNumberOfTests();
  }

  getUser() {
    var idTemp = this.route.snapshot.params['id'];
    console.log(idTemp);
    this.rest.getUser(idTemp).subscribe((data: User) => {
      this.user = data;
      console.log(data);
    });
  }

  getNumberOfTests() {
    var idTemp = this.route.snapshot.params['id'];
    this.rest.getNumberUserTests(idTemp).subscribe((tests: number) => {
      this.requests = tests;
    });
  }

  delete() {
    var idTemp = this.route.snapshot.params['id'];
    this.rest.deleteUser(idTemp).subscribe(
      (res) => {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let sessionId = currentUser.id;
        if (sessionId == idTemp) {
          this.authServive.logout();
          this.router.navigate(['/login']);
        } else {
          this.router.navigate(['/users']);
        }
        console.log('Utilizador apagado');
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
