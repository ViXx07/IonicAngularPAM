/* app.component.ts */
import { Component } from '@angular/core';

@Component({
  selector: 'app-grafico-empresa',
  templateUrl: './grafico-empresa.component.html',
  styleUrls: ['./grafico-empresa.component.scss'],
})
export class GraficoEmpresaComponent {
  chartOptions = {
    animationEnabled: true,
    title: {
      text: 'Sales by Department',
    },
    data: [
      {
        type: 'pie',
        startAngle: -90,
        indexLabel: '{name}: {y}',
        yValueFormatString: "#,###.##'%'",
        dataPoints: [
          { y: 14.1, name: 'Toys' },
          { y: 28.2, name: 'Electronics' },
          { y: 14.4, name: 'Groceries' },
          { y: 43.3, name: 'Furniture' },
        ],
      },
    ],
  };
}
