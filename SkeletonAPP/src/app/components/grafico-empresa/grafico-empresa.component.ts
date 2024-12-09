import { Component, inject, Input, OnInit } from '@angular/core';
import { where } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { Empresa } from 'src/app/models/empresa.model';
import { FirebaseConfigService } from 'src/app/services/fireBaseConfig/firebase-config.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-grafico-empresa',
  templateUrl: './grafico-empresa.component.html',
  styleUrls: ['./grafico-empresa.component.scss'],
})
export class GraficoEmpresaComponent implements OnInit {

  firebase = inject(FirebaseConfigService);
  utils = inject(UtilsService);

  @Input() empresa: any;

  enojados: number = 0;
  tristes: number = 0;
  felices: number = 0;

  private subscriptions: Subscription[] = [];

  chartOptions = {
    backgroundColor: 'transparent',
    animationEnabled: true,
    title: {
      text: '',
    },
    data: [
      {
        type: 'pie',
        startAngle: -90,
        indexLabel: '{name}: {y}',
        yValueFormatString: "#,###.##",
        dataPoints: [
          { y: this.enojados, name: '😡' },
          { y: this.tristes, name: '😢' },
          { y: this.felices, name: '😊' },
        ],
      },
    ],
  };

  async ngOnInit() {
    const loading = await this.utils.loading();
    await loading.present();

    if (this.empresa && this.empresa.id) {
      try {
        await Promise.all([
          this.getTipoOpinion(this.empresa, '1'),
          this.getTipoOpinion(this.empresa, '2'),
          this.getTipoOpinion(this.empresa, '3')
        ]).finally(() => {
          loading.dismiss();
        });
        this.updateChart();
      } catch (error) {
        console.error('Error en las consultas:', error);
      }
    } else {
      console.error('La empresa no está definida en el componente hijo.');
    }
  }

  getTipoOpinion(empresa: Empresa, idOpinion: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const path = `empresas/${empresa.id}/respuestas`;
      const query = where('tipoDeOpinion', '==', idOpinion); 

      const sub = this.firebase.getCollectionData(path, query).subscribe({
        next: (res: any[]) => {
          if (idOpinion === '1') {
            this.felices = res.length;
          }
          if (idOpinion === '2') {
            this.tristes = res.length;
          }
          if (idOpinion === '3') {
            this.enojados = res.length;
          }
          resolve();

        },
        error: (err) => {
          console.error('Error fetching empresa:', err);
          reject(err);
        },
      });

      this.subscriptions.push(sub);
    });
  }

  private updateChart() {
    if (this.enojados >= 0 && this.tristes >= 0 && this.felices >= 0) {
      this.chartOptions = {
        backgroundColor: 'transparent',
        animationEnabled: true,
        title: {
          text: 'Resultados de la encuesta:',
        },
        data: [
          {
            type: 'pie',
            startAngle: -90,
            indexLabel: '{name}: {y}',
            yValueFormatString: "#,###.##",
            dataPoints: [
              { y: this.enojados, name: '😡' },
              { y: this.tristes, name: '😢' },
              { y: this.felices, name: '😊' },
            ],
          },
        ],
      };
    }
  }
  

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
