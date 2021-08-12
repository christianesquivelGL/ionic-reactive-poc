import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  LoadingController,
  MenuController,
  ToastController,
} from '@ionic/angular';
import { FeedbackService } from '../../libs/feedback/feedback.service';

import { CONSTANTS } from '../../app.constants';
import { AuthService } from '../../providers/auth/auth.service';
import { TranslateProvider } from '../../providers/translate/translate.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public translate: TranslateProvider,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private menucCtrl: MenuController,
    public toastCtrl: ToastController,
    private feedbackService: FeedbackService,
  ) {}

  ionViewWillEnter() {
    this.menucCtrl.close();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.pattern(CONSTANTS.regex.email)],
      ],
      name: [''],
      lastName: [''],
    });
    this.form.setValue({
      email: this.authService.getCurrentUser().get('email'),
      name: this.authService.getCurrentUser().get('name'),
      lastName: this.authService.getCurrentUser().get('lastName'),
    });
  }

  async submit() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    await this.authService.updateUserData({
      name: this.form.get('name').value,
      lastName: this.form.get('lastName').value,
      email: this.form.get('email').value,
    });
    loading.dismiss();

    this.feedbackService.showSimpleToast(
      this.translate.get('app.pages.auth.update.success'),
    );
  }
}
