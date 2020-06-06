import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  @Input() userData: any = { password: '', repPassword: '' };
  error: any;
  success: any;
  constructor(
    public rest: RestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {}

  changePassword() {
    if (this.userData.password !== this.userData.repPassword) {
      console.log('Passes nao coincidem');
      this.error = 'Passwords não coincidem';
    } else {
      const id = this.route.snapshot.params['id'];
      let passwordObject: any = null;
      passwordObject = { password: this.userData.password };
      this.rest.changePassword(id, passwordObject).subscribe(
        (result) => {
          this.success = 'Password updated with success!';
        },
        (err) => {
          console.log(err);
          this.error = err.error.message;
        }
      );
      console.log('ID: ', id);
    }
  }
}
