import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../canvasjs.min';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-requests-month',
  templateUrl: './requests-month.component.html',
  styleUrls: ['./requests-month.component.css'],
})
export class RequestsMonthComponent implements OnInit {
  requestsMonth: any;
  displayedColumns: string[] = ['Mês', 'Testes Realizados'];
  months: string[] = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  constructor(
    public rest: RestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.rest.getRequestsPerMonth().subscribe((data: any) => {
      this.requestsMonth = data;
      console.log('TESTES POR MES:', this.requestsMonth);
      let chartPoints = [];
      for (let i = 0; i < this.requestsMonth.length; i++) {
        chartPoints.push({
          y: this.requestsMonth[i].count,
          label: this.months[this.requestsMonth[i]._id - 1],
        });
      }
      let chart6 = new CanvasJS.Chart('chartContainer', {
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: 'Testes Realizados Por Mês',
        },
        data: [
          {
            type: 'column',
            dataPoints: chartPoints,
          },
        ],
      });

      chart6.render();
    });
  }
}
