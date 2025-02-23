import { Injectable } from '@angular/core';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  users: User[] = [
    new User(1, 'admin1@gmail.com', 'Admin@123'),
    new User(2, 'admin2@gmail.com', 'Admin@123'),
    new User(3, 'admin3@gmail.com', 'Admin@123'),
    new User(4, 'admin4@gmail.com', 'Admin@123'),
  ];
}
