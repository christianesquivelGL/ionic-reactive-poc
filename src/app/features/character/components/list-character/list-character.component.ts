import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list-character',
  templateUrl: './list-character.component.html',
  styleUrls: ['./list-character.component.scss'],
})
export class ListCharacterComponent implements OnInit {
  @Input() list: Parse.Object[];
  @Output() addToFavoritesEmitter = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  addToFavorites(entry: Parse.Object) {
    this.addToFavoritesEmitter.emit(entry);
  }
}
