import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../canvasjs.min';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-results-pie',
  templateUrl: './results-pie.component.html',
  styleUrls: ['./results-pie.component.css'],
})
export class ResultsPieComponent implements OnInit {
  requestsResultsInfo: any;
  constructor(
    public rest: RestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.rest.getRequestResults().subscribe((data: any) => {
      this.requestsResultsInfo = data;
      console.log('Resultado pedidos:', this.requestsResultsInfo);
      let chartPoints = [];

      for (let i = 0; i < this.requestsResultsInfo.length; i++) {
        chartPoints.push({
          y: this.requestsResultsInfo[i].count,
          name: this.requestsResultsInfo[i]._id,
        });
      }
      console.log('PONTOS GRAFICO:', chartPoints);
      let chart4 = new CanvasJS.Chart('piechart4', {
        theme: 'light2',
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: 'Resultado dos Pedidos',
        },
        data: [
          {
            type: 'pie',
            showInLegend: true,
            toolTipContent: '<b>{name}</b>: {y} (#percent%)',
            indexLabel: '{name} - #percent%',
            dataPoints: chartPoints,
          },
        ],
      });

      chart4.render();
    });
  }
}
