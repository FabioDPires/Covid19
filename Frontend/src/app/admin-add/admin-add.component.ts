import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models/user';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-add',
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.css'],
})
export class AdminAddComponent implements OnInit {
  @Input() adminData: User = new User();
  constructor(
    public rest: RestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {}

  addAdmin() {
    this.rest.addAdmin(this.adminData).subscribe(
      (result: User) => {
        console.log('Admin added: ' + result);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
