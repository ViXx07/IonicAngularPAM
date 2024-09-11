import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recordar-contrasena',
  templateUrl: './recordar-contrasena.page.html',
  styleUrls: ['./recordar-contrasena.page.scss'],
})
export class RecordarContrasenaPage implements OnInit {
  public emailForm: FormGroup;

  constructor( 
    private formBuilder: FormBuilder
  ) {
    this.emailForm = this.formBuilder.group({
      email: [undefined, Validators.required],
    });}

  ngOnInit() {
  }

}
