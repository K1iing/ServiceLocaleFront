import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Atendimento } from './Atendimento';


@Component({
  selector: 'app-meu-atendimentos',
  imports: [],
  templateUrl: './meu-atendimentos.component.html',
  styleUrl: './meu-atendimentos.component.css',
})
export class MeuAtendimentosComponent {




  constructor(private http: HttpClient, private auth: AuthService, private changeDetector: ChangeDetectorRef) {

  }

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
          this.atendimentos = response
          this.changeDetector.detectChanges();
        },
        
        error: (response) => {
          console.log(response);
        },
      });
  }

  cancelar(id: number): void {
    const token = this.auth.getToken();

    console.log("Cancelando atendimento com ID: ", id);
    const cancelar = {
      status: "CANCELADO"
    }; 

    this.http.post(`http://localhost:8080/atendimentos/alterar/${id}`, cancelar, {
      headers: {
        Authorization: `Bearer ${token}`,
         'Content-Type': 'application/json',
      },
    }).subscribe({
      next: (response) => {
        console.log(response);
        this.receberAtendimentos();
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  ngOnInit() {
    this.receberAtendimentos(); 
  }
}
