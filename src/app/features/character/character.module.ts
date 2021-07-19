import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NgxTippyModule } from 'ngx-tippy-wrapper';

import { RootCharacterComponentRoutingModule } from './containers/root-character/root-character-routing.module';
import { RootCharacterComponent } from './containers/root-character/root-character.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    IonicModule,
    RootCharacterComponentRoutingModule,
    NgxTippyModule,
  ],
  declarations: [RootCharacterComponent],
})
export class CharacterModule {}
