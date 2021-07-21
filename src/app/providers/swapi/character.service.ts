import { Injectable } from '@angular/core';
import * as Parse from 'parse';
import { Observable, of } from 'rxjs';

import { CONSTANTS } from '../../app.constants';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private parseAppId: string = CONSTANTS.parseAppId;
  private parseJSKey: string = CONSTANTS.parseJSKey;
  private parseServerUrl: string = CONSTANTS.parseServerUrl;

  constructor() {
    this.parseInitialize();
  }

  public getCharacters(): Promise<any> {
    const obj = Parse.Object.extend('SWAPI_Character');
    const query = new Parse.Query(obj);

    return query.find();
  }

  public getCharactersObservableTest(): Observable<any> {
    const obj = Parse.Object.extend('SWAPI_Character');
    const query = new Parse.Query(obj);
    const res = query.find();

    return of(res);
  }

  private parseInitialize() {
    Parse.initialize(this.parseAppId, this.parseJSKey);
    (Parse as any).serverURL = this.parseServerUrl;
  }
}
