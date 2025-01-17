import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';


@Component({
  selector: 'app-cadastrar',
  imports: [ReactiveFormsModule],
  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.css',
})
export class CadastrarComponent {
  public form: FormGroup;
  public cadastroError = false;
  public cadastroSucesso = false;
  private clienteCadastro: boolean = false;

  constructor(
    private http: HttpClient,

  ) {
    this.form = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(25),
      ]),
      telefone: new FormControl('', [
        Validators.required,
        Validators.maxLength(11),
        Validators.minLength(9),
      ]),
      confirmacaosenha: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(25),
      ]),
      termos: new FormControl(false, [Validators.requiredTrue]),
    });
  }

  public limparFormulario() {
    this.form.reset();
  }

  public testarCadastro(): void {
    if (
      this.form.valid &&
      this.form.get('senha')?.value === this.form.get('confirmacaosenha')?.value
    ) {
      const cadastroDataCliente = {
        nome: this.form.get('nome')?.value,
        email: this.form.get('email')?.value,
        telefone: this.form.get('telefone')?.value,
        senha: this.form.get('senha')?.value,
      };

      const cadastroDataAutenticacao = {
        email: this.form.get('email')?.value,
        password: this.form.get('senha')?.value,
      };

      this.limparFormulario();
      this.cadastroSucesso = true;
      this.cadastroError = false;

      const apiUrlCliente = 'http://localhost:8080/cliente/cadastrar';
      const apiUrlAutenticacao = 'http://localhost:8080/auth/cadastrar';

      const headers = new HttpHeaders().set('Content-Type', 'application/json');

      this.http
        .post(apiUrlCliente, cadastroDataCliente, {
          headers,
          responseType: 'text',
        })
        .subscribe({
          next: () => {
            this.clienteCadastro = true;
          },
          error: (error) => {
            console.log(error, console.log('Deu erro no cliente'));
          },
        })
        .add(() => {
          if (this.clienteCadastro) {
            this.http
              .post(apiUrlAutenticacao, cadastroDataAutenticacao, {
                headers,
                responseType: 'text',
              })
              .subscribe({
                next: () => {
                  this.cadastroSucesso = true;
                  this.cadastroError = false;
                },
                error: (error) => {
                  console.log(error, console.log('Deu erro na autenticação'));
                },
              });
          }
        });
    } else {
      this.cadastroError = true;
      this.cadastroSucesso = false;
      console.log('Error');
    }
  }
}
