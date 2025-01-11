import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {

  public formGroup: FormGroup;

  constructor() {
    this.formGroup = new FormGroup({
      email: new FormControl("", [Validators.email, Validators.required]),
      senha: new FormControl("", [Validators.required, Validators.maxLength(25), Validators.minLength(8)])
    });
  } 

  public limparFormulario(): void {
    this.formGroup.reset();
  }

  public receberFormulario(): void {
    const emailControl = this.formGroup.get('email');
    const senhaControl = this.formGroup.get('senha');
    if (emailControl && senhaControl) {
      const nome = emailControl.value;
      const senha = senhaControl.value;
      console.log('Email recebido:', nome);
      console.log("Senha recebida", senha);
      this.limparFormulario();
    } else {
      console.error('O controle "email" ou a "senha" não foi encontrado ou está nulo.');
    }
  }
  
}




