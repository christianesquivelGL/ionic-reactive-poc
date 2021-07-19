import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { CharacterService } from '../../../../providers/swapi/character.service';

@Component({
  selector: 'app-root-character',
  templateUrl: './root-character.component.html',
  styleUrls: ['./root-character.component.scss'],
})
export class RootCharacterComponent {
  list: Parse.Object[] = [];

  constructor(
    private loadingCtrl: LoadingController,
    private characterService: CharacterService,
  ) {}

  async ionViewWillEnter() {
    const loading = await this.loadingCtrl.create({
      message: 'Fetching Characters...',
      spinner: 'bubbles',
    });
    await loading.present();

    this.list = await this.characterService.getCharacters();
    loading.dismiss();
  }
}
