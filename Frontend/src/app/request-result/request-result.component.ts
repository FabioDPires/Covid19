import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-request-result',
  templateUrl: './request-result.component.html',
  styleUrls: ['./request-result.component.css'],
})
export class RequestResultComponent implements OnInit {
  @Input() requestData: any = { resultado: '' };
  constructor(
    public rest: RestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {}

  setResult() {
    console.log(this.requestData);
    const id = this.route.snapshot.params['id'];
    this.rest.setRequestResult(id, this.requestData).subscribe(
      (result) => {
        console.log('Correu bem');
        this.router.navigate(['/request-details/' + id]);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
