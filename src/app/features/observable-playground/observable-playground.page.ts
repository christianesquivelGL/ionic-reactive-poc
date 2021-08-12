import { Component, OnInit } from '@angular/core';
import * as Parse from 'parse';
import { from, Observable, of } from 'rxjs';
import { first, map, mapTo, take } from 'rxjs/operators';
import { AuthService } from 'src/app/providers/auth/auth.service';

@Component({
  selector: 'app-observable-playground',
  templateUrl: './observable-playground.page.html',
  styleUrls: ['./observable-playground.page.scss'],
})
export class ObservablePlaygroundPage implements OnInit {
  observable: Observable<any>;
  usingFirst: Observable<any>;
  usingTake: Observable<any>;

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    const raw = await this.fetch();
    console.log('🚀 ~ raw data from parse', raw);
    this.observable = from(raw);

    this.usingFirst = this.observable.pipe(first());
    console.log('🚀 ~ First array in observable');
    this.usingFirst.pipe().subscribe((r) => console.log(r));

    this.usingTake = this.observable.pipe(take(3));
    console.log('🚀 ~ take(3) from observable');
    this.usingTake.pipe().subscribe((r) => console.log(r));

    const greetings = this.observable.pipe(
      mapTo('🚀 ~ Anonnymous fn called using rxjs.mapTo()'),
    );
    greetings.subscribe((x) => console.log(x));
  }

  fetch() {
    const obj = Parse.Object.extend('Favorites');
    const query = new Parse.Query(obj);
    query.equalTo('user', this.authService.getCurrentUser());
    query.include('SWAPI_Character');

    return query.find();
  }
}
