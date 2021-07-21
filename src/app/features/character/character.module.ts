import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxTippyModule } from 'ngx-tippy-wrapper';

import { RootCharacterComponentRoutingModule } from './containers/root-character/root-character-routing.module';
import { RootCharacterComponent } from './containers/root-character/root-character.component';
import { characterReducer } from './state/character-reducer';
import { CharacterEffects } from './state/character.effects';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    IonicModule,
    RootCharacterComponentRoutingModule,
    NgxTippyModule,
    StoreModule.forFeature('character', characterReducer),
    EffectsModule.forFeature([CharacterEffects]),
  ],
  declarations: [RootCharacterComponent],
})
export class CharacterModule {}
