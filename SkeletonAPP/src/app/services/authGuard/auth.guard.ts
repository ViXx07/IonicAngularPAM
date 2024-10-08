import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UtilsService } from '../utils/utils.service';
import { FirebaseConfigService } from '../fireBaseConfig/firebase-config.service';

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const localData = localStorage.getItem('user');
  const utils = inject(UtilsService);
  const firebase = inject(FirebaseConfigService);

  return new Promise((resolve) => {
    firebase.getAuth().onAuthStateChanged((auth) => {
      if (auth) {
        if (localData) resolve(true);
      } else {
        utils.routerlink('login');
        resolve(false);
      }
    });
  });
};
