import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newpassword',
  imports: [ReactiveFormsModule],
  templateUrl: './newpassword.component.html',
  styleUrl: './newpassword.component.css',
})
export class NewpasswordComponent {
  public form: FormGroup;
  public deuErro: boolean = false;
  public deuCerto: boolean = false;
  public campoVazio: boolean = false;
  public desabilitar: boolean = false;

  constructor(private http: HttpClient, private router: Router) {
    this.form = new FormGroup({
      senha: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(25),
      ]),
      confirmSenha: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(25),
      ]),
    });
  }

navegarComAtraso() {
  setTimeout(() => {
    this.router.navigate(['/']);
  }, 4000);
}

  testarConfirmacaoSenha() {

    const confirmSenhaData = this.form.get('confirmSenha')?.value;
    const senhaData = this.form.get('senha')?.value;
    const token = localStorage.getItem('tokenTrue');
    const email = localStorage.getItem('emailEnviar');    

    
    const dados = {
      token: { token: token },
      email: email,
      newPassword: senhaData
    }

    if (this.form.valid) {

      const headers = new HttpHeaders().set('Content-Type', 'application/json');

      if (confirmSenhaData === senhaData) {

        this.http.post('http://localhost:8080/email/resetPassword',dados, {headers, responseType: 'text'}).subscribe({
          next:(response) => {
            console.log(response);
            this.deuErro = false;
            this.deuCerto = true;
            this.campoVazio = false;
            this.desabilitar = true;
            this.navegarComAtraso();

          },
          error:(response) => {
            console.log(response)
            this.deuErro = true;
            this.deuCerto = false;
            this.campoVazio = false;

          }  
          
        })
      }
    } else {
      this.campoVazio = true;
      this.deuCerto = false;
      this.deuCerto = false;
    }

  }
}
