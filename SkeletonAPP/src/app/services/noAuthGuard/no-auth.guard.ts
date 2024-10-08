import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UtilsService } from '../utils/utils.service';
import { FirebaseConfigService } from '../fireBaseConfig/firebase-config.service';

export const noAuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const utils = inject(UtilsService);
  const firebase = inject(FirebaseConfigService);

  return new Promise((resolve) => {
    firebase.getAuth().onAuthStateChanged((auth) => {
      if (!auth) {
        resolve(true);
      } else {
        utils.routerlink('admin');
        resolve(false);
      }
    });
  });
};
