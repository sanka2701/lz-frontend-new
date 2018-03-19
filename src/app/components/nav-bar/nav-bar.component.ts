import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {TranslateService} from '@ngx-translate/core';
import {DateAdapter} from '@angular/material';
import {Constants} from '../../utils/Constants';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  currentLang: string;
  currentUser: User;

  constructor(
    private userService: UserService,
    private translateService: TranslateService,
    private dateAdapter: DateAdapter<any>
  ) {
    this. currentUser = {username: 'Sanka', role: 'ADMIN'} as User;
    // this.userService.currentUser
    //   .subscribe(
    //     userData => this.currentUser = userData
    //   );
    this.currentLang = this.translateService.currentLang;
  }

  getUser() {
    console.log(this.currentUser);
  }

  logout() {
    this.userService.purgeAuth();
    this.getUser();
  }

  changeLanguage(language: string): void {
    this.translateService.use(language);
    this.currentLang = language;
    this.dateAdapter.setLocale(Constants.LOCALE_MAP[language]);
  }
}
