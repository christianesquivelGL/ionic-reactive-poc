import { Injectable } from '@angular/core';
import * as Parse from 'parse';
import { Observable, of } from 'rxjs';

import { CONSTANTS } from '../../app.constants';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private parseAppId: string = CONSTANTS.parseAppId;
  private parseJSKey: string = CONSTANTS.parseJSKey;
  private parseServerUrl: string = CONSTANTS.parseServerUrl;

  constructor(private authService: AuthService) {
    this.parseInitialize();
  }

  public getFavoriteCharactersByCurrentUser(): Promise<Parse.Object[]> {
    const obj = Parse.Object.extend('FavoriteCharacters');
    const query = new Parse.Query(obj);
    query.equalTo('user', this.authService.getCurrentUser());
    query.include('SWAPI_Character');
    query.include('SWAPI_Character.homeworld');

    return query.find();
  }

  public async toggleAddToFavoriteCharacters(entry: Parse.Object<Parse.Attributes>) {
    const obj = Parse.Object.extend('FavoriteCharacters');
    const row = new obj();
    row.set('user', this.authService.getCurrentUser());
    row.set('SWAPI_Character', entry);

    const query = new Parse.Query(obj);
    query.equalTo('user', this.authService.getCurrentUser());
    query.equalTo('SWAPI_Character', entry);

    const res = await query.first();
    if (res) {
      await res.destroy();
      return 'destroyed';
    } else {
      return row.save();
    }
  }

  private parseInitialize() {
    Parse.initialize(this.parseAppId, this.parseJSKey);
    (Parse as any).serverURL = this.parseServerUrl;
  }
}
