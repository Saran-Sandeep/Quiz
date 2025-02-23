import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static strongPassword(control: AbstractControl): ValidationErrors | null {
    const password: string = control.value;
    if (!password) {
      return null;
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumeric = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecial;

    const validationErrors: ValidationErrors = {
      hasUpperCase: !hasUpperCase,
      hasLowerCase: !hasLowerCase,
      hasNumeric: !hasNumeric,
      hasSpecial: !hasSpecial,
    };

    return isValid ? null : validationErrors;
  }

  static matchPasswords(control: AbstractControl): ValidationErrors | null {
    const confirmPassword = control.value;
    const password = control.parent?.get('signupPassword')?.value;
    if (!password) return null;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
}
