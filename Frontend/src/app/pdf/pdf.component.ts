import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css'],
})
export class PdfComponent implements OnInit {
  file: any;
  error: any;
  @Input() requestData: any = { resultado: '' };
  constructor(
    public rest: RestService,
    private route: ActivatedRoute,
    public router: Router,
    public http: HttpClient
  ) {}

  ngOnInit(): void {}

  onFileSelected(e) {
    console.log(e.target.files);
    this.file = (e.target.files || [])[0];
  }

  handleSubmit(e) {
    e.preventDefault();
    const id = this.route.snapshot.params['id'];
    let dataResultObject: any = null;
    dataResultObject = {
      resultado: this.requestData.resultado,
    };
    const formData = new FormData();
    formData.append('pdf', this.file);
    if (this.file != undefined) {
      this.rest.setRequestResult(id, dataResultObject).subscribe(
        (result) => {
          this.http
            .put(
              'http://localhost:3000/api/v1/events/5ecfb9c85eaa8fc5aef8a70a/pdf',
              formData
            )
            .subscribe(() => {
              window.location.reload();
            });

          //window.location.reload();
        },
        (err) => {
          console.log('ERRO:', err);
          this.error = err.error;
        }
      );

      /* this.http
        .put(
          'http://localhost:3000/api/v1/events/5ecfb9c85eaa8fc5aef8a70a/pdf',
          formData
        )
        .subscribe(() => {
          this.rest.setRequestResult(id, dataResultObject).subscribe(
            (result) => {
              window.location.reload();
            },
            (err) => {
              console.log(err);
            }
          );
        });*/
    } else {
      this.rest.setRequestResult(id, dataResultObject).subscribe(
        (result) => {
          window.location.reload();
        },
        (err) => {
          console.log('ERRO:', err);
          this.error = err.error;
        }
      );
    }
  }
}
