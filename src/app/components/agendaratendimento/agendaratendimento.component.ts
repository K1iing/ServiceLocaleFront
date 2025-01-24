import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Profissionais } from './Profissionais';
import { FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators, } from '@angular/forms';


@Component({
  selector: 'app-agendaratendimento',
  imports: [ReactiveFormsModule],
  templateUrl: './agendaratendimento.component.html',
  styleUrl: './agendaratendimento.component.css'
})
export class AgendaratendimentoComponent {
  profissionais: Profissionais[] = [];
  listaVisivel = false;
  profissionalId: number | null = null

  public form: FormGroup;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.form = new FormGroup({
      selecao: new FormControl('', [Validators.required]),
      descricao: new FormControl('', [Validators.required]),
      data: new FormControl('', [Validators.required])
    })
  }


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


  testarAgendamento() {
    const infoData = {
      idProfissional: this.form.get('selecao')?.value,
      dataAgendada: this.form.get('data')?.value, 
      descricao: this.form.get('descricao')?.value 
    };

    console.log(infoData);
  }

  ngOnInit() {
    this.listaFuncionarios(); 
  }
}
