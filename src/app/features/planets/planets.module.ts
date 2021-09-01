import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { ListPlanetsComponent } from './components/list-planets/list-planets.component';
import { RootPlanetsComponentRoutingModule } from './containers/root-planets/root-planets-routing.module';
import { RootPlanetsComponent } from './containers/root-planets/root-planets.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    IonicModule,
    RootPlanetsComponentRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [RootPlanetsComponent, ListPlanetsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PlanetsModule {}
