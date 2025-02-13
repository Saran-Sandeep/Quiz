import { Injectable } from '@angular/core';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  users: User[] = [
    new User(1, 'Saran1', 'admin1@gmail.com', 'admin123'),
    new User(2, 'Saran2', 'admin2@gmail.com', 'admin123'),
    new User(3, 'Saran3', 'admin3@gmail.com', 'admin123'),
    new User(4, 'Saran4', 'admin4@gmail.com', 'admin123'),
  ];
}
