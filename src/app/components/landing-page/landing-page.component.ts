import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  imports: [],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

  alerta(): void {
    alert("Ola Mundo, Você Clicou");
  }

  semSaibaMais(): void {
    alert("Ainda não temos o Saiba Mais");
  }
}
