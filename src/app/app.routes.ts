import { Routes } from '@angular/router';
import { AtendimentoshomeComponent } from './components/atendimentoshome/atendimentoshome.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { authGuard } from './auth.guard';
import { CadastrarComponent } from './components/cadastrar/cadastrar.component';
import { EsquecisenhaComponent } from './components/esquecisenha/esquecisenha.component';
import { TokentrueComponent } from './components/tokentrue/tokentrue.component';
import { NewpasswordComponent } from './components/newpassword/newpassword.component';
import { MeuAtendimentosComponent } from './components/meu-atendimentos/meu-atendimentos.component';
import { AgendaratendimentoComponent } from './components/agendaratendimento/agendaratendimento.component';

export const routes: Routes = [
  {
    path: 'home',
    component: AtendimentoshomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'agendar',
    component: AgendaratendimentoComponent,
    canActivate: [authGuard],
  },
  {
    path: 'meusatendimentos',
    component: MeuAtendimentosComponent,
    canActivate: [authGuard],
  },
  {
    path: 'cadastrar',
    component: CadastrarComponent,
  },
  {
    path: 'token',
    component: TokentrueComponent,
    canActivate: [authGuard],
  },
  {
    path: 'recuperarsenha',
    component: EsquecisenhaComponent, 
  },

  {
    path: 'novasenha',
    component: NewpasswordComponent,
    canActivate: [authGuard],
  },

  { path: '', component: LandingPageComponent },
  { path: '**', redirectTo: '' },
];
