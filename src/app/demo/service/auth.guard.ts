import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = !!localStorage.getItem('token');

  if (!isLoggedIn) {
    const router = inject(Router);
    router.navigate(['/auth/login']);
    return false;
  }

  return true;
};
