import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {

  const authService = inject(AuthService); // Injeta o serviço de autenticação
  const router = inject(Router);// Injeta o roteador

  if(localStorage.getItem('novaSenha')) {
    localStorage.removeItem('novaSenha');
    return true;
  }

  if(localStorage.getItem('emailToken')) {
    localStorage.removeItem('emailToken');
    return true;
  }

  // Verifica se o usuário está autenticado
  if (authService.isAuthenticated()) {
    return true; // Permite o acesso à rota
  } else {
    // Redireciona para a página de login se não estiver autenticado
    router.navigate(['/']);
    return false;
  }
};
