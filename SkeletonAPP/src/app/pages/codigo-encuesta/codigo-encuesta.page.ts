import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-codigo-encuesta',
  templateUrl: './codigo-encuesta.page.html',
  styleUrls: ['./codigo-encuesta.page.scss'],
})
export class CodigoEncuestaPage implements OnInit {
  codigoForm = new FormGroup({
    codigo: new FormControl('', Validators.required),
  });
  constructor() {}

  ngOnInit() {}
}
