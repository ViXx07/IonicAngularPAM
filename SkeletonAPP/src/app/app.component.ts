import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  paginas = [
    {titulo: 'Login', url: '/login', icono: 'menu-outline'},
    {titulo: 'Home', url: '/home', icono: 'person-outline'},
    {titulo: 'Admin', url: '/admin', icono: 'layers-outline'},
  ]
  
router = inject(Router);
rutaActual = '';

ngOnInit() {
  this.router.events.subscribe((event: any) =>{
    if(event?.url) this.rutaActual = event.url; 
  })
}

  /*constructor(public router: Router) {
    this.initializeApp();
  }

  initializeApp(){
    this.router.navigateByUrl('splash')
  };*/
}
