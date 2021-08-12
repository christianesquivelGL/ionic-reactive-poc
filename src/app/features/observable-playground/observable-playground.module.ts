import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ObservablePlaygroundPageRoutingModule } from './observable-playground-routing.module';

import { ObservablePlaygroundPage } from './observable-playground.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ObservablePlaygroundPageRoutingModule
  ],
  declarations: [ObservablePlaygroundPage]
})
export class ObservablePlaygroundPageModule {}
