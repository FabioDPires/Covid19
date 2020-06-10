import { Component, OnInit, Input } from '@angular/core';
import { Request } from '../models/request';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-request-add',
  templateUrl: './request-add.component.html',
  styleUrls: ['./request-add.component.css'],
})
export class RequestAddComponent implements OnInit {
  @Input() requestData: Request = new Request();
  error: any;
  success: any;
  constructor(
    public rest: RestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {}

  addRequest() {
    console.log('Objeto', this.requestData);
    this.rest.addRequest(this.requestData).subscribe(
      (result: Request) => {
        console.log('Request added: ', result);
        this.success = 'Pedido realizado';
      },
      (err) => {
        console.log(err);
        this.error = err.error;
      }
    );
  }
}
