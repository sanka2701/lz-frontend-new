import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {Errors} from "../../models/errors.model";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authForm: FormGroup;

  authType: String = '';
  title: String = '';
  errors: Errors = {errors: {}};
  isSubmitting = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.authForm = this.formBuilder.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {
    // this.route.url.subscribe(data => {
    //   // Get the last piece of the URL (it's either 'login' or 'register')
    //   this.authType = data[data.length - 1].path;
    //   // Set a title for the page accordingly
    //   this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
    //   // add form control for username if this is the register page
    //   if (this.authType === 'register') {
    //     this.authForm.addControl('username', new FormControl());
    //   }
    // });
  }

  submitForm(newUser: User) {
    console.log("Passed in user", newUser);
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
