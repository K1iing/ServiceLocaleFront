import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';



@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {

  public formGroup: FormGroup;

  constructor(private http: HttpClient, private router: Router) {
    this.formGroup = new FormGroup({
      email: new FormControl("", [Validators.email, Validators.required]),
      senha: new FormControl("", [Validators.required, Validators.maxLength(25), Validators.minLength(8)])
    });
  } 

  public limparFormulario(): void {
    this.formGroup.reset();
  }


  public testarLogin(): void {
    const apiUrl = 'http://localhost:8080/auth/logar'; // URL da API
    const loginData = {
      email: this.formGroup.get('email')?.value,
      password: this.formGroup.get('senha')?.value, // Mudando 'senha' para 'password'
    };
  
    // Configurações de cabeçalho
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
  
    // Envia os dados de login no formato JSON e recebe a resposta como texto
    this.http.post(apiUrl, loginData, { headers, responseType: 'text' }).subscribe({
      next: (response) => { 
        localStorage.setItem('token', response);
        this.router.navigate(['/home']);  // O token será recebido como texto
        this.limparFormulario();
      },
      error: (error) => {
        console.error('Erro ao realizar login:', error);
        this.limparFormulario();
      },
    });
  }

  public getWithToken(): void {
    const apiUrl = 'http://localhost:8080/auth'; // URL da API
  
    // Token Bearer fornecido
    const token = localStorage.getItem('token');
  
    // Configuração do cabeçalho com o Bearer token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    // Requisição GET com o token no cabeçalho
    this.http.get(apiUrl, { headers }).subscribe({
      next: (response) => {
        console.log('Resposta do GET:', response);
      },
      error: (error) => {
        console.error('Erro ao fazer GET:', error);
      }
    });
  
  }
}




