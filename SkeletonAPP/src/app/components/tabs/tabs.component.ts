import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit{

  @Output() actionTriggered = new EventEmitter<string>();
  router: boolean;
  @Input() tabsInput!: {icono: string, nombre: string}[];
  tabs = [];

  ngOnInit() {
    if (this.tabsInput){
      this.tabs = this.tabsInput;
    }
  }

  filtrar(nombre: string) {
    switch(nombre){
      case 'Todos': {
        this.actionTriggered.emit('2');
        break;
      }
      case 'Aprobados': {
        this.actionTriggered.emit('0');
        break;
      }
      case 'En espera': {
        this.actionTriggered.emit('1');
        break;
      }
    }
  }

}