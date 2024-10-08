import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(public router: Router, private storage: Storage) {
    setTimeout(() => {
      this.router.navigateByUrl('login')
    }, 2000 );
   }

  async ngOnInit() {
    await this.storage.create();
    await this.storage.clear();
  }
}
