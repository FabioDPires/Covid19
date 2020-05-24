import { Component, OnInit, Input } from '@angular/core';
import { Request } from '../models/request';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-request-schedule',
  templateUrl: './request-schedule.component.html',
  styleUrls: ['./request-schedule.component.css'],
})
export class RequestScheduleComponent implements OnInit {
  @Input() requestData: any = { dataExame: '' };

  constructor(
    public rest: RestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {}

  updateRequest() {
    console.log(this.requestData);
    const id = this.route.snapshot.params['id'];
    this.rest.scheduleRequest(id, this.requestData).subscribe(
      (result) => {
        this.router.navigate(['/request-details/' + id]);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
