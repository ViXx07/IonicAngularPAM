import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  nombreUsuarioRecibido!: string;
  titulo= 'Home';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.nombreUsuarioRecibido = params['nombreUsuario'];
    })
  }

  
}
