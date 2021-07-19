import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RootCharacterComponent } from './root-character.component';

const routes: Routes = [
  {
    path: '',
    component: RootCharacterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RootCharacterComponentRoutingModule {}
