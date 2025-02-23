import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private userService: UserService) {}

  isLogged: boolean = false;

  login(email: string, password: string): boolean {
    const user = this.userService.users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      this.isLogged = true;
      return true;
    } else {
      this.isLogged = false;
      return false;
    }
  }

  logout(): void {
    this.isLogged = false;
  }

  isAuthenticated(): boolean {
    return this.isLogged;
  }

  signup(email: string, password: string): boolean {
    const userExists = this.userService.users.some(
      (user) => user.email === email
    );

    if (userExists) {
      return false;
    }

    this.userService.users.push(
      new User(this.userService.users.length + 1, email, password)
    );

    return true;
  }
}
