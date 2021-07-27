import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

import { CONSTANTS } from '../../app.constants';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
  ) {}

  async presentSimpleAlert(header?: string, message?: string) {
    const alert = await this.alertCtrl.create({
      header: header ?? header,
      message: message ?? message,
      buttons: ['Ok'],
    });
    await alert.present();
  }

  async showSimpleToast(message: string, color?: string) {
    const toast = await this.toastCtrl.create({
      position: 'top',
      duration: CONSTANTS.ionicComponentConfig.toast.duration,
      message,
      color: color || 'success',
      buttons: [
        {
          side: 'end',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });
    await toast.present();
  }

  async presentConfirm(
    header: any,
    message: any,
    cancelText: any,
    okText: any,
  ): Promise<string> {
    return new Promise(async (resolve) => {
      const alert = await this.alertCtrl.create({
        header,
        message,
        buttons: [
          {
            text: cancelText,
            role: 'cancel',
            handler: () => {
              resolve('cancel');
            },
          },
          {
            text: okText,
            handler: () => {
              resolve('ok');
            },
          },
        ],
      });
      alert.present();
    });
  }
}
