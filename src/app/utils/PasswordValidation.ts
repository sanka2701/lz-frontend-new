import {AbstractControl, FormControl} from '@angular/forms';
export class PasswordValidation {

  static matchPassword(input: AbstractControl) {
    if (!input || !input.controls) {
      return null;
    }

    console.log('INPUT', input);

    if (input.controls.password.value !== input.controls.confirmPassword.value) {
      return {passwordMismatch: true};
      // input.controls.password.setErrors( {passwordMismatch: true});
      // input.controls.confirmPassword.setErrors( {passwordMismatch: true});
    }

    // if (input.get('password').value !== input.get('confirmPassword').value) {
    //   return {passwordMismatch: true};
    // }

    // const password = input.get('password').value;
    // const confirmPassword = input.get('confirmPassword').value;
    // const password = input.root.controls.password.value;
    // const confirmPassword = input.root.controls.confirmPassword;
    //
    // console.log('password', password);
    // console.log('confirmPassword', confirmPassword)
    //
    // return password === confirmPassword ? null : {passwordMismatch: true};
    // if (password !== confirmPassword) {
    //   input.get('confirmPassword').setErrors( {passwordMismatch: true});
    // }
  }
}
