import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { isEmpty } from 'lodash';
import * as Parse from 'parse';
import { BehaviorSubject, Observable } from 'rxjs';

import { CONSTANTS } from '../../app.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // NOTE: Observable of current user
  public cast: Observable<Parse.User>;

  private parseAppId: string = CONSTANTS.parseAppId;
  private parseJSKey: string = CONSTANTS.parseJSKey;
  private parseServerUrl: string = CONSTANTS.parseServerUrl;
  private currentUser = new BehaviorSubject<Parse.User>(null);

  constructor(private storage: Storage) {
    this.parseInitialize();
    this.currentUser.next(this.getCurrentUser());
    this.cast = this.currentUser.asObservable();
  }

  public getCurrentUser() {
    return Parse.User.current();
  }

  public login(params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const query = new Parse.Query(Parse.User);
      query.equalTo('email', params.email);
      query.first().then(
        async (user) => {
          if (isEmpty(user)) {
            reject('User not found');
          } else {
            Parse.User.logIn(user.get('username'), params.password)
              .then((loggedInUser) => {
                if (loggedInUser.get('blocked')) {
                  reject('User is currently blocked');
                }
                const userToken = loggedInUser.getSessionToken();
                this.storage.set('userToken', userToken);
                // NOTE: Setting current user to the observable stream
                this.currentUser.next(this.getCurrentUser());

                resolve(loggedInUser);
              })
              .catch((err) => reject(err));
          }
        },
        (error) => {
          reject('Error trying to sign in');
        },
      );
    });
  }

  public automaticLogin(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage
        .get('userToken')
        .then((userToken) => {
          if (!isEmpty(userToken)) {
            // Try to log in with token authentication
            Parse.User.become(userToken).then(
              (user) => {
                if (user.get('blocked')) {
                  reject('User is currently blocked');
                } else {
                  // NOTE: Setting current user to the observable stream
                  this.currentUser.next(this.getCurrentUser());

                  resolve(user);
                }
              },
              (error) => {
                console.log('error ', error);
                reject(error);
              },
            );
          } else {
            reject('No User Token');
          }
        })
        .catch((err) => reject(err));
    });
  }

  public signOut(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage
        .clear()
        .then(() => Parse.User.logOut())
        .then((res) => {
          // NOTE: Setting the observable stream
          this.currentUser.next(null);

          resolve(res);
        })
        .catch((err) => {
          console.warn(err);
          reject(err);
        });
    });
  }

  private parseInitialize() {
    Parse.initialize(this.parseAppId, this.parseJSKey);
    (Parse as any).serverURL = this.parseServerUrl;
  }
}
