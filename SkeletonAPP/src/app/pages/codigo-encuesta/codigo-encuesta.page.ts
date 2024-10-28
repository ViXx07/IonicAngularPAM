import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-codigo-encuesta',
  templateUrl: './codigo-encuesta.page.html',
  styleUrls: ['./codigo-encuesta.page.scss'],
})
export class CodigoEncuestaPage {
  codigoForm = new FormGroup({
    codigo: new FormControl('', [
      Validators.required,
      Validators.minLength(20),
      Validators.maxLength(20),
    ]),
  });
}
