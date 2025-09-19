import { Injectable, signal } from '@angular/core';
import { UserRecord } from '../Interface/user-record';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // isLoggedIn = signal<boolean>(JSON.parse(localStorage.getItem('isLoggedIn') || 'false'));

  // login(username: string, password: string): boolean {
  //   if (username === 'admin' && password === '1234') {
  //     this.isLoggedIn.set(true);
  //     localStorage.setItem('isLoggedIn', JSON.stringify(true));
  //     return true;
  //   }
  //   return false;
  // }

  // logOut(): void {
  //   this.isLoggedIn.set(false);
  //   localStorage.removeItem('isLoggedIn');
  // }

  // isAuthenticated(): boolean {
  //   return this.isLoggedIn();
  // }

  private storageKey = 'register_users';
  private loggedKey = 'logged_users';
  private users: UserRecord[] = [];

  constructor() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) this.users = JSON.parse(saved);
  }

  signup(
    username: string,
    email: string,
    password: string
  ): { ok: boolean; message?: string } {
    username = username.trim().toLowerCase();
    if (this.users.find((user) => user.username === username)) {
      return { ok: false, message: 'Username is already exists' };
    }

    const newUser: UserRecord = { username, email, password };
    this.users.push(newUser);
    localStorage.setItem(this.storageKey, JSON.stringify(this.users));
    return { ok: true };
  }

  login(username: string, password: string): boolean {
    username = username.trim().toLowerCase();
    const user = this.users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      localStorage.setItem(this.loggedKey, JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.loggedKey);
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem(this.loggedKey);
  }

  currentUser(): UserRecord | null {
    const raw = localStorage.getItem(this.loggedKey);
    return raw ? JSON.parse(raw) : null
  }

}
