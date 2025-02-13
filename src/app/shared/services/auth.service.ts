import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private userService: UserService) {}

  isLogged: Boolean = false;

  login(email: string, password: string) {
    let user = this.userService.users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) this.isLogged = true;
    else this.isLogged = false;
  }

  logout() {
    this.isLogged = false;
  }

  isAuthenticated() {
    return this.isLogged;
  }
}
