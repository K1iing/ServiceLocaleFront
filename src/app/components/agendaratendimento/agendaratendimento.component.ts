import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Profissionais } from './Profissionais';

@Component({
  selector: 'app-agendaratendimento',
  imports: [],
  templateUrl: './agendaratendimento.component.html',
  styleUrl: './agendaratendimento.component.css'
})
export class AgendaratendimentoComponent {
  profissionais: Profissionais[] = [];

  constructor(private http: HttpClient, private auth: AuthService) {}


  private listaFuncionarios() {
    const token = this.auth.getToken();
    this.http.get<Profissionais[]>("http://localhost:8080/profissional", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).subscribe({
      next: (response) => {
        console.log(response);
        this.profissionais = response;
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  ngOnInit() {
    this.listaFuncionarios(); 
  }
}
