import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Profissionais } from './Profissionais';
import { FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators, } from '@angular/forms';
import moment from 'moment'; 

@Component({
  selector: 'app-agendaratendimento',
  imports: [ReactiveFormsModule],
  templateUrl: './agendaratendimento.component.html',
  styleUrl: './agendaratendimento.component.css'
})
export class AgendaratendimentoComponent {
  profissionais: Profissionais[] = [];
  listaVisivel = false;
  profissionalId: number | null = null;
  nopassado = false;


  public form: FormGroup;
  erro = false;
  sucesso = false;

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

  formatarData(data: string): string {
    return moment(data).format('DD/MM/YYYY HH:mm:ss');
  }

  formularioLimpar() {
    this.form.reset();
  }

  enviarEmail() {

    const token = this.auth.getToken();
    const email = {
      email: localStorage.getItem("emailat")
    }

    this.http.post("http://localhost:8080/email/postConfirmationAtendimento", email, {headers: {
      'Authorization': `Bearer ${token}`
    }}).subscribe({
        next: (response) => {
          console.log(response + "Email Enviado");
        },
        error: (response) => {
          console.log(response + "Não enviado");
        }
    })
  }

  testarAgendamento() {
    const infoData = {
      idProfissional: this.form.get('selecao')?.value,
      dataAgendada: this.formatarData(this.form.get('data')?.value), 
      descricao: this.form.get('descricao')?.value 
    };

    const dataAgora = moment();
   
    const dataAtendimento = moment(infoData.dataAgendada, 'DD/MM/YYYY HH:mm:ss');
    


    if(dataAtendimento.isBefore(dataAgora, 'minute')) {
      console.log("A data agendada não pode ser no passado.");
      this.nopassado = true;
      this.erro = false;
      this.sucesso = false;
      return;
    } 

    const token = this.auth.getToken();
    const email = localStorage.getItem("emailat")

    this.http.post("http://localhost:8080/atendimentos", infoData, {headers: {
      'Authorization': `Bearer ${token}`
    }}).subscribe({
      next: (response) => {



        console.log(response)
        this.formularioLimpar();
        this.sucesso = true;
        this.erro = false;
        this.nopassado = false;
        this.enviarEmail()

      },
      error: (response) => {
        console.log(response)
        this.erro = true;
        this.nopassado = false;
        this.sucesso = false;
      }  
    })
  }

  ngOnInit() {
    this.listaFuncionarios(); 
  }
}
