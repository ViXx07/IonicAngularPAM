import { Component, inject, Input, input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  @Input() titulo!: string;
  utils = inject(UtilsService);

  constructor() { }

  ngOnInit() {}

  usuario(): User {
    return this.utils.getFromLocalStorage('user');
  }

}
