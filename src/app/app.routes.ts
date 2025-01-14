import { Routes } from '@angular/router';
import { AtendimentoshomeComponent } from './components/atendimentoshome/atendimentoshome.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { authGuard } from './auth.guard';
import { CadastrarComponent } from './components/cadastrar/cadastrar.component';

export const routes: Routes = [
    {
        path: 'home',
        component: AtendimentoshomeComponent,
        canActivate: [authGuard],
      },

      { 
        path: 'cadastrar', 
        component: CadastrarComponent // Rota liberada para todos, sem authGuard
        },

      { path: '', component: LandingPageComponent },
      { path: "**", redirectTo: ""}
      
];
