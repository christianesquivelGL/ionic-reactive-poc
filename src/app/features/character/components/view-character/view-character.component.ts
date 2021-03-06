import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { isEmpty } from 'lodash';
import { FeedbackService } from 'src/app/libs/feedback/feedback.service';
import { FavoritesService } from 'src/app/providers/favorites/favorites.service';
import { GiphyService } from 'src/app/providers/giphy/giphy.service';
import { ParseUtilsService } from 'src/app/providers/parse.utils.service';
import { CharacterService } from 'src/app/providers/swapi/character.service';
import { TranslateProvider } from 'src/app/providers/translate/translate.service';
import { SwiperOptions } from 'swiper';

import { Character } from '../../models/character.model';

@Component({
  selector: 'app-view-character',
  templateUrl: './view-character.component.html',
  styleUrls: ['./view-character.component.scss'],
})
export class ViewCharacterComponent {
  characterId = this.route.snapshot.paramMap.get('characterId');
  selectedEntity = {} as Character;

  loading = {
    entity: true,
    additionalRelations: true,
    mainImg: true,
    isFavorite: true,
  };
  swiperConfig: SwiperOptions = {
    slidesPerView: 2,
    spaceBetween: 20,
    // navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };

  constructor(
    public route: ActivatedRoute,
    private characterService: CharacterService,
    private parseUtilsService: ParseUtilsService,
    private loadingCtrl: LoadingController,
    private giphyService: GiphyService,
    private favoritesService: FavoritesService,
    private feedbackService: FeedbackService,
    private translateProvider: TranslateProvider,
  ) {}

  ionViewWillEnter() {
    this.fetch();
  }

  async fetch() {
    this.loading.entity = true;
    const res = await this.characterService.getCharacterById(this.characterId);

    if (!!res) {
      this.selectedEntity = await this.formatCharacter(res);
      this.loading.entity = false;

      this.loading.additionalRelations = true;
      this.selectedEntity.species =
        await this.parseUtilsService.getRelationList(
          this.selectedEntity.get('species'),
        );
      this.selectedEntity.starships =
        await this.parseUtilsService.getRelationList(
          this.selectedEntity.get('starships'),
        );
      this.selectedEntity.vehicles =
        await this.parseUtilsService.getRelationList(
          this.selectedEntity.get('vehicles'),
        );

      this.loading.additionalRelations = false;

      const isFavorite =
        await this.favoritesService.isCharacterFavoriteByCurrentUser(
          this.selectedEntity,
        );
      this.selectedEntity.isFavorite = !!isFavorite;
      this.loading.isFavorite = false;

      console.log('???? ~ this.selectedEntity', this.selectedEntity);
    }
  }

  formatCharacter(entry: Character): Promise<Character> {
    return new Promise((resolve, reject) => {
      entry.img = entry.get('imgUrl');
      if (isEmpty(entry.img)) {
        this.giphyService
          .getGifsByKeyword(entry.get('name'))
          .subscribe((result) => {
            // eslint-disable-next-line @typescript-eslint/dot-notation
            const firstRes = result['data'][0];
            entry.img = firstRes?.images.original.url || '';
          });
      }

      resolve(entry);
    });
  }

  async toggleAddToFavorites() {
    const loader = await this.loadingCtrl.create();
    loader.present();
    const res = await this.favoritesService.toggleAddToFavoriteCharacters(
      this.selectedEntity,
    );
    loader.dismiss();

    if (!!res) {
      this.selectedEntity.isFavorite = !this.selectedEntity.isFavorite;
      this.feedbackService.presentSimpleAlert(
        this.translateProvider.get(
          res === 'destroyed'
            ? 'app.pages.characters.favorites.removed'
            : 'app.pages.characters.favorites.added',
        ),
      );
    }
  }

  onImageLoad() {
    this.loading.mainImg = false;
  }

  onSwiper(swiper) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }
}
