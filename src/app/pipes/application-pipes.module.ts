import { NgModule } from '@angular/core';

import { CloudinaryPipe } from './cloudinary.pipe';
import { MomentPipe } from './moment.pipe';

@NgModule({
  imports: [],
  declarations: [CloudinaryPipe, MomentPipe],
  exports: [CloudinaryPipe, MomentPipe],
})
export class ApplicationPipesModule {}
