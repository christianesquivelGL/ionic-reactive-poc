import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { UntilDestroy } from '@ngneat/until-destroy';
import { select, Store } from '@ngrx/store';

import { CharacterService } from '../../../../providers/swapi/character.service';
import { CharacterState } from '../../state/character-reducer';
import * as fromCharacterActions from '../../state/character.actions';
import * as fromCharacterSelectors from '../../state/character.selectors';

@UntilDestroy()
@Component({
  selector: 'app-root-character',
  templateUrl: './root-character.component.html',
  styleUrls: ['./root-character.component.scss'],
})
export class RootCharacterComponent {
  list: Parse.Object[] = [];
  list$ = this.store.pipe(select(fromCharacterSelectors.getCharacterList));

  constructor(
    private loadingCtrl: LoadingController,
    private characterService: CharacterService,
    private store: Store<CharacterState>,
  ) {}

  ionViewWillEnter() {
    this.useStore();
  }

  async usePromiseService() {
    const loading = await this.loadingCtrl.create({
      message: 'Fetching Characters...',
      spinner: 'bubbles',
    });
    await loading.present();

    this.list = await this.characterService.getCharacters();
    loading.dismiss();
  }

  useStore() {
    this.store.dispatch(fromCharacterActions.fetchCharacters());
  }
}
