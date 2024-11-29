/* app.component.ts */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import * as CanvasJS from 'canvasjs';
 
@Component({
  selector: 'app-grafico-empresa',
  templateUrl: './grafico-empresa.component.html',
  styleUrls: ['./grafico-empresa.component.scss'],
})
export class GraficoEmpresaComponent  implements OnInit {
  chartOptions = {
	  animationEnabled: true,
	  title: {
		text: "Sales by Department"
	  },
	  data: [{
		type: "pie",
		startAngle: -90,
		indexLabel: "{name}: {y}",
		yValueFormatString: "#,###.##'%'",
		dataPoints: [
		  { y: 14.1, name: "Toys" },
		  { y: 28.2, name: "Electronics" },
		  { y: 14.4, name: "Groceries" },
		  { y: 43.3, name: "Furniture" }
		]
	  }]
	}	

  ngOnInit() {
    const chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      title: {
        text: "Distribución de Usuarios por Rol"
      },
      data: [
        {
          type: "pie",
          showInLegend: true,
          toolTipContent: "<b>{name}</b>: {y} (#percent%)",
          indexLabel: "{name} - #percent%",
          dataPoints: [
            { y: 50, name: "Clientes" },
            { y: 30, name: "Admins Empresa" },
            { y: 20, name: "Admins Sistema" }
          ]
        }
      ]
    });

    chart.render();
  }
}  
