import { Component, OnInit } from '@angular/core';
import * as Parse from 'parse';
import { from, Observable } from 'rxjs';
import { filter, first, mapTo, take, takeLast } from 'rxjs/operators';
import { AuthService } from 'src/app/providers/auth/auth.service';

@Component({
  selector: 'app-observable-playground',
  templateUrl: './observable-playground.page.html',
  styleUrls: ['./observable-playground.page.scss'],
})
export class ObservablePlaygroundPage implements OnInit {
  favorites$: Observable<any>;
  planets$: Observable<any>;
  usingFirst$: Observable<any>;
  usingTake$: Observable<any>;
  usingTakeLast$: Observable<any>;
  usingFilter$: Observable<any>;

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    const rawFavorites = await this.fetchFavorites();
    console.log('🚀 ~ rawFavorites data from parse', rawFavorites);
    this.favorites$ = from(rawFavorites);

    const rawPlanets = await this.fetchPlanetsFromSWAPI();
    console.log('🚀 ~ rawPlanets data from SWAPI', rawPlanets);
    this.planets$ = from(rawPlanets);

    this.usingFirst$ = this.favorites$.pipe(first());
    console.log('🚀 ~ first() from observable');
    this.usingFirst$.subscribe((r) => console.log(r));

    this.usingTake$ = this.favorites$.pipe(take(3));
    console.log('🚀 ~ take(3) from observable');
    this.usingTake$.subscribe((r) => console.log(r));

    this.usingTakeLast$ = this.favorites$.pipe(takeLast(2));
    console.log('🚀 ~ takeLast(2) from observable');
    this.usingTakeLast$.subscribe((r) => console.log(r));

    const usingMapTo = this.favorites$.pipe(
      mapTo('🚀 ~ Anonnymous fn called using mapTo()'),
    );
    usingMapTo.subscribe((x) => console.log(x));

    this.usingFilter$ = this.planets$.pipe(
      filter((f) => f.get('name') === 'Alderaan'),
    );
    this.usingFilter$.subscribe((r) => {
      console.log(
        '🚀 ~ filter() from observable where name equals Alderaan -> ',
        r,
      );
    });
  }

  fetchFavorites() {
    const obj = Parse.Object.extend('Favorites');
    const query = new Parse.Query(obj);
    query.equalTo('user', this.authService.getCurrentUser());
    query.include('SWAPI_Character');

    return query.find();
  }

  fetchPlanetsFromSWAPI() {
    const obj = Parse.Object.extend('SWAPI_Planet');
    const query = new Parse.Query(obj);
    query.ascending('name');
    query.limit(10);

    return query.find();
  }
}
