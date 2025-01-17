import { Routes } from '@angular/router';
import { AtendimentoshomeComponent } from './components/atendimentoshome/atendimentoshome.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { authGuard } from './auth.guard';
import { CadastrarComponent } from './components/cadastrar/cadastrar.component';
import { EsquecisenhaComponent } from './components/esquecisenha/esquecisenha.component';
import { TokentrueComponent } from './components/tokentrue/tokentrue.component';

export const routes: Routes = [
  {
    path: 'home',
    component: AtendimentoshomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'cadastrar',
    component: CadastrarComponent, // Rota liberada para todos, sem authGuard
  },
  {
    path: 'token',
    component: TokentrueComponent,
  },
  {
    path: 'recuperarsenha',
    component: EsquecisenhaComponent, // Rota liberada para todos, sem authGuard
  },

  { path: '', component: LandingPageComponent },
  { path: '**', redirectTo: '' },
];
