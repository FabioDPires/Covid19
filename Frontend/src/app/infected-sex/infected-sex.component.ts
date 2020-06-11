import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../canvasjs.min';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-infected-sex',
  templateUrl: './infected-sex.component.html',
  styleUrls: ['./infected-sex.component.css'],
})
export class InfectedSexComponent implements OnInit {
  infectedSex: any;
  constructor(
    public rest: RestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.rest.getInfectedSex().subscribe((data: any) => {
      this.infectedSex = data;
      let chart = new CanvasJS.Chart('piechart', {
        theme: 'light2',
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: 'Infetados Por Sexo',
        },
        data: [
          {
            type: 'pie',
            showInLegend: true,
            toolTipContent: '<b>{name}</b>: {y} (#percent%)',
            indexLabel: '{name} - #percent%',
            dataPoints: [
              {
                y: this.infectedSex.infectedMen,
                name: 'Masculino',
                color: '#1565C0',
              },
              {
                y: this.infectedSex.infectedWomen,
                name: 'Feminino',
                color: '#FF4081',
              },
            ],
          },
        ],
      });

      chart.render();
    });
  }
}
