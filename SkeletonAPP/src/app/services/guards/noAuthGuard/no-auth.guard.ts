import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UtilsService } from '../../utils/utils.service';
import { FirebaseConfigService } from '../../fireBaseConfig/firebase-config.service';

export const noAuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const utils = inject(UtilsService);
  const firebase = inject(FirebaseConfigService);
  let userRole = utils.getUserRole();

  return new Promise((resolve) => {
    firebase.getAuth().onAuthStateChanged((auth) => {
      if (!userRole) {
        resolve(true);
      } else {
        utils.redireccionPorRol(userRole);
        resolve(false);
      }
    });
  });
};
