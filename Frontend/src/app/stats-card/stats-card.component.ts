import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.css'],
})
export class StatsCardComponent implements OnInit {
  average: number;
  totalTests: number;
  registeredUsers: number;
  infectedPercentage: number;

  constructor(
    public rest: RestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAverage();
  }

  getAverage() {
    this.rest.getAverageTests().subscribe((stats: any) => {
      this.average = stats.average;
      this.average = parseFloat(this.average.toFixed(2));
      this.totalTests = stats.requests;
      this.registeredUsers = stats.users;
    });
  }
}
