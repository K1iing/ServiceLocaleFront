import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tokentrue',
  imports: [ReactiveFormsModule],
  templateUrl: './tokentrue.component.html',
  styleUrl: './tokentrue.component.css',
})
export class TokentrueComponent {
  public form: FormGroup;
  deuErro = false;
  estaVazio = false;

  constructor(private http: HttpClient, private route: Router) {
    this.form = new FormGroup({
      token: new FormControl(''),
    });
  }

  limparFormulario() {
    this.form.reset();
  }


  testarToken() {
    if (this.form.valid) {
      
      const tokenData = {
        token: this.form.get('token')?.value,
      };

      if (!tokenData.token || tokenData.token.trim() === '') {
        this.estaVazio = true;
        return;
      }

      const headers = new HttpHeaders().set('Content-Type', 'application/json');

      this.http
        .post('http://localhost:8080/email/postToken', tokenData, {
          headers,
          responseType: 'text',
        })
        .subscribe({
          next: (response) => {
            if (response === 'Token validado com sucesso') {
              localStorage.setItem('token', tokenData.token);
              this.route.navigate(['/novaSenha']);
            }
          },
          error: () => {
            console.error('Erro ao enviar email:');
            this.deuErro = true;
            this.estaVazio = false;
            this.limparFormulario();
          },
        });
    } else {
      this.estaVazio = true;
    }
  }
}
