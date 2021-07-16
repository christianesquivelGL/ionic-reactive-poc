import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CharacterSetupPage } from './character-setup.page';

const routes: Routes = [
  {
    path: '',
    component: CharacterSetupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharacterSetupPageRoutingModule {}
