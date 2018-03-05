import {AbstractControl, AsyncValidatorFn, FormControl, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';
import {UserService} from '../services/user.service';
import {Constants} from './Constants';
import {Observable} from 'rxjs/Observable';

export class FormValidators {
  static matchPasswords(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = <AbstractControl>control.get('password');
      const confirmPassword = <AbstractControl>control.get('confirmPassword');
      return (password.touched && password.value !== confirmPassword.value) ? {passwordMismatch: true} : null;
    };
  }

  static usernameNotTaken(userService: UserService): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return Observable.of(null);
    };
  }

  static email(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const emailStr = control.value;
      const isValid = !emailStr || Constants.EMAIL_REGEXP.test(emailStr);
      return isValid ? null : {email : true};
    };
  }
}



export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = <AbstractControl>control.get('password');
    const confirmPassword = <AbstractControl>control.get('confirmPassword');
    return (password.touched && password.value !== confirmPassword.value) ? {passwordMismatch: true} : null;
  };
}

export class ParentErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = !!(form && form.submitted);
    const controlTouched = !!(control && (control.dirty || control.touched));
    const controlInvalid = !!(control && control.invalid);
    const parentInvalid = !!(control && control.parent && control.parent.invalid && (control.parent.dirty || control.parent.touched));

    return isSubmitted || (controlTouched && (controlInvalid || parentInvalid));
  }
}
