import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../canvasjs.min';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-health-pie',
  templateUrl: './health-pie.component.html',
  styleUrls: ['./health-pie.component.css'],
})
export class HealthPieComponent implements OnInit {
  healthInfo: any;

  constructor(
    public rest: RestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.rest.getUsersHealth().subscribe((data: any) => {
      this.healthInfo = data;
      console.log('Saude Utilizadores:', this.healthInfo);
      let chartPoints = [];

      for (let i = 0; i < this.healthInfo.length; i++) {
        chartPoints.push({
          y: this.healthInfo[i].count,
          name: this.healthInfo[i]._id,
        });
      }
      console.log('PONTOS GRAFICO:', chartPoints);
      let chart3 = new CanvasJS.Chart('piechart3', {
        theme: 'light2',
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: 'Saúde dos Utilizadores',
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

      chart3.render();
    });
  }
}
