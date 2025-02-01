import { Component } from '@angular/core';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PasswordValidator } from './password.validator';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-signup',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.css',
})
export class LoginSignupComponent {
  constructor(private router: Router) {}

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    // PasswordValidator.strongPassword
  ]);

  onSubmit(): void {
    if (this.emailFormControl.valid && this.passwordFormControl.valid) {
      const email = this.emailFormControl.value;
      const password = this.passwordFormControl.value;
      if (email === 'admin@gmail.com' && password === 'admin123') {
        this.router.navigateByUrl('landing-page');
      }
    } else {
      console.log('Form is invalid');
    }
  }
}
