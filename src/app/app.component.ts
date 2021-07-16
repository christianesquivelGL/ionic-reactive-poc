import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { TranslateService } from '@ngx-translate/core';

import { environment } from '../environments/environment';
import { Pages } from './interfaces/pages';
import { TranslateProvider } from './providers/translate/translate.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public appPages: Array<Pages>;

  constructor(
    private platform: Platform,
    private translate: TranslateProvider,
    private translateService: TranslateService,
    public router: Router,
    private storage: Storage,
  ) {
    this.appPages = [
      {
        title: 'Characters',
        url: '/character-setup',
        direct: 'root',
        icon: 'person',
      },
    ];

    this.initializeApp();
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
