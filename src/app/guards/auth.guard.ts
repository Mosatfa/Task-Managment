import { AuthService } from './../services/auth.service';
import { CanActivateFn, Router } from '@angular/router';;
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  if (authService.isAuthenticated.getValue()) {
    return true // Allow access
  } else {
    router.navigate(['./logIn'])
    return false;
  }
};
