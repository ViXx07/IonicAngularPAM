import { inject } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

export const auth = () => {

  const authService = inject(AuthService);
  const router = inject(Router)
  if (authService.isLoggedIn) {
    return true;
  }
  router.navigate(['login']);
  return false;
}