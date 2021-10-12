import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ParseUtilsService } from 'src/app/providers/parse.utils.service';
import { CharacterService } from 'src/app/providers/swapi/character.service';
import SwiperCore from 'swiper';
import { Character } from '../../models/character.model';

@Component({
  selector: 'app-view-character',
  templateUrl: './view-character.component.html',
  styleUrls: ['./view-character.component.scss'],
})
export class ViewCharacterComponent {
  characterId = this.route.snapshot.paramMap.get('characterId');
  selectedEntity = {} as Character;
  fullyLoaded = false;

  constructor(
    public route: ActivatedRoute,
    private characterService: CharacterService,
    private parseUtilsService: ParseUtilsService,
    private loadingCtrl: LoadingController,
  ) {}

  ionViewWillEnter() {
    this.fetch();
  }

  async fetch() {
    const loader = await this.loadingCtrl.create();
    loader.present();
    this.selectedEntity = await this.characterService.getCharacterById(
      this.characterId,
    );
    loader.dismiss();

    if (!!this.selectedEntity) {
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

      this.fullyLoaded = true;
      console.log('🚀 ~ this.selectedEntity', this.selectedEntity);
    }
  }

  onSwiper(swiper) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }
}
