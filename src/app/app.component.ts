import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { TranslateService } from '@ngx-translate/core';
import { NgxTippyService } from 'ngx-tippy-wrapper';
import { Subscription } from 'rxjs';

import { environment } from '../environments/environment';
import { Pages } from './interfaces/pages';
import { AuthService } from './providers/auth/auth.service';
import { TranslateProvider } from './providers/translate/translate.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  public appPages: Array<Pages>;
  public currentUser: Parse.User;
  public userSubscription: Subscription;

  constructor(
    private platform: Platform,
    private translate: TranslateProvider,
    private translateService: TranslateService,
    public router: Router,
    private storage: Storage,
    private authService: AuthService,
    private tippyService: NgxTippyService,
  ) {
    this.initializeApp();
  }

  ngOnDestroy() {
    // NOTE: Observable best practice
    this.userSubscription.unsubscribe();
  }

  setMenu() {
    this.appPages = [
      {
        title: this.translate.get('app.pages.characters.title'),
        url: '/character',
        direct: 'root',
        icon: 'person',
      },
      {
        title: this.translate.get('app.pages.favorites.title'),
        url: '/favorites',
        direct: 'root',
        icon: 'star',
      },
      {
        title: this.translate.get('app.pages.planets.title'),
        url: '/planets',
        direct: 'root',
        icon: 'planet',
      },
      {
        title: 'Observables',
        url: '/observable-playground',
        direct: 'root',
        icon: 'globe',
      },
    ];
  }

  initializeApp() {
    this.platform
      .ready()
      .then(async () => {
        // NOTE: Annonymous async function
        await this.storage.create();

        this.translateService.setDefaultLang(environment.language);
        this.translateService.use(environment.language);
        this.translateService
          .getTranslation(environment.language)
          .subscribe((translations) => {
            this.translate.setTranslations(translations);
            this.setMenu();
          });

        this.userSubscription = this.authService.cast.subscribe((user) => {
          this.currentUser = user;
        });
      })
      .catch(() => {
        this.translateService.setDefaultLang(environment.language);
        this.translateService.use(environment.language);
        this.translateService
          .getTranslation(environment.language)
          .subscribe((translations) => {
            this.translate.setTranslations(translations);
            this.setMenu();
          });
      });
  }
}
