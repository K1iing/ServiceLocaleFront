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
  selector: 'app-tokentrue',
  imports: [ReactiveFormsModule],
  templateUrl: './tokentrue.component.html',
  styleUrl: './tokentrue.component.css',
})
export class TokentrueComponent {
  public form: FormGroup;

  constructor(private http: HttpClient, private route: Router) {
    this.form = new FormGroup({
      token: new FormControl('', [
        Validators.required,
        Validators.minLength(36),
        Validators.maxLength(37),
      ]),
    });
  }

  testarToken() {
    if (this.form.valid) {
      const tokenData = this.form.get('token')?.value;

      console.log(tokenData);

      const headers = new HttpHeaders().set('Content-Type', 'application/json');

      this.http 
        .post(
          'http://localhost:8080/postToken',
          JSON.stringify(tokenData),
          {
            headers,
            responseType: 'text',
          }
        )
        .subscribe({
          next: (response: string) => console.log(response),
          error: (response: string) => console.log(response),
        });
    }
  }
}
