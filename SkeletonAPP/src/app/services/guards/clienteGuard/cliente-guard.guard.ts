import { CanActivateFn } from '@angular/router';
import { UtilsService } from '../../utils/utils.service';
import { inject } from '@angular/core';

export const clienteGuard: CanActivateFn = (route, state) => {
  const utils = inject(UtilsService);

  return new Promise((resolve) => {
    let rol = utils.getUserRole();
      if (rol === 1) {
        resolve(true);
      } else {
        utils.redireccionPorRol(rol);
        resolve(false);
      }
  });
};
