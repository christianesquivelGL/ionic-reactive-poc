import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { CharacterService } from '../../../providers/swapi/character.service';
import * as fromCharacterActions from './character.actions';

@Injectable()
export class CharacterEffects {
  fetchCharacters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCharacterActions.fetchCharacters),
      mergeMap(() =>
        this.characterService.getCharactersObservableTest().pipe(
          map((res: any) =>
            fromCharacterActions.fetchCharactersSuccess({ characters: res }),
          ),
          catchError(() => of(fromCharacterActions.fetchCharactersFailure())),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private characterService: CharacterService,
    private store: Store,
  ) {}
}
