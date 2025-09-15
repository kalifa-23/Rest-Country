import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  isLoggedIn = signal<boolean>(JSON.parse(localStorage.getItem('isLoggedIn') || 'false'));

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === '1234') {
      this.isLoggedIn.set(true);
      localStorage.setItem('isLoggedIn', JSON.stringify(true));
      return true;
    }
    return false;
  }

  logOut(): void {
    this.isLoggedIn.set(false);
    localStorage.removeItem('isLoggedIn');
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn();
  }
}
