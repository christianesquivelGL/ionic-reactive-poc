import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { FeedbackService } from '../../../../libs/feedback/feedback.service';
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
  ) {}

  async ionViewWillEnter() {
    const loading = await this.loadingCtrl.create({
      message: this.translateProvider.get('app.label.fetching'),
      spinner: 'bubbles',
    });
    this.loading = true;
    await loading.present();

    this.list = await this.planetsService.getPlanets();
    loading.dismiss();
    this.loading = false;
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
