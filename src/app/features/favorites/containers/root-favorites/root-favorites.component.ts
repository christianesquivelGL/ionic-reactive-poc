import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { GiphyService } from 'src/app/providers/giphy/giphy.service';

import { FeedbackService } from '../../../../libs/feedback/feedback.service';
import { FavoritesService } from '../../../../providers/favorites/favorites.service';
import { TranslateProvider } from '../../../../providers/translate/translate.service';

@Component({
  selector: 'app-root-favorites',
  templateUrl: './root-favorites.component.html',
  styleUrls: ['./root-favorites.component.scss'],
})
export class RootFavoritesComponent {
  listCharacters: Parse.Object[] = [];
  loading: boolean;

  constructor(
    private loadingCtrl: LoadingController,
    private favoritesService: FavoritesService,
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

    this.listCharacters =
      await this.favoritesService.getFavoriteCharactersByCurrentUser();

    loading.dismiss();
    this.loading = false;
  }

  async toggleAddToFavorites(entry: Parse.Object) {
    const res = await this.favoritesService.toggleAddToFavoriteCharacters(
      entry.get('character'),
    );

    if (res) {
      this.feedbackService.presentSimpleAlert(
        this.translateProvider.get(
          res === 'destroyed'
            ? 'app.pages.characters.favorites.removed'
            : 'app.pages.characters.favorites.added',
        ),
      );
    }

    this.ionViewWillEnter();
  }
}
