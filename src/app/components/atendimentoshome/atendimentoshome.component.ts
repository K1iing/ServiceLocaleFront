import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-atendimentoshome',
  imports: [],
  templateUrl: './atendimentoshome.component.html',
  styleUrl: './atendimentoshome.component.css'
})
export class AtendimentoshomeComponent {
  constructor(private auth: AuthService, private router: Router, private http: HttpClient) {}

  public deslogar() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  nome: string = ""

  public pegarNome() {
    const token = this.auth.getToken();
    const email = localStorage.getItem("emailat")

    this.http.get(`http://localhost:8080/cliente/${email}`, {headers: {
      'Authorization': `Bearer ${token}`
      
    },
    responseType: 'text'}).subscribe({
      next: (response) => {
        const nomeCompleto = response;
        const nomePrimeiro = nomeCompleto.split(" ")[0];  // Divide a string e pega o primeiro nome
        this.nome = nomePrimeiro;
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  ngOnInit() {
    this.pegarNome();  // Chama a função para pegar o nome quando o componente é inicializado
  }

}

