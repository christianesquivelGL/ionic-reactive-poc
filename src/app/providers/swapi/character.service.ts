import { Injectable } from '@angular/core';
import { isEmpty } from 'lodash';
import * as Parse from 'parse';
import { Observable, of } from 'rxjs';

import { CONSTANTS } from '../../app.constants';
import { GiphyService } from '../giphy/giphy.service';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private parseAppId: string = CONSTANTS.parseAppId;
  private parseJSKey: string = CONSTANTS.parseJSKey;
  private parseServerUrl: string = CONSTANTS.parseServerUrl;

  constructor(public giphyService: GiphyService) {
    this.parseInitialize();
  }

  public async getCharacters(): Promise<Parse.Object[]> {
    const obj = Parse.Object.extend('SWAPI_Character');
    const query = new Parse.Query(obj);
    query.ascending('name');
    query.include('homeworld');

    return query.find();
  }

  public async getCharactersBySearchCriteria(
    page: number,
    pageSize: number,
    searchCriteria: any,
  ): Promise<Parse.Object[]> {
    const obj = Parse.Object.extend('SWAPI_Character');
    let query = new Parse.Query(obj);

    if (!isEmpty(searchCriteria)) {
      const name = new Parse.Query(obj);
      name.matches('name', searchCriteria, 'i');

      // const eyeColor = new Parse.Query(obj);
      // name.matches('eyeColor', searchCriteria, 'i');

      const planet = Parse.Object.extend('SWAPI_Planet');
      const planetQuery = new Parse.Query(planet);
      planetQuery.matches('name', searchCriteria, 'i');
      const characterByHomeworld = new Parse.Query(obj);
      characterByHomeworld.matchesQuery('homeworld', planetQuery);

      query = Parse.Query.or(name, characterByHomeworld);
    }

    query.ascending('name');
    query.include('homeworld');

    if (page > 0) {
      query.skip(page * pageSize);
    }
    query.limit(pageSize);

    return query.find();
  }

  // NOTE: Managing service result as observable
  public async getCharactersObservable(): Promise<Observable<Parse.Object[]>> {
    const obj = Parse.Object.extend('SWAPI_Character');
    const query = new Parse.Query(obj);
    query.ascending('name');
    query.include('homeworld');

    return of(await query.find());
  }

  public async mapGifyToCharacters() {
    const characters = await this.getCharacters();
    characters.forEach((row) => {
      if (isEmpty(row.get('imgUrl'))) {
        this.giphyService
          .getGifsByKeyword(row.get('name'))
          .subscribe((result) => {
            // eslint-disable-next-line @typescript-eslint/dot-notation
            const firstData = result['data'][0];
            row.set('imgUrl', firstData?.images.original.url);
          });
      }
    });

    // NOTE: Unfortunately, I discovered its not possible to add data to a connected DB using Parse Hub,
    // But at least, this gives an example on how to bulk save using Parse query syntax.
    Parse.Object.saveAll(characters)
      .then((r) => r)
      .catch((err) => {
        throw err;
      });
  }

  private parseInitialize() {
    Parse.initialize(this.parseAppId, this.parseJSKey);
    (Parse as any).serverURL = this.parseServerUrl;
  }
}
