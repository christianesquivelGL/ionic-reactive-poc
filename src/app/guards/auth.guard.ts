import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { isEmpty } from 'lodash';
import { Observable } from 'rxjs';

import { AuthService } from '../providers/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    public menuCtrl: MenuController,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (isEmpty(this.authService.getCurrentUser())) {
      this.navCtrl.navigateRoot('login');
      return false;
    } else {
      this.menuCtrl.enable(true);
      return true;
    }
  }
}
