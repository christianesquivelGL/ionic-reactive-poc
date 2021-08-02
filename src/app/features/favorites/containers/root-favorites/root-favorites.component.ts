import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { FavoritesService } from '../../../../providers/favorites/favorites.service';

@Component({
  selector: 'app-root-favorites',
  templateUrl: './root-favorites.component.html',
  styleUrls: ['./root-favorites.component.scss'],
})
export class RootFavoritesComponent {
  list: Parse.Object[];

  constructor(
    private loadingCtrl: LoadingController,
    private favoritesService: FavoritesService,
  ) {}

  async ionViewWillEnter() {
    const loading = await this.loadingCtrl.create({
      message: 'Fetching Favorites...',
      spinner: 'bubbles',
    });
    await loading.present();

    this.list = await this.favoritesService.getFavoritesByCurrentUser();
    loading.dismiss();
  }
}
