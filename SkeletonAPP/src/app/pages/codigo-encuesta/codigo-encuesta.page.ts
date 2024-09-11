import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-codigo-encuesta',
  templateUrl: './codigo-encuesta.page.html',
  styleUrls: ['./codigo-encuesta.page.scss'],
})
export class CodigoEncuestaPage implements OnInit {

  public codigoForm: FormGroup;

  constructor( 
    private formBuilder: FormBuilder
  ) {
    this.codigoForm = this.formBuilder.group({
      codigo: [undefined, Validators.required],
    });}

  ngOnInit() {
  }

}
