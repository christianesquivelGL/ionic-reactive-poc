import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { map } from 'lodash';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/providers/auth/auth.service';

import { FeedbackService } from '../../../../libs/feedback/feedback.service';
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
  list: Character[];
  // list: Observable<Parse.Object[]>;
  favoritesList: Parse.Object[];
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
    const loading = await this.loadingCtrl.create({
      message: 'Fetching Characters...',
      spinner: 'bubbles',
    });
    await loading.present();

    this.usingPromise();
    // this.usingObservable();

    loading.dismiss();
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
  }

  async addToFavorites(entry) {
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
