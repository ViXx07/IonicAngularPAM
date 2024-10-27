import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage {

  utils = inject(UtilsService);

  constructor(private storage: Storage) {
    setTimeout(() => {
      let rol = this.utils.getUserRole();
      this.utils.redireccionPorRol(rol);
    }, 2000);
  }

  async ngOnInit() {
    await this.storage.create();
    await this.storage.clear();
  }
}
