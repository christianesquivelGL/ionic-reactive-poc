import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CharacterSetupPageRoutingModule } from './character-setup-routing.module';

import { CharacterSetupPage } from './character-setup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CharacterSetupPageRoutingModule
  ],
  declarations: [CharacterSetupPage]
})
export class CharacterSetupPageModule {}
