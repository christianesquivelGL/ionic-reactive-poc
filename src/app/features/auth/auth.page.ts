import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

import { AuthService } from '../../providers/auth/auth.service';

@Component({
  selector: 'app-auth',
  template: '',
})
export class AuthPage implements OnInit {
  constructor(
    public router: Router,
    private menuCtrl: MenuController,
    public authService: AuthService,
  ) {}

  ngOnInit() {
    this.authService
      .automaticLogin()
      .then(() => {
        this.menuCtrl.enable(true);
        this.router.navigate(['/home']);
      })
      .catch(async () => {
        this.router.navigate(['/login']);
      });
  }
}
