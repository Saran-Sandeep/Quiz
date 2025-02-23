import { Component, signal, ViewChild } from '@angular/core';
import {
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  FormGroupDirective,
  ValidatorFn,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CustomValidators } from './cutsom-validators.validator';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-signup',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.css',
})
export class LoginSignupComponent {
  isLogin = signal(true);
  signupForm!: FormGroup;
  loginForm!: FormGroup;

  @ViewChild(FormGroupDirective) formDirective!: FormGroupDirective;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly snackBar: MatSnackBar
  ) {
    if (
      !this.router ||
      !this.authService ||
      !this.formBuilder ||
      !this.snackBar
    ) {
      throw new Error(
        'One or more required dependencies are null or undefined.'
      );
    }

    const strongPasswordValidator: ValidatorFn[] = [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
      CustomValidators.strongPassword,
    ];

    this.signupForm = this.formBuilder.group({
      email: this.formBuilder.control<string>('', [
        Validators.required,
        Validators.email,
      ]),
      password: this.formBuilder.control<string>('', strongPasswordValidator),
      confirmPassword: this.formBuilder.control<string>('', [
        Validators.required,
        CustomValidators.matchPasswords,
      ]),
    });

    this.loginForm = this.formBuilder.group({
      email: this.formBuilder.control<string>('', [
        Validators.required,
        Validators.email,
      ]),
      password: this.formBuilder.control<string>('', [Validators.required]),
    });
  }

  /**
   * Handles the login form submission.
   *
   * Validates the form, attempts login, and navigates on success.
   * Displays error messages on failure.
   */
  onLoginSubmit(): void {
    if (this.loginForm.valid) {
      const loginEmail: string | null = this.loginForm.get('email')?.value;
      const loginPassword: string | null =
        this.loginForm.get('password')?.value;

      // Attempt to login
      if (loginEmail && loginPassword) {
        this.authService.login(loginEmail, loginPassword);

        // If successful, navigate to the landing page
        if (this.authService.isAuthenticated()) {
          this.router.navigateByUrl('landing-page');
        } else {
          // If unsuccessful, reset the form and display an error message
          this.formDirective.resetForm();
          this.openSnackBar('Incorrect email or password', 'Close');
        }
      } else {
        // If the form is invalid, display an error message
        this.openSnackBar('Login unsuccessful (form is invalid)', 'Close');
      }
    } else {
      // If the form is invalid, display an error message
      this.openSnackBar('Login unsuccessful (form is invalid)', 'Close');
    }
  }

  toggleIsLogin(): void {
    this.isLogin.update((value) => !value);
  }

  /**
   * Handles the signup form submission.
   *
   * Validates the form, attempts signup, and navigates on success.
   * Displays error messages on failure.
   *
   * @param signupEmail Email address to use for signup
   * @param signupPassword Password to use for signup
   * @returns Whether the signup is successful
   */
  onSignupSubmit(): void {
    if (this.signupForm.invalid) {
      this.openSnackBar('Signup form is invalid', 'Close');
      return;
    }

    const signupEmail = this.signupForm.get('email')?.value as string;
    const signupPassword = this.signupForm.get('password')?.value as string;

    if (this.authService.signup(signupEmail, signupPassword)) {
      this.toggleIsLogin();
      this.openSnackBar('Signup successful', 'Close');
    } else {
      this.formDirective.resetForm();
      this.openSnackBar(
        'Email already exists! Please use a different email.',
        'Close'
      );
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
