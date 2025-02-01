import { AbstractControl, ValidationErrors } from '@angular/forms';

export class PasswordValidator {
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

    return isValid ? null : { strongPassword: true };
  }
}
