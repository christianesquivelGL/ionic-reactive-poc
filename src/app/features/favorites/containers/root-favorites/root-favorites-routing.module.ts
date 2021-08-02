import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RootFavoritesComponent } from './root-favorites.component';

const routes: Routes = [
  {
    path: '',
    component: RootFavoritesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RootFavoritesComponentRoutingModule {}
