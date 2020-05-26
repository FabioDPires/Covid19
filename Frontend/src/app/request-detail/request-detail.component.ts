import { Component, OnInit, Input } from '@angular/core';
import { Request } from '../models/request';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css'],
})
export class RequestDetailComponent implements OnInit {
  @Input() requestData: any = { dataExame: '', resultado: '' };
  request: Request;
  paciente: any;

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
      this.paciente = data.paciente;
      console.log(data);
    });
  }

  scheduleExam() {
    const id = this.route.snapshot.params['id'];
    let dataExamObject: any = null;
    dataExamObject = { dataExame: this.requestData.dataExame };
    console.log(this.requestData);
    this.rest.scheduleRequest(id, dataExamObject).subscribe(
      (result) => {
        this.router.navigate(['/request-details/' + id]);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  setResult() {
    const id = this.route.snapshot.params['id'];
    let dataResultObject: any = null;
    dataResultObject = { resultado: this.requestData.resultado };
    console.log(this.requestData);
    this.rest.setRequestResult(id, dataResultObject).subscribe(
      (result) => {
        this.router.navigate(['/request-details/' + id]);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
