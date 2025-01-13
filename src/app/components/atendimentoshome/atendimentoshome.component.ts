import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-atendimentoshome',
  imports: [],
  templateUrl: './atendimentoshome.component.html',
  styleUrl: './atendimentoshome.component.css'
})
export class AtendimentoshomeComponent {
  constructor(private auth: AuthService, private router: Router) {}

  public deslogar() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
