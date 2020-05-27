import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-historic',
  templateUrl: './user-historic.component.html',
  styleUrls: ['./user-historic.component.css'],
})
export class UserHistoricComponent implements OnInit {
  history: any = [];

  constructor(
    public rest: RestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getHistory();
  }

  getHistory() {
    var idTemp = this.route.snapshot.params['id'];
    this.history = [];
    this.rest.getHistory(idTemp).subscribe((data: {}) => {
      console.log(data);
      this.history = data;
    });
  }
}
