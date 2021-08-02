import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { TranslateService } from '@ngx-translate/core';
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
  ) {
    this.appPages = [
      {
        title: 'Characters',
        url: '/character',
        direct: 'root',
        icon: 'person',
      },
      {
        title: 'Favorites',
        url: '/favorites',
        direct: 'root',
        icon: 'star',
      },
    ];

    this.initializeApp();
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  initializeApp() {
    this.platform
      .ready()
      .then(async () => {
        await this.storage.create();

        this.translateService.setDefaultLang(environment.language);
        this.translateService.use(environment.language);
        this.translateService
          .getTranslation(environment.language)
          .subscribe((translations) => {
            this.translate.setTranslations(translations);
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
          });
      });
  }
}
