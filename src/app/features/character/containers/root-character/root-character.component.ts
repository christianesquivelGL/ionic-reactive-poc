import { Component, ViewChild } from '@angular/core';
import { IonContent, LoadingController } from '@ionic/angular';
import { each, isEmpty, map } from 'lodash';

import { CONSTANTS } from '../../../../app.constants';
import { FeedbackService } from '../../../../libs/feedback/feedback.service';
import { AuthService } from '../../../../providers/auth/auth.service';
import { FavoritesService } from '../../../../providers/favorites/favorites.service';
import { CharacterService } from '../../../../providers/swapi/character.service';
import { TranslateProvider } from '../../../../providers/translate/translate.service';
import { ListCharacterComponent } from '../../components/list-character/list-character.component';
import { Character } from '../../models/character.model';

@Component({
  selector: 'app-root-character',
  templateUrl: './root-character.component.html',
  styleUrls: ['./root-character.component.scss'],
})
export class RootCharacterComponent {
  @ViewChild(IonContent) content: IonContent;
  @ViewChild(ListCharacterComponent) listComponent: ListCharacterComponent;

  list: Character[] = [];
  favoritesList: Parse.Object[] = [];
  searchCriteria = '';
  loading: boolean;
  noResults: boolean;
  useInfiniteScroll: boolean;
  page: number;
  lastPage: boolean;
  fetchingPage: boolean;
  ionRefresher = false;

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
      message: this.translateProvider.get('app.label.fetching'),
      spinner: 'bubbles',
    });
    await loading.present();
    this.favoritesList =
      await this.favoritesService.getFavoritesByCurrentUser();
    loading.dismiss();

    this.resetPagination();
    await this.search();
  }

  resetPagination(): any {
    this.useInfiniteScroll = false;
    this.fetchingPage = false;
    this.page = 0;
    this.lastPage = false;
  }

  async doRefresh(event) {
    this.ionRefresher = true;
    this.resetPagination();
    this.search();
    event.target.complete();
    this.ionRefresher = false;
  }

  async search(): Promise<any> {
    this.loading = !this.useInfiniteScroll && !this.ionRefresher;
    return new Promise(async (resolve, reject) => {
      this.characterService
        .getCharactersBySearchCriteria(
          this.page,
          CONSTANTS.settings.pageSize,
          this.searchCriteria,
        )
        .then((raw) => {
          if (this.useInfiniteScroll) {
            each(raw, async (entry) => {
              this.list.push(this.formatCharacter(entry as Character));
            });
          } else {
            this.list = map(raw, (entry: Character) =>
              this.formatCharacter(entry),
            );
          }

          this.loading = false;
          this.noResults = isEmpty(this.list);
          resolve(this.list);
        })
        .catch((err) => {
          console.error(err);
          this.loading = false;
          this.noResults = true;
          reject(err);
        });
    });
  }

  formatCharacter(entry: Character) {
    const matched = this.favoritesList.some(
      (el) =>
        el.get('user').id === this.authService.getCurrentUser().id &&
        el.get('SWAPI_Character').id === entry.id,
    );
    entry.isFavorite = matched;

    return entry;
  }

  async loadMore() {
    if (!this.fetchingPage) {
      this.useInfiniteScroll = true;
      this.fetchingPage = true;
      this.page++;
      this.search()
        .then((data) => {
          this.useInfiniteScroll = false;
          this.fetchingPage = false;
          this.listComponent.completeInfiniteScroll();
          if (data) {
            this.lastPage = data.length === 0;
          }
        })
        .catch((err) => {
          console.error(err);
          this.listComponent.completeInfiniteScroll();
        });
    }
  }

  clearSearchBar() {
    this.searchCriteria = '';
    this.scrollToTop();
    this.resetPagination();
    this.search();
  }

  scrollToTop() {
    this.content.scrollToTop(1500);
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
