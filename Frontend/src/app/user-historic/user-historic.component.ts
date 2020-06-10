import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-historic',
  templateUrl: './user-historic.component.html',
  styleUrls: ['./user-historic.component.css'],
})
export class UserHistoricComponent implements OnInit {
  history: any = [];

  displayedColumns = ['ID do Pedido', 'Estado', 'Data do Exame', 'Resultado'];
  @Input() id: string;

  constructor(
    public rest: RestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getHistory(this.id);
  }

  getHistory(id) {
    this.history = [];
    this.rest.getHistory(id).subscribe((data: {}) => {
      console.log(data);
      this.history = data;
    });
  }
}
