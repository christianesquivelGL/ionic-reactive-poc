import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { ListFavoritesComponent } from './components/list-favorites/list-favorites.component';
import { RootFavoritesComponentRoutingModule } from './containers/root-favorites/root-favorites-routing.module';
import { RootFavoritesComponent } from './containers/root-favorites/root-favorites.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    IonicModule,
    RootFavoritesComponentRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [RootFavoritesComponent, ListFavoritesComponent],
})
export class FavoritesModule {}
