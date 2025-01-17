import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-esquecisenha',
  imports: [ReactiveFormsModule],
  templateUrl: './esquecisenha.component.html',
  styleUrl: './esquecisenha.component.css'
})
export class EsquecisenhaComponent {

  public form: FormGroup;
  formularioError = false;
  formularioSucess = false;
  checandoEmail: boolean = false;
  

  constructor(private http: HttpClient) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)])
    });
  }

  limparFormulario() {
    this.form.reset();
  }

  checarEmail() {
    this.checandoEmail = true;
    this.formularioError = false;
    this.formularioSucess = false;
  }

  testarRecuperacao() {
    
    this.checarEmail();

    const loginData = { 
       email: this.form.get('email')?.value
    }

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    if (this.form.valid) {

      this.http.post('http://localhost:8080/email', loginData, {headers, responseType: 'text'} ).subscribe({
        next: (response) => {
          console.log('Email enviado com sucesso:', response);
          this.limparFormulario();
          this.formularioSucess = true;
          this.checandoEmail = false;
          this.formularioError = false;
        },
        error: (error) => {
          console.error('Erro ao enviar email:', error);
          this.formularioError = true;  
          this.formularioSucess = false;
          this.checandoEmail = false;
        },
      });
    } else {
      console.error('O formulário está inválido');
      this.formularioError = true;
      this.formularioSucess = false;
      this.checandoEmail = false;

    }
  }

  
}
