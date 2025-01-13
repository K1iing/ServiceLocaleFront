import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService); // Injeta o serviço de autenticação
  const router = inject(Router);// Injeta o roteador

  // Verifica se o usuário está autenticado
  if (authService.isAuthenticated()) {
    return true; // Permite o acesso à rota
  } else {
    // Redireciona para a página de login se não estiver autenticado
    router.navigate(['/']);
    return false;
  }
};
