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

  public async getCharacters(): Promise<Parse.Object[]> {
    const obj = Parse.Object.extend('SWAPI_Character');
    const query = new Parse.Query(obj);
    query.ascending('name');
    query.include('homeworld');

    return query.find();
  }

  public async getCharactersObservable(): Promise<Observable<Parse.Object[]>> {
    const obj = Parse.Object.extend('SWAPI_Character');
    const query = new Parse.Query(obj);
    query.ascending('name');
    query.include('homeworld');

    return of(await query.find());
  }

  private parseInitialize() {
    Parse.initialize(this.parseAppId, this.parseJSKey);
    (Parse as any).serverURL = this.parseServerUrl;
  }
}
