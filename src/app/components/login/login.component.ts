import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.loginForm = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  attemptLogin(credentials) {
    console.log('Credentials', credentials);
    this.userService
      .attemptAuth(true, credentials)
      .subscribe(
        data => this.router.navigateByUrl('/home'),
        err => {
          console.log('Login failed with: ', err);
        }
    );
  }
}
