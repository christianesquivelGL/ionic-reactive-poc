import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  MenuController,
  ToastController,
} from '@ionic/angular';

import { CONSTANTS } from '../../app.constants';
import { FeedbackService } from '../../libs/feedback/feedback.service';
import { AuthService } from '../../providers/auth/auth.service';
import { TranslateProvider } from '../../providers/translate/translate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  onLoginForm: FormGroup;

  constructor(
    public translate: TranslateProvider,
    public authService: AuthService,
    public router: Router,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private feedbackService: FeedbackService,
  ) {}

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true);
  }

  ngOnInit() {
    this.authService.signOut();
    this.onLoginForm = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.pattern(CONSTANTS.regex.email)],
      ],
      password: ['', Validators.required],
    });
  }

  async submit() {
    const loader = await this.loadingCtrl.create();
    loader.present();

    this.authService
      .login(this.onLoginForm.value)
      .then(() => {
        loader.dismiss();
        this.goToHome();
      })
      .catch((err) => {
        console.error(err);
        loader.dismiss();
        this.alertInvalidCredentials();
      });
  }

  alertInvalidCredentials() {
    this.feedbackService.presentSimpleAlert(
      this.translate.get('app.pages.auth.invaliduser'),
      this.translate.get('app.pages.auth.retrycredentials'),
    );
  }

  validateEmail(email) {
    const re = CONSTANTS.regex.email;
    return re.test(email);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
}
