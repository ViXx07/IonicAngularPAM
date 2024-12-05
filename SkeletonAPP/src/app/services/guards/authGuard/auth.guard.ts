import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UtilsService } from '../../utils/utils.service';
import { FirebaseConfigService } from '../../fireBaseConfig/firebase-config.service';

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const utils = inject(UtilsService);
  const firebase = inject(FirebaseConfigService);
  const localData = localStorage.getItem('user');
  
  return new Promise((resolve) => {
    firebase.auth.onAuthStateChanged((auth) => {
      if (auth) {
        if (localData) resolve(true);
      } else {
        utils.routerlink('login');
        resolve(false);
      }
    });
  });
};
