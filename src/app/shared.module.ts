import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { ShowHidePasswordComponent } from './libs/show-hide-password/show-hide-password.component';

@NgModule({
  imports: [IonicModule],
  declarations: [ShowHidePasswordComponent],
  exports: [ShowHidePasswordComponent],
})
export class SharedModule {}
