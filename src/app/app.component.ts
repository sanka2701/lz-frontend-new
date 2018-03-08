import {Component, HostBinding, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {OverlayContainer} from '@angular/cdk/overlay';
import {UserService} from './services/user.service';
import {MatIconRegistry} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @HostBinding('class') componentCssClass;

  constructor(
    public matIconRegistry: MatIconRegistry,
    private userService: UserService,
    private translateService: TranslateService,
    private overlayContainer: OverlayContainer
  ) {
    // todo - consider using mat-icon - not exactly necessary
    this.matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
    this.translateService = translateService;
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
  }

  ngOnInit(): void {
    this.userService.populate();
    // todo: subscribe to some kind of source
    const effectiveTheme = 'black-theme';
    // const effectiveTheme = 'light-theme';

    this.componentCssClass = effectiveTheme;
    const classList = this.overlayContainer.getContainerElement().classList;
    const toRemove = Array.from(classList).filter((item: string) =>
      item.includes('-theme')
    );
    classList.remove(...toRemove);
    classList.add(effectiveTheme);
  }
}
