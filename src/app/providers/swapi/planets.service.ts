import { Injectable } from '@angular/core';
import * as Parse from 'parse';

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
    return Parse.Cloud.run('v1_getPlanets');
  }

  private parseInitialize() {
    Parse.initialize(this.parseAppId, this.parseJSKey);
    (Parse as any).serverURL = this.parseServerUrl;
  }
}
