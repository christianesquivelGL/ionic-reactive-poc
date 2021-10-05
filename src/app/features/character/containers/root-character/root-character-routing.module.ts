import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewCharacterComponent } from '../../components/view-character/view-character.component';
import { RootCharacterComponent } from './root-character.component';

const routes: Routes = [
  {
    path: '',
    component: RootCharacterComponent,
  },
  {
    path: 'view/:characterId',
    component: ViewCharacterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RootCharacterComponentRoutingModule {}
