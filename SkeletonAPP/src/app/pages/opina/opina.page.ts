import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-opina',
  templateUrl: './opina.page.html',
  styleUrls: ['./opina.page.scss'],
})


export class OpinaPage implements OnInit{
    
    enojados: number = 0;
    neutrales: number = 0;
    felices: number = 0;

    constructor() { }

    ngOnInit() { 
        const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('#emoji input');
        const updateValue = (evento: Event): void => {
            const estado = evento.target as HTMLInputElement;
            document.querySelector('#estado')!.innerHTML = estado.value;
        };
        
        inputs.forEach((elemento: HTMLInputElement) => elemento.addEventListener('click', (evento: Event) => updateValue(evento)));
        
    }

    resultado() {
    
    const resultado: string = (document.querySelector('input[name="emoji"]:checked') as HTMLInputElement).value;

    switch (resultado) {

        case 'Enojado':
            this.enojados += 1;
            document.getElementById("enojados")!.innerHTML = this.enojados.toString();
            break;
        case 'Neutral':
            this.neutrales += 1;
            document.getElementById("neutrales")!.innerHTML = this.neutrales.toString();
            break;
        case 'Feliz':
            this.felices += 1;
            document.getElementById("felices")!.innerHTML = this.felices.toString();
            break;    
        default: 
            break;
      }
  };
}
