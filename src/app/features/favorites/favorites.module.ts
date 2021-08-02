import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NgxTippyModule } from 'ngx-tippy-wrapper';

import { RootFavoritesComponentRoutingModule } from './containers/root-favorites/root-favorites-routing.module';
import { RootFavoritesComponent } from './containers/root-favorites/root-favorites.component';
import { ListFavoritesComponent } from './components/list-favorites/list-favorites.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    IonicModule,
    RootFavoritesComponentRoutingModule,
  ],
  declarations: [RootFavoritesComponent, ListFavoritesComponent],
})
export class FavoritesModule {}
