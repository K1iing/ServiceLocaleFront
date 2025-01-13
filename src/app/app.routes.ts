import { Routes } from '@angular/router';
import { AtendimentoshomeComponent } from './components/atendimentoshome/atendimentoshome.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {
        path: 'home',
        component: AtendimentoshomeComponent,
        canActivate: [authGuard], // Aplica o authGuard para proteger a rota
      },
      { path: '', component: LandingPageComponent },
      { path: '**', redirectTo: '' }
];
