import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ObservablePlaygroundPage } from './observable-playground.page';

const routes: Routes = [
  {
    path: '',
    component: ObservablePlaygroundPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ObservablePlaygroundPageRoutingModule {}
