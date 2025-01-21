import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Atendimento } from './Atendimento';

@Component({
  selector: 'app-meu-atendimentos',
  imports: [],
  templateUrl: './meu-atendimentos.component.html',
  styleUrl: './meu-atendimentos.component.css',
})
export class MeuAtendimentosComponent {
  constructor(private http: HttpClient, private auth: AuthService) {}

  atendimentos: Atendimento[] = [];

  receberAtendimentos() {
    const email = localStorage.getItem('emailat');
    const token = this.auth.getToken();

    this.http
      .get<Atendimento[]>(`http://localhost:8080/atendimentos/email/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .subscribe({
        next: (response) => {
          console.log(response);
          this.atendimentos = response;

        },
        
        error: (response) => {
          console.log(response);
        },
      });
  }

  ngOnInit() {
    this.receberAtendimentos(); 
  }
}
