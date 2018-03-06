import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ParentErrorStateMatcher, FormValidators} from '../../utils/FormValidators';
import {User} from '../../models/user.model';
import {Errors} from '../../models/errors.model';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  authForm: FormGroup;
  matcher = new ParentErrorStateMatcher();

  authType: String = '';
  title: String = '';
  errors: Errors = {errors: {}};
  isSubmitting = false;


  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.authForm = this.formBuilder.group({
      email   : ['', FormValidators.email()],
      username: ['', Validators.required, FormValidators.usernameNotTaken(this.userService)],
      passwords : this.formBuilder.group({
          password : ['', Validators.required],
          confirmPassword : ['', [Validators.required]]
      }, {
          validator: FormValidators.matchPasswords()
      })
    });
  }

  submitForm(newUser: User) {
    console.log('Passed in user', newUser);
    // this.isSubmitting = true;
    // this.errors = {errors: {}};
    //
    // const credentials = this.authForm.value;
    // this.userService
    //   .attemptAuth(this.authType, credentials)
    //   .subscribe(
    //     data => this.router.navigateByUrl('/'),
    //     err => {
    //       this.errors = err;
    //       this.isSubmitting = false;
    //     }
    //   );
  }
}
