import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../canvasjs.min';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-requests-pie',
  templateUrl: './requests-pie.component.html',
  styleUrls: ['./requests-pie.component.css'],
})
export class RequestsPieComponent implements OnInit {
  requestsStateInfo: any;
  constructor(
    public rest: RestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.rest.getRequestsState().subscribe((data: any) => {
      this.requestsStateInfo = data;
      console.log('Estado pedidos:', this.requestsStateInfo);
      let chartPoints = [];

      for (let i = 0; i < this.requestsStateInfo.length; i++) {
        chartPoints.push({
          y: this.requestsStateInfo[i].count,
          name: this.requestsStateInfo[i]._id,
        });
      }
      console.log('PONTOS GRAFICO:', chartPoints);
      let chart5 = new CanvasJS.Chart('piechart5', {
        theme: 'light2',
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: 'Estado dos Pedidos',
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

      chart5.render();
    });
  }
}
