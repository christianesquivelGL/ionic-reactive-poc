import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { map } from 'lodash';

import { FeedbackService } from '../../../../libs/feedback/feedback.service';
import { AuthService } from '../../../../providers/auth/auth.service';
import { FavoritesService } from '../../../../providers/favorites/favorites.service';
import { CharacterService } from '../../../../providers/swapi/character.service';
import { TranslateProvider } from '../../../../providers/translate/translate.service';
import { Character } from '../../models/character.model';

@Component({
  selector: 'app-root-character',
  templateUrl: './root-character.component.html',
  styleUrls: ['./root-character.component.scss'],
})
export class RootCharacterComponent {
  list: Character[] = [];
  // list: Observable<Parse.Object[]>;
  favoritesList: Parse.Object[] = [];
  // favoritesList: Observable<Parse.Object[]>;

  constructor(
    private loadingCtrl: LoadingController,
    private characterService: CharacterService,
    private favoritesService: FavoritesService,
    private feedbackService: FeedbackService,
    private translateProvider: TranslateProvider,
    private authService: AuthService,
  ) {}

  async ionViewWillEnter() {
    this.usingPromise();
    // this.usingObservable();
  }

  async usingObservable() {
    // this.list = await this.characterService.getCharactersObservable();
    // this.favoritesList =
    //   await this.favoritesService.getFavoritesByCurrentUserObservable();
    // this.list.subscribe((v: Parse.Object) => {
    //   if (v.id === 'EY3gbE2taR') {
    //     console.log(JSON.stringify(v));
    //   }
    // });
    // this.list
    //   .pipe(
    //     tap((n) => {
    //       if (n.get('name') !== 'Ackbar') {
    //         throw new TypeError(`Value ${JSON.stringify(n)} is not Ackbar`);
    //       }
    //     }),
    //   )
    //   .subscribe(console.log);
  }

  async usingPromise() {
    const loading = await this.loadingCtrl.create({
      message: this.translateProvider.get('app.label.fetching'),
      spinner: 'bubbles',
    });
    await loading.present();

    const raw = await this.characterService.getCharacters();
    this.favoritesList =
      await this.favoritesService.getFavoritesByCurrentUser();

    this.list = map(raw, (entry: Character) => {
      const matched = this.favoritesList.some(
        (el) =>
          el.get('user').id === this.authService.getCurrentUser().id &&
          el.get('SWAPI_Character').id === entry.id,
      );
      entry.isFavorite = matched;

      return entry;
    });

    loading.dismiss();
  }

  async toggleAddToFavorites(entry: Character) {
    const res = await this.favoritesService.toggleAddToFavorites(entry);

    if (res) {
      entry.isFavorite = !entry.isFavorite;
      this.feedbackService.presentSimpleAlert(
        this.translateProvider.get(
          res === 'destroyed'
            ? 'app.pages.characters.favorites.removed'
            : 'app.pages.characters.favorites.added',
        ),
      );
    }
  }
}
