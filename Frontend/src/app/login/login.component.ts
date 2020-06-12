import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @Input() cartaoCidadao: string;
  @Input() password: string;
  error: any;

  constructor(
    private router: Router,
    private authServive: AuthenticationService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['/homepage']);
    }
  }

  login(): void {
    this.authServive.login(this.cartaoCidadao, this.password).subscribe(
      (user: any) => {
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes;
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.router.navigate(['/homepage']);
        }
      },
      (err) => {
        this.error = err.error.message;
      }
    );
  }
}
