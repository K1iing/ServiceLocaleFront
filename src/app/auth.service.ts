import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'authToken';
  constructor() {}

  public setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  // Obtém o token do localStorage
  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Verifica se o usuário está autenticado
  public isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token; // Retorna true se o token existir
  }

  // Faz logout removendo o token
  public logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
