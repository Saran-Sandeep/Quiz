import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static strongPassword(control: AbstractControl): ValidationErrors | null {
    const password: string = control.value;
    if (!password) {
      return null;
    }

    const hasSpace = / /.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumeric = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isValid =
      hasUpperCase && hasLowerCase && hasNumeric && hasSpecial && !hasSpace;

    const validationErrors: ValidationErrors = {
      hasUpperCase: !hasUpperCase,
      hasLowerCase: !hasLowerCase,
      hasNumeric: !hasNumeric,
      hasSpecial: !hasSpecial,
      hasSpace: hasSpace,
    };
    return isValid ? null : validationErrors;
  }

  static matchPasswords(control: AbstractControl): ValidationErrors | null {
    const confirmPassword = control.value;
    const password = control.parent?.get('password')?.value;
    if (!password) return { noPassword: true };
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
}
