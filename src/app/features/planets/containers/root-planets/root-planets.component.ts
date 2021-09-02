import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { map } from 'lodash';

import { FeedbackService } from '../../../../libs/feedback/feedback.service';
import { GiphyService } from '../../../../providers/giphy/giphy.service';
import { PlanetsService } from '../../../../providers/swapi/planets.service';
import { TranslateProvider } from '../../../../providers/translate/translate.service';
import { Planet } from '../../models/planet.model';

@Component({
  selector: 'app-root-planets',
  templateUrl: './root-planets.component.html',
  styleUrls: ['./root-planets.component.scss'],
})
export class RootPlanetsComponent {
  list: Planet[] = [];
  loading: boolean;

  constructor(
    private loadingCtrl: LoadingController,
    private planetsService: PlanetsService,
    private feedbackService: FeedbackService,
    private translateProvider: TranslateProvider,
    private gifyService: GiphyService,
  ) {}

  async ionViewWillEnter() {
    const loading = await this.loadingCtrl.create({
      message: this.translateProvider.get('app.label.fetching'),
      spinner: 'bubbles',
    });
    this.loading = true;
    await loading.present();

    const res = await this.planetsService.getPlanets();
    this.list = map(res, (entry: Planet) => this.addImageProperty(entry));
    loading.dismiss();
    this.loading = false;
  }

  addImageProperty(entry: Planet) {
    this.gifyService.getGifsByKeyword(entry.get('name')).subscribe((result) => {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      entry.img = result['data'][0];
    });

    return entry;
  }

  async toggleAddToPlanets(entry: Parse.Object) {
    // const res = await this.planetsService.toggleAddToFavoritePlanets(
    //   entry.get('SWAPI_Character'),
    // );
    // if (res) {
    //   this.feedbackService.presentSimpleAlert(
    //     this.translateProvider.get(
    //       res === 'destroyed'
    //         ? 'app.pages.characters.planets.removed'
    //         : 'app.pages.characters.planets.added',
    //     ),
    //   );
    // }
    // this.ionViewWillEnter();
  }
}
