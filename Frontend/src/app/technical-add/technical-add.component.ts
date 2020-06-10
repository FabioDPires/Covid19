import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models/user';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-technical-add',
  templateUrl: './technical-add.component.html',
  styleUrls: ['./technical-add.component.css'],
})
export class TechnicalAddComponent implements OnInit {
  @Input() technicalData: User = new User();
  error: any;
  success: any;

  constructor(
    public rest: RestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {}

  addTechnical() {
    this.rest.addTechnical(this.technicalData).subscribe(
      (result: User) => {
        console.log('Technical added: ' + result);
        this.success = 'Técnico criado com sucesso';
      },
      (err) => {
        console.log(err);
        this.error = err.error.message;
      }
    );
  }
}
