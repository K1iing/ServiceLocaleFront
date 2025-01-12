import { Routes } from '@angular/router';
import { AtendimentoshomeComponent } from './components/atendimentoshome/atendimentoshome.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

export const routes: Routes = [
    {path: 'home', component: AtendimentoshomeComponent},
    { path: '**', redirectTo: '' },
    { path: '', component: LandingPageComponent }
];
