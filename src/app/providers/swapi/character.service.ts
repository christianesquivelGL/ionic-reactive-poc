import { Injectable } from '@angular/core';
import { isEmpty } from 'lodash';
import * as Parse from 'parse';
import { Observable, of } from 'rxjs';
import { SearchFilters } from 'src/app/features/character/models/searchFilters.model';

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
    const obj = Parse.Object.extend('Character');
    const query = new Parse.Query(obj);
    query.ascending('name');
    query.include('homeworld');

    return query.find();
  }

  public async getCharactersBySearchCriteria(
    page: number,
    pageSize: number,
    searchCriteria: any,
    searchFilters: SearchFilters[],
  ): Promise<Parse.Object[]> {
    const obj = Parse.Object.extend('Character');
    let query = new Parse.Query(obj);

    const queries = [];

    if (!isEmpty(searchCriteria)) {
      const name = new Parse.Query(obj);
      name.matches('name', searchCriteria, 'i');
      queries.push(name);

      searchFilters.forEach((f) => {
        if (f.key === 'planetName' && f.value) {
          const planet = Parse.Object.extend('Planet');
          const planetQuery = new Parse.Query(planet);
          planetQuery.matches('name', searchCriteria, 'i');
          const characterByHomeworld = new Parse.Query(obj);
          characterByHomeworld.matchesQuery('homeworld', planetQuery);
          queries.push(characterByHomeworld);
        }

        if (f.key === 'hairColor' && f.value) {
          const hairColor = new Parse.Query(obj);
          hairColor.matches('hairColor', searchCriteria, 'i');
          queries.push(hairColor);
        }

        if (f.key === 'eyeColor' && f.value) {
          const eyeColor = new Parse.Query(obj);
          eyeColor.matches('eyeColor', searchCriteria, 'i');
          queries.push(eyeColor);
        }
      });

      query = Parse.Query.or(...queries);
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
    const obj = Parse.Object.extend('Character');
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

    Parse.Object.saveAll(characters)
      .then((r) => r)
      .catch((err) => {
        throw err;
      });
  }

  public getCharacterById(characterId: string): Promise<Parse.Object> {
    const obj = Parse.Object.extend('Character');
    const query = new Parse.Query(obj);

    return query.get(characterId);
  }

  private parseInitialize() {
    Parse.initialize(this.parseAppId, this.parseJSKey);
    (Parse as any).serverURL = this.parseServerUrl;
  }
}
