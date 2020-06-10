import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.css'],
})
export class StatsCardComponent implements OnInit {
  infectedUsers: number;
  average: number;
  totalTests: number;
  registeredUsers: number;
  infectedPercentage: number;
  finishedTests: number;

  constructor(
    public rest: RestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getNumberOfInfected();
    this.getAverage();
    this.getFinishedTests();
  }

  getNumberOfInfected() {
    this.rest.getInfectedNumber().subscribe((infected: number) => {
      this.infectedUsers = infected;
      console.log('Utilizadores infectados:', this.infectedUsers);
    });
  }

  getAverage() {
    this.rest.getAverageTests().subscribe((stats: any) => {
      this.average = stats.average;
      this.average = parseFloat(this.average.toFixed(2));
      this.totalTests = stats.requests;
      this.registeredUsers = stats.users;
    });
  }

  getFinishedTests() {
    this.rest.getfinishedTests().subscribe((finished: number) => {
      this.finishedTests = finished;
    });
  }
}
