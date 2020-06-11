import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../canvasjs.min';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-infected-age',
  templateUrl: './infected-age.component.html',
  styleUrls: ['./infected-age.component.css'],
})
export class InfectedAgeComponent implements OnInit {
  infectedAge: any;
  constructor(
    public rest: RestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.rest.getInfectedAge().subscribe((data: any) => {
      this.infectedAge = data;
      console.log('INFECTADOS IDADE:', this.infectedAge);
      let chartPoints = [];

      for (let i = 0; i < this.infectedAge.length; i++) {
        chartPoints.push({
          y: this.infectedAge[i].count,
          name: this.infectedAge[i]._id,
        });
      }
      console.log('PONTOS GRAFICO:', chartPoints);
      let chart2 = new CanvasJS.Chart('piechart2', {
        theme: 'light2',
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: 'Infetados Por Faixa Etária',
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

      chart2.render();
    });
  }
}
