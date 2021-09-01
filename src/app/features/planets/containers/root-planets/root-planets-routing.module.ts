import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RootPlanetsComponent } from './root-planets.component';

const routes: Routes = [
  {
    path: '',
    component: RootPlanetsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RootPlanetsComponentRoutingModule {}
