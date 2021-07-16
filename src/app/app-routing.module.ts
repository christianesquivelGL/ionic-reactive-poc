import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'character-setup',
    pathMatch: 'full',
  },
  {
    path: 'character-setup',
    loadChildren: () =>
      import('./features/character-setup/character-setup.module').then(
        (m) => m.CharacterSetupPageModule,
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
