import { Injectable } from '@angular/core';
import { isEmpty } from 'lodash';
import * as Parse from 'parse';
import { Observable, of } from 'rxjs';

import { CONSTANTS } from '../../app.constants';

@Injectable({
  providedIn: 'root',
})
export class PlanetsService {
  private parseAppId: string = CONSTANTS.parseAppId;
  private parseJSKey: string = CONSTANTS.parseJSKey;
  private parseServerUrl: string = CONSTANTS.parseServerUrl;

  constructor() {
    this.parseInitialize();
  }

  public async getPlanets(): Promise<Parse.Object[]> {
    const obj = Parse.Object.extend('SWAPI_Planets');
    const query = new Parse.Query(obj);
    query.ascending('name');

    return query.find();
  }

  private parseInitialize() {
    Parse.initialize(this.parseAppId, this.parseJSKey);
    (Parse as any).serverURL = this.parseServerUrl;
  }
}
