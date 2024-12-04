import { Component, Input, OnInit } from '@angular/core';
import { Empresa } from 'src/app/models/empresa.model';
import { Encuesta } from 'src/app/models/encuesta.model';

@Component({
  selector: 'app-generar-qr',
  templateUrl: './generar-qr.component.html',
  styleUrls: ['./generar-qr.component.scss'],
})
export class GenerarQrComponent {
  @Input() empresa: Empresa;
  @Input() encuesta: Encuesta;

}
