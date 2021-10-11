import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { NgxTippyModule } from 'ngx-tippy-wrapper';
import { SwiperModule } from 'swiper/angular';

import { ListCharacterComponent } from './components/list-character/list-character.component';
import { ViewCharacterComponent } from './components/view-character/view-character.component';
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
    TranslateModule.forChild(),
    NgxTippyModule,
    SwiperModule,
  ],
  declarations: [
    RootCharacterComponent,
    ListCharacterComponent,
    ViewCharacterComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CharacterModule {}
