import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthPageModule),
  },
  {
    path: 'home',
    redirectTo: 'character',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'character',
    loadChildren: () =>
      import('./features/character/character.module').then(
        (m) => m.CharacterModule,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'favorites',
    loadChildren: () =>
      import('./features/favorites/favorites.module').then(
        (m) => m.FavoritesModule,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'user-profile',
    loadChildren: () =>
      import('./features/user-profile/user-profile.module').then(
        (m) => m.UserProfilePageModule,
      ),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  providers: [AuthGuard],
  exports: [RouterModule],
})
export class AppRoutingModule {}
