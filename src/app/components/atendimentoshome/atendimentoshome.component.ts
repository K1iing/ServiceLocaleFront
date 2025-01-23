import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-atendimentoshome',
  imports: [],
  templateUrl: './atendimentoshome.component.html',
  styleUrl: './atendimentoshome.component.css'
})
export class AtendimentoshomeComponent {
  constructor(private auth: AuthService, private router: Router, private http: HttpClient) {}

  

  nome: string = ""

  agendarAtendimentos() {
    this.router.navigate(['/agendar'])
  }


  enviarMeusAtendimentos() {
    this.router.navigate(['/meusatendimentos']);
  }

  public deslogar() {
    this.auth.logout();
    this.router.navigate(['/']);
  }


  public capitalizeFirstLetter(str: string): string {
    if (!str) return str; 
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  

  public pegarNome() {
    const token = this.auth.getToken();
    const email = localStorage.getItem("emailat")
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.get(`http://localhost:8080/cliente/${email}`, {headers: {
      'Authorization': `Bearer ${token}`
      
    },
    responseType: 'text'}).subscribe({
      next: (response) => {
        const nomeCompleto = response;
        const nomePrimeiro = nomeCompleto.split(" ")[0];  
        this.nome = this.capitalizeFirstLetter(nomePrimeiro); 
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  ngOnInit() {
    this.pegarNome(); 
  }

}

