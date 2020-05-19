import { Component, OnInit } from '@angular/core';
import { Request } from '../models/request';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css'],
})
export class RequestDetailComponent implements OnInit {
  request: Request;

  constructor(
    public rest: RestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    var idTemp = this.route.snapshot.params['id'];
    console.log(idTemp);
    this.rest.getRequest(idTemp).subscribe((data: Request) => {
      this.request = data;
    });
  }

  scheduleExam() {
    console.log('SCHEDULE EXAM WORKS!!!');
  }

  setResult() {
    console.log('SET RESULT WORKS!!!');
  }
}
