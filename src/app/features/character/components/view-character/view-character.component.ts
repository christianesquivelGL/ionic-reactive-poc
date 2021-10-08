import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { CharacterService } from 'src/app/providers/swapi/character.service';

@Component({
  selector: 'app-view-character',
  templateUrl: './view-character.component.html',
  styleUrls: ['./view-character.component.scss'],
})
export class ViewCharacterComponent {
  characterId = this.route.snapshot.paramMap.get('characterId');
  loading = false;
  selectedEntity = {} as Parse.Object;

  constructor(
    public route: ActivatedRoute,
    private characterService: CharacterService,
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
  }
}
